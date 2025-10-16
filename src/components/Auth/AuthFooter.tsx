import { Box, Text } from "ink";

export const AuthFooter = () => {
    return (
        <Box flexDirection="column" marginTop={2} gap={0}>
            <Text dimColor>↑/↓ Navigate • SPACE Connect • ENTER Continue</Text>
        </Box>
    );
};
