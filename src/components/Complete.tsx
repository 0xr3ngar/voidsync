import { Box, Text, useApp } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";
import Link from "ink-link";
import { useEffect } from "react";

interface CompleteProps {
    playlistId?: string;
}

export const Complete = ({ playlistId }: CompleteProps) => {
    const { exit } = useApp();

    useEffect(() => {
        const timeout = setTimeout(() => {
            exit();
        }, 5000);
        return () => {
            clearTimeout(timeout);
        };
    }, [exit]);

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100%"
        >
            <Gradient name="vice">
                <BigText text="Thank you." />
            </Gradient>
            <Box
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                marginTop={1}
            >
                <Text bold color="cyan">
                    Your playlists have been synced successfully.
                </Text>
                {playlistId && (
                    <Box
                        marginTop={2}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Text color="magenta" bold>
                            Your YouTube Music Playlist:
                        </Text>
                        <Link
                            url={`https://music.youtube.com/playlist?list=${playlistId}`}
                        >
                            <Text color="blue" underline>
                                Open in YouTube Music
                            </Text>
                        </Link>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
