import { Box, Text } from "ink";

interface AuthPlatformItemProps {
    isSelected: boolean;
    name: string;
    isConnected: boolean;
    color: string;
}
export const AuthPlatformItem = ({
    isSelected,
    name,
    isConnected,
    color,
}: AuthPlatformItemProps) => {
    return (
        <Box gap={2}>
            <Text color={isSelected ? "magenta" : "dim"}>
                {isSelected ? "❯" : " "}
            </Text>

            <Box width={15}>
                <Text
                    bold={isSelected}
                    color={isSelected ? color : undefined}
                    dimColor={!isSelected}
                >
                    {name}
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
