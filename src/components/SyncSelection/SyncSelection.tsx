import { Box, Text, Transform, useInput } from "ink";
import Gradient from "ink-gradient";
import { useState } from "react";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { useListNavigation } from "./hooks/useListNavigation";
import { usePlaylistLoader } from "./hooks/usePlaylistLoader";
import { LoadingState } from "./LoadingState";
import { PlaylistColumn } from "./PlaylistColumn";

interface SyncSelectionProps {
    onComplete: (
        spotifyPlaylistIds: string[],
        youtubePlaylistIds: string[],
    ) => void;
}

const VISIBLE_ITEMS = 8;

export const SyncSelection = ({ onComplete }: SyncSelectionProps) => {
    const { spotifyPlaylists, youtubePlaylists, loading, error } =
        usePlaylistLoader();

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    // TODO: ADD soundcloud support
    const [activePanel, setActivePanel] = useState<"spotify" | "youtube">(
        "spotify",
    );

    const spotifyNav = useListNavigation({
        itemCount: spotifyPlaylists.length,
        visibleItems: VISIBLE_ITEMS,
    });

    const youtubeNav = useListNavigation({
        itemCount: youtubePlaylists.length,
        visibleItems: VISIBLE_ITEMS,
    });

    const currentNav = activePanel === "spotify" ? spotifyNav : youtubeNav;

    const currentPlaylists =
        activePanel === "spotify" ? spotifyPlaylists : youtubePlaylists;

    const togglePlaylistSelection = (playlistId: string) => {
        setSelectedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(playlistId)) {
                newSet.delete(playlistId);
            } else {
                newSet.add(playlistId);
            }
            return newSet;
        });
    };

    useInput((input, key) => {
        if (loading || error) return;

        if (key.upArrow) {
            currentNav.moveUp();
        }

        if (key.downArrow) {
            currentNav.moveDown();
        }

        if (key.tab) {
            setActivePanel((prev) =>
                prev === "spotify" ? "youtube" : "spotify",
            );
        }

        if (input === " ") {
            const playlist = currentPlaylists[currentNav.index];
            if (playlist) {
                togglePlaylistSelection(playlist.id);
            }
        }

        if (key.return && selectedIds.size > 0) {
            const spotifyPlaylistIds = Array.from(selectedIds).filter(
                (id) => !id.startsWith("youtube-"),
            );
            const youtubePlaylistIds = Array.from(selectedIds).filter((id) =>
                id.startsWith("youtube-"),
            );
            onComplete(spotifyPlaylistIds, youtubePlaylistIds);
        }
    });

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (spotifyPlaylists.length === 0 && youtubePlaylists.length === 0) {
        return <EmptyState />;
    }

    const allPlaylists = [...spotifyPlaylists, ...youtubePlaylists];

    const selectedCount = selectedIds.size;

    const totalTracks = allPlaylists
        .filter((p) => selectedIds.has(p.id))
        .reduce((sum, p) => sum + p.trackCount, 0);

    return (
        <Box
            width="100%"
            height="100%"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            paddingX={1}
            paddingY={1}
        >
            <Box marginBottom={1}>
                <Gradient colors={["#67e8f9", "#a855f7"]}>
                    <Transform transform={(output) => output.toUpperCase()}>
                        <Text bold>void sync</Text>
                    </Transform>
                </Gradient>
            </Box>

            <Box marginBottom={1}>
                <Text color="gray">Select playlists to combine</Text>
            </Box>

            <Box flexDirection="row" gap={1}>
                {spotifyPlaylists.length > 0 && (
                    <PlaylistColumn
                        playlists={spotifyPlaylists}
                        title="SPOTIFY"
                        isActive={activePanel === "spotify"}
                        selectedIndex={spotifyNav.index}
                        scrollOffset={spotifyNav.scroll}
                        selectedIds={selectedIds}
                        visibleItems={VISIBLE_ITEMS}
                    />
                )}
                {youtubePlaylists.length > 0 && (
                    <PlaylistColumn
                        playlists={youtubePlaylists}
                        title="YOUTUBE"
                        isActive={activePanel === "youtube"}
                        selectedIndex={youtubeNav.index}
                        scrollOffset={youtubeNav.scroll}
                        selectedIds={selectedIds}
                        visibleItems={VISIBLE_ITEMS}
                    />
                )}
            </Box>

            <Box marginTop={1}>
                <Text>
                    {selectedCount > 0 ? (
                        <Text color="cyan">
                            {selectedCount} playlist
                            {selectedCount > 1 ? "s" : ""}
                        </Text>
                    ) : (
                        <Text color="gray">No playlists selected</Text>
                    )}
                    {selectedCount > 0 && (
                        <Text>
                            {" "}
                            • {totalTracks} track{totalTracks !== 1 ? "s" : ""}
                        </Text>
                    )}
                </Text>
            </Box>

            <Box marginTop={1}>
                <Text color="gray">
                    ↑/↓ Navigate · TAB Switch · SPACE Toggle · ENTER Sync
                </Text>
            </Box>
        </Box>
    );
};
