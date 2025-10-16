import { Box, Text } from "ink";

interface ErrorStateProps {
    message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => (
    <Box flexDirection="column" padding={2} alignItems="center">
        <Text color="red">Error: {message}</Text>
        <Text color="gray">Press ENTER to continue</Text>
    </Box>
);
