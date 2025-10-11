import { Box, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import { useEffect, useState } from "react";
import { assertDefined } from "@/utils/assert";

interface IntroProps {
    onComplete: () => void;
}
export const Intro = ({ onComplete }: IntroProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const platforms = [
        {
            name: "YouTube",
            gradient: ["#FF0000", "#FF1493", "#FF6B6B"],
            tagline: "Team Red?",
        },
        {
            name: "Spotify",
            gradient: ["#1DB954", "#1ED760", "#00FFB3"],
            tagline: "Team Green?",
        },
        {
            name: "SoundCloud",
            gradient: ["#FF3300", "#FF5500", "#FF8C00"],
            tagline: "Team Orange?",
        },
        {
            name: "VoidSync",
            gradient: ["#8B00FF", "#FF00FF", "#00D9FF"],
            tagline: "Why choose?",
        },
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [onComplete]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev < platforms.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const current = assertDefined(
        platforms[currentIndex],
        "Current platform is undefined",
    );

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100%"
        >
            <Gradient colors={current.gradient}>
                <BigText text={current.name} />
            </Gradient>
            <Box justifyContent="center" alignItems="center" marginTop={1}>
                <Text bold color="cyan">
                    {current.tagline}
                </Text>
            </Box>
        </Box>
    );
};
