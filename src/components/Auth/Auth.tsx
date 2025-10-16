import { Box, useInput } from "ink";
import { useState } from "react";
import { AuthBody } from "@/components/Auth/AuthBody";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import { AuthHeader } from "@/components/Auth/AuthHeader";
import type { Platform } from "@/models/Platform";
import { handlePlatformConnect } from "@/services/handlePlatformConnect";
import { hasValidSpotifyTokens } from "@/services/spotify/store/tokenStorage";
import { hasValidTokens } from "@/services/youtube/store/tokenStorage";

interface AuthProps {
    onComplete: () => void;
}

export const Auth = ({ onComplete }: AuthProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [platforms, setPlatforms] = useState<Platform[]>([
        {
            name: "YouTube",
            connected: hasValidTokens(),
            textParts: [
                { text: "You", color: "#FF0000" },
                { text: "Tube", color: "#FFF" },
            ],
        },
        {
            name: "Spotify",
            connected: hasValidSpotifyTokens(),
            textParts: [{ text: "Spotify", color: "#1DB954" }],
        },
        {
            name: "SoundCloud",
            connected: false,
            textParts: [
                { text: "Sound", color: "#FF3300" },
                { text: "Cloud", color: "#FFFFFF" },
            ],
        },
    ]);

    useInput((input, key) => {
        if (key.upArrow) {
            setSelectedIndex((prev) => Math.max(0, prev - 1));
        }

        if (key.downArrow) {
            setSelectedIndex((prev) =>
                Math.min(platforms.length - 1, prev + 1),
            );
        }

        if (input === " ") {
            const selectedPlatform = platforms[selectedIndex];

            if (!selectedPlatform) {
                return;
            }

            handlePlatformConnect({
                platform: selectedPlatform,
                onConnect: (isConnected) => {
                    setPlatforms((prev) => {
                        return prev.map((p, idx) =>
                            idx === selectedIndex
                                ? { ...p, connected: isConnected }
                                : p,
                        );
                    });
                },
            });
        }

        if (key.return) {
            onComplete();
        }
    });

    return (
        <Box flexDirection="column" width="100%" height="100%" padding={2}>
            <AuthHeader />
            <AuthBody platforms={platforms} selectedIndex={selectedIndex} />
            <AuthFooter />
        </Box>
    );
};
