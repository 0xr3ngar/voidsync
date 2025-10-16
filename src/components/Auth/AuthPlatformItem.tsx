import { Box, Text } from "ink";
import type { TextPart } from "@/models/Platform";

interface AuthPlatformItemProps {
    isSelected: boolean;
    isConnected: boolean;
    textParts: TextPart[];
    name: string;
}
export const AuthPlatformItem = ({
    isSelected,
    isConnected,
    textParts,
    name,
}: AuthPlatformItemProps) => {
    // TODO: Remove this once SoundCloud is implemented
    const isWorkInProgress = name === "SoundCloud";

    return (
        <Box gap={2} justifyContent="center">
            <Text color={isSelected ? "magenta" : "dim"}>
                {isSelected ? "❯" : " "}
            </Text>

            <Box width={15}>
                <Text bold={isSelected}>
                    {textParts.map((part) => (
                        <Text
                            key={part.text}
                            color={isSelected ? part.color : "dim"}
                        >
                            {part.text}
                        </Text>
                    ))}
                </Text>
            </Box>

            <Box>
                {isConnected ? (
                    <Text color="green">✓ Connected</Text>
                ) : isWorkInProgress ? (
                    <Text color="yellow">⚠ Work in progress...</Text>
                ) : (
                    <Text dimColor>Not connected</Text>
                )}
            </Box>
        </Box>
    );
};
