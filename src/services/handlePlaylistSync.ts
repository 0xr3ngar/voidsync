import { fetchTracksFromPlaylist } from "@/services/spotify/fetchTracksFromPlaylist";
import { syncTracksToYouTube } from "@/services/youtube/syncTracksToYouTube";

export const handlePlaylistSync = async (
    spotifyPlaylistIds: string[],
    youtubePlaylistIds: string[],
) => {
    try {
        const allTracksFromSpotify = await Promise.all(
            spotifyPlaylistIds.map((playlistId) =>
                fetchTracksFromPlaylist(playlistId),
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
            (progress) => {
                // TODO: Update progress
            },
        );

        return {
            result,
        };
    } catch (error) {
        console.error("Sync failed:", error);
        return null;
    }
};
