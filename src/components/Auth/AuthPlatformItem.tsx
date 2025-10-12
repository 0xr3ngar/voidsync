import { Box, Text } from "ink";
import type { TextPart } from "@/models/Platform";

interface AuthPlatformItemProps {
    isSelected: boolean;
    isConnected: boolean;
    textParts: TextPart[];
}
export const AuthPlatformItem = ({
    isSelected,
    isConnected,
    textParts,
}: AuthPlatformItemProps) => {
    return (
        <Box gap={2}>
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
                ) : (
                    <Text dimColor>Not connected</Text>
                )}
            </Box>
        </Box>
    );
};
