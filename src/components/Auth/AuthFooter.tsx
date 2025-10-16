import { Box, Text } from "ink";

export const AuthFooter = () => {
    return (
        <Box flexDirection="column" marginTop={2} gap={0}>
            <Box justifyContent="center">
                <Text dimColor>
                    ↑/↓ Navigate • SPACE Connect • ENTER Continue
                </Text>
            </Box>
        </Box>
    );
};
