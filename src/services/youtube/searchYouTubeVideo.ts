import YTMusic from "ytmusic-api";

let ytmusicInstance: YTMusic | null = null;

const getYTMusicInstance = async (): Promise<YTMusic> => {
    if (!ytmusicInstance) {
        ytmusicInstance = new YTMusic();
        await ytmusicInstance.initialize();
    }
    return ytmusicInstance;
};

/**
 * Search for a video on YouTube Music using unofficial API (no quota usage) cuz google is pee pee poo poo
 * This is the hybrid approach: use unofficial API for expensive searches,
 * official API only for playlist operations
 */
export const searchYouTubeVideo = async (
    query: string,
): Promise<string | null> => {
    try {
        const ytmusic = await getYTMusicInstance();
        const results = await ytmusic.searchSongs(query);

        if (!results || results.length === 0) {
            console.warn(`No results found for: ${query}`);
            return null;
        }

        const videoId = results[0]?.videoId;

        if (!videoId) {
            console.warn(`No video ID found for: ${query}`);
            return null;
        }

        return videoId;
    } catch (error) {
        console.error(`Failed to search for "${query}":`, error);
        return null;
    }
};
