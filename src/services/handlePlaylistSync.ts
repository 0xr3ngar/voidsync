import {
    fetchTracksFromPlaylist,
    type SpotifyPlaylistTracksResponse,
} from "@/services/spotify/fetchTracksFromPlaylist";
import {
    type SyncProgress,
    syncTracksToYouTube,
} from "@/services/youtube/syncTracksToYouTube";

interface HandlePlaylistSyncProps {
    onFetchProgress?: (playlist: SpotifyPlaylistTracksResponse) => void;
    onProgress?: (progress: SyncProgress) => void;
    onPlaylistCreated?: (playlistId: string) => void;
    spotifyPlaylistIds: string[];
    youtubePlaylistIds: string[];
}

export const handlePlaylistSync = async ({
    spotifyPlaylistIds,
    youtubePlaylistIds: _youtubePlaylistIds,
    onFetchProgress,
    onProgress,
    onPlaylistCreated,
}: HandlePlaylistSyncProps) => {
    try {
        const allTracksFromSpotify = await Promise.all(
            spotifyPlaylistIds.map((playlistId) =>
                fetchTracksFromPlaylist(playlistId).then((playlist) => {
                    onFetchProgress?.(playlist);
                    return playlist;
                }),
            ),
        ).then((playlists) =>
            playlists.flatMap((playlist) =>
                playlist.items.map((item) => {
                    const name = item.track.name;
                    const artists = item.track.artists
                        .map((artist) => artist.name)
                        .join(", ");

                    return `${name} - ${artists}`;
                }),
            ),
        );

        // TODO: Add youtube playlist syncs
        const allTracks = [...allTracksFromSpotify];

        const playlistName = `VoidSync - ${new Date().toLocaleDateString()}`;

        const result = await syncTracksToYouTube(
            allTracks,
            playlistName,
            onProgress,
            onPlaylistCreated,
        );

        return {
            result,
        };
    } catch (error) {
        console.error("Sync failed:", error);
        return null;
    }
};
