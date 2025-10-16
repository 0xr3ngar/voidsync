import { getSpotifyTokens } from "@/services/spotify/store/tokenStorage";
import { uniqueBy } from "@/utils/array";

export interface SpotifyPlaylist {
    id: string;
    name: string;
    trackCount: number;
    owner: string;
    public: boolean;
}

interface SpotifyPlaylistsResponse {
    items: Array<{
        id: string;
        name: string;
        tracks: { total: number };
        owner: { display_name: string };
        public: boolean;
    }>;
    total: number;
    limit: number;
    offset: number;
    next: string | null;
}

export const fetchSpotifyPlaylists = async (): Promise<SpotifyPlaylist[]> => {
    const tokens = getSpotifyTokens();

    if (!tokens) {
        throw new Error("No Spotify tokens found");
    }

    const allPlaylists: SpotifyPlaylist[] = [];
    let offset = 0;
    const limit = 50;
    let hasMore = true;

    while (hasMore) {
        const url = `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch Spotify playlists: ${response.status}`,
            );
        }

        const data = (await response.json()) as SpotifyPlaylistsResponse;

        const playlists = data.items.map((item) => ({
            id: item.id,
            name: item.name,
            trackCount: item.tracks.total,
            owner: item.owner.display_name,
            public: item.public,
        }));

        allPlaylists.push(...playlists);

        hasMore = data.next !== null;
        offset += limit;
    }

    return uniqueBy(allPlaylists, "id");
};
