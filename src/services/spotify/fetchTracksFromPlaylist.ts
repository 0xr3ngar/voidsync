import { getSpotifyTokens } from "@/services/spotify/store/tokenStorage";

interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
}

interface SpotifyAlbum {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: "album";
    uri: string;
}

interface SpotifyTrack {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: {
        isrc?: string;
        ean?: string;
        upc?: string;
    };
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track: boolean;
    track_number: number;
    type: "track";
    uri: string;
}

interface SpotifyUser {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    type: "user";
    uri: string;
}

interface SpotifyPlaylistTrackItem {
    added_at: string;
    added_by: SpotifyUser;
    is_local: boolean;
    primary_color: string | null;
    track: SpotifyTrack;
    video_thumbnail: {
        url: string | null;
    };
}

interface SpotifyPlaylistTracksResponse {
    href: string;
    items: SpotifyPlaylistTrackItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export const fetchTracksFromPlaylist = async (
    playlistId: string,
): Promise<SpotifyPlaylistTracksResponse> => {
    const tokens = getSpotifyTokens();

    if (!tokens) {
        throw new Error("No Spotify tokens found");
    }

    const actualPlaylistId = playlistId.split("-")[1];
    if (!actualPlaylistId) {
        throw new Error("Invalid playlist ID");
    }

    const allItems: SpotifyPlaylistTrackItem[] = [];
    let offset = 0;
    const limit = 50;
    let hasMore = true;
    let total = 0;

    while (hasMore) {
        const url = `https://api.spotify.com/v1/playlists/${actualPlaylistId}/tracks?limit=${limit}&offset=${offset}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch tracks from playlist: ${response.status}`,
            );
        }

        const data = (await response.json()) as SpotifyPlaylistTracksResponse;

        allItems.push(...data.items);
        total = data.total;
        hasMore = data.next !== null;
        offset += limit;
    }

    return {
        href: `https://api.spotify.com/v1/playlists/${actualPlaylistId}/tracks`,
        items: allItems,
        limit: allItems.length,
        next: null,
        offset: 0,
        previous: null,
        total,
    };
};
