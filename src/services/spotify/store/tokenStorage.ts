import { store } from "@/store";

export interface SpotifyTokens {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

const SPOTIFY_TOKENS_KEY = "spotifyTokens";

export const saveSpotifyTokens = (tokens: SpotifyTokens): void => {
    store.set(SPOTIFY_TOKENS_KEY, tokens);
};

export const getSpotifyTokens = (): SpotifyTokens | null => {
    return store.get(SPOTIFY_TOKENS_KEY) as SpotifyTokens | null;
};

export const hasValidSpotifyTokens = (): boolean => {
    const tokens = getSpotifyTokens();
    if (!tokens) {
        return false;
    }

    return tokens.expiryDate > Date.now() + 5 * 60 * 1000;
};
