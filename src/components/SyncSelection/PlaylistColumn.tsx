import { Box, Text } from "ink";
import type { Playlist } from "./hooks/usePlaylistLoader";

interface PlaylistColumnProps {
    playlists: Playlist[];
    title: string;
    isActive: boolean;
    selectedIndex: number;
    scrollOffset: number;
    selectedIds: Set<string>;
    visibleItems: number;
}

export const PlaylistColumn = ({
    playlists,
    title,
    isActive,
    selectedIndex,
    scrollOffset,
    selectedIds,
    visibleItems,
}: PlaylistColumnProps) => {
    const visiblePlaylists = playlists.slice(
        scrollOffset,
        scrollOffset + visibleItems,
    );
    const hasMore = playlists.length > scrollOffset + visibleItems;
    const hasLess = scrollOffset > 0;
    const accentColor = isActive ? "cyan" : "gray";
    const bulletChecked = "●";
    const bulletEmpty = "○";
    const pointer = ">";
    const nameLimit = 24;

    return (
        <Box
            flexDirection="column"
            width={30}
            flexGrow={0}
            flexShrink={0}
            marginX={0}
            marginBottom={1}
        >
            <Box flexDirection="column" paddingX={1} paddingY={0}>
                <Box
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={0}
                >
                    <Text bold color={accentColor}>
                        {title}
                        {isActive && " ←"}
                    </Text>
                </Box>

                <Box marginBottom={visiblePlaylists.length > 0 ? 1 : 0}>
                    <Text color="gray">{playlists.length} total</Text>
                </Box>

                <Box>
                    <Text color="gray">{hasLess ? "↑ More above" : " "}</Text>
                </Box>

                <Box flexDirection="column">
                    {visiblePlaylists.map((playlist, idx) => {
                        const actualIndex = scrollOffset + idx;
                        const isSelected =
                            isActive && selectedIndex === actualIndex;
                        const isChecked = selectedIds.has(playlist.id);
                        const rawName = playlist.name;
                        const baseName =
                            rawName.length > nameLimit
                                ? `${rawName.slice(0, nameLimit - 3)}...`
                                : rawName;

                        return (
                            <Box
                                key={`${playlist.id}-${actualIndex}`}
                                width={30}
                            >
                                <Text
                                    color={
                                        isSelected
                                            ? accentColor
                                            : isChecked
                                              ? "magenta"
                                              : isActive
                                                ? "white"
                                                : "gray"
                                    }
                                >
                                    {isSelected ? `${pointer} ` : "  "}
                                    {isChecked
                                        ? `${bulletChecked} `
                                        : `${bulletEmpty} `}
                                    {baseName}
                                </Text>
                            </Box>
                        );
                    })}
                </Box>

                <Box>
                    <Text color="gray">{hasMore ? "↓ More below" : " "}</Text>
                </Box>
            </Box>
        </Box>
    );
};
