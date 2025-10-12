import { Box, Text, Transform } from "ink";
import Gradient from "ink-gradient";

export const AuthHeader = () => {
    return (
        <Box flexDirection="column" marginBottom={2}>
            <Box justifyContent="center">
                <Gradient name="vice">
                    <Transform transform={(output) => output.toUpperCase()}>
                        <Text bold>Connect your accounts</Text>
                    </Transform>
                </Gradient>
            </Box>
            <Box justifyContent="center">
                <Text dimColor>
                    Choose a platform to connect and start syncing
                </Text>
            </Box>
        </Box>
    );
};
