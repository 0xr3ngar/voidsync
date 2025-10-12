import { Box, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import { useEffect } from "react";

interface QuickSplashProps {
    onComplete: () => void;
}

export const QuickSplash = ({ onComplete }: QuickSplashProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onComplete();
        }, 1500);

        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100%"
        >
            <Gradient name="vice">
                <BigText text="VoidSync" />
            </Gradient>
            <Box justifyContent="center" alignItems="center">
                <Text bold color="cyan">
                    Conquer the void of scattered playlists.
                </Text>
            </Box>
        </Box>
    );
};
