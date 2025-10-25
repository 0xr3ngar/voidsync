import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import Spinner from "ink-spinner";
import { useEffect, useState } from "react";
import { handlePlaylistSync } from "@/services/handlePlaylistSync";
import type { SyncProgress } from "@/services/youtube/syncTracksToYouTube";

interface SyncingPlaylistsProps {
    spotifyPlaylistIds: string[];
    youtubePlaylistIds: string[];
    onComplete: (playlistId?: string) => void;
}

export const SyncingPlaylists = ({
    spotifyPlaylistIds,
    youtubePlaylistIds,
    onComplete,
}: SyncingPlaylistsProps) => {
    const [fetchingPlaylists, setFetchingPlaylists] = useState(true);
    const [totalTracks, setTotalTracks] = useState<number>(0);
    const [progress, setProgress] = useState<SyncProgress | null>(null);

    useEffect(() => {
        const sync = async () => {
            let createdPlaylistId: string | undefined;

            await handlePlaylistSync({
                spotifyPlaylistIds,
                youtubePlaylistIds,
                onFetchProgress: (playlist) => {
                    setTotalTracks(playlist.total);
                },
                onProgress: (syncProgress) => {
                    setFetchingPlaylists(false);
                    setProgress(syncProgress);
                },
                onPlaylistCreated: (id) => {
                    createdPlaylistId = id;
                },
            });
            onComplete(createdPlaylistId);
        };

        sync();
    }, [spotifyPlaylistIds, youtubePlaylistIds, onComplete]);

    const getPhaseText = () => {
        if (fetchingPlaylists) {
            return "Fetching Spotify Playlists";
        }
        if (progress?.phase === "searching") {
            return "Searching YouTube Music";
        }
        if (progress?.phase === "adding") {
            return "Adding to Playlist";
        }
        return "Syncing";
    };

    const getProgressBar = (current: number, total: number) => {
        const barLength = 40;
        const filled = Math.round((current / total) * barLength);
        const empty = barLength - filled;
        const percentage = Math.round((current / total) * 100);

        return `[${"█".repeat(filled)}${" ".repeat(empty)}] ${percentage}%`;
    };

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
            height="100%"
            paddingX={2}
        >
            <Box marginBottom={2}>
                <Gradient name="vice">
                    <Text bold>♪ SYNCING TO YOUTUBE MUSIC ♪</Text>
                </Gradient>
            </Box>

            <Box marginBottom={1}>
                <Text color="cyan" bold>
                    <Spinner type="dots" />
                    {"  "}
                    {getPhaseText()}
                </Text>
            </Box>

            {fetchingPlaylists && totalTracks > 0 && (
                <Box marginBottom={1} flexDirection="column">
                    <Text color="yellow">
                        Found {totalTracks} tracks from Spotify
                    </Text>
                </Box>
            )}

            {progress && (
                <>
                    <Box marginBottom={1} flexDirection="column" width={50}>
                        <Text color="magenta">
                            {getProgressBar(progress.current, progress.total)}
                        </Text>
                        <Text color="gray" dimColor>
                            {progress.current} / {progress.total} tracks
                        </Text>
                    </Box>

                    <Box
                        marginBottom={1}
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Text color="green" bold>
                            Now Processing:
                        </Text>
                        <Text color="white" italic>
                            {progress.currentTrack}
                        </Text>
                    </Box>
                </>
            )}
        </Box>
    );
};
