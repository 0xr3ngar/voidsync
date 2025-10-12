import { Box, useApp, useInput } from "ink";
import { useState } from "react";
import { AuthBody } from "@/components/Auth/AuthBody";
import { AuthFooter } from "@/components/Auth/AuthFooter";
import { AuthHeader } from "@/components/Auth/AuthHeader";
import type { Platform } from "@/models/Platform";
import { handlePlatformConnect } from "@/services/handlePlatformConnect";

interface AuthProps {
    onComplete: () => void;
}

export const Auth = ({ onComplete }: AuthProps) => {
    const { exit } = useApp();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [platforms, setPlatforms] = useState<Platform[]>([
        {
            name: "YouTube",
            connected: false,
            textParts: [
                { text: "You", color: "#FF0000" },
                { text: "Tube", color: "#FFF" },
            ],
        },
        {
            name: "Spotify",
            connected: false,
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
        if (input === "q") {
            exit();
        }

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
                        selectedPlatform.connected = isConnected;
                        return [...prev, selectedPlatform];
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
