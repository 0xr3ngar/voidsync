import { Box, Text } from "ink";
import Spinner from "ink-spinner";

export const LoadingState = () => (
    <Box
        flexDirection="column"
        padding={2}
        alignItems="center"
        width="100%"
        height="100%"
    >
        <Box justifyContent="center" alignItems="center">
            <Text>Loading your playlists...</Text>
        </Box>
        <Box justifyContent="center" alignItems="center">
            <Spinner type="balloon" />
        </Box>
    </Box>
);
