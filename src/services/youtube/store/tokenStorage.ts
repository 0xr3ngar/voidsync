import { store } from "@/store";

export interface YouTubeTokens {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

const YOUTUBE_TOKENS_KEY = "youtubeTokens";

export const saveYouTubeTokens = (tokens: YouTubeTokens): void => {
    store.set(YOUTUBE_TOKENS_KEY, tokens);
};

export const getYouTubeTokens = (): YouTubeTokens | null => {
    return store.get(YOUTUBE_TOKENS_KEY) as YouTubeTokens | null;
};

export const deleteYouTubeTokens = (): void => {
    store.delete(YOUTUBE_TOKENS_KEY);
};

export const hasValidTokens = (): boolean => {
    const tokens = getYouTubeTokens();
    if (!tokens) {
        return false;
    }

    return tokens.expiryDate > Date.now() + 5 * 60 * 1000;
};
