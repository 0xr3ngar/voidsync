import { Box, Text } from "ink";

export const EmptyState = () => (
    <Box flexDirection="column" padding={2} alignItems="center">
        <Text>No playlists found on your connected accounts.</Text>
        <Text color="gray">Press ENTER to continue</Text>
    </Box>
);
