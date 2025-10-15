import Conf from "conf";
import type { Platform } from "@/models/Platform";

interface YouTubeTokens {
    accessToken: string;
    refreshToken: string;
    expiryDate: number;
}

export const store = new Conf<{
    hasSeenIntro: boolean;
    connectedPlatforms: Platform[];
    youtubeTokens: YouTubeTokens | null;
}>({
    projectName: "voidsync",
    defaults: {
        hasSeenIntro: false,
        connectedPlatforms: [],
        youtubeTokens: null,
    },
});
