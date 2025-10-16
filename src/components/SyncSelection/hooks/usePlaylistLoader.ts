import { useEffect, useState } from "react";
import { fetchSpotifyPlaylists } from "@/services/spotify/fetchSpotifyPlaylists";
import { hasValidSpotifyTokens } from "@/services/spotify/store/tokenStorage";
import { fetchYouTubePlaylists } from "@/services/youtube/fetchYouTubePlaylists";
import { hasValidTokens } from "@/services/youtube/store/tokenStorage";

export interface Playlist {
    id: string;
    name: string;
    trackCount: number;
    platform: "Spotify" | "YouTube";
}

export const usePlaylistLoader = () => {
    const [spotifyPlaylists, setSpotifyPlaylists] = useState<Playlist[]>([]);
    const [youtubePlaylists, setYoutubePlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                if (hasValidSpotifyTokens()) {
                    const playlists = await fetchSpotifyPlaylists();
                    setSpotifyPlaylists(
                        playlists.map((p) => ({
                            id: `spotify-${p.id}`,
                            name: p.name,
                            trackCount: p.trackCount,
                            platform: "Spotify" as const,
                        })),
                    );
                }

                if (hasValidTokens()) {
                    const playlists = await fetchYouTubePlaylists();
                    setYoutubePlaylists(
                        playlists.map((p) => ({
                            id: `youtube-${p.id}`,
                            name: p.name,
                            trackCount: p.trackCount,
                            platform: "YouTube" as const,
                        })),
                    );
                }

                setLoading(false);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load playlists",
                );
                setLoading(false);
            }
        };

        loadPlaylists();
    }, []);

    return { spotifyPlaylists, youtubePlaylists, loading, error };
};
