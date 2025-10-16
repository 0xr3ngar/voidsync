import { google } from "googleapis";
import { config } from "@/config";
import { getYouTubeTokens } from "@/services/youtube/store/tokenStorage";

export interface YouTubePlaylist {
    id: string;
    name: string;
    trackCount: number;
    privacy: string;
}

export const fetchYouTubePlaylists = async (): Promise<YouTubePlaylist[]> => {
    const tokens = getYouTubeTokens();

    if (!tokens) {
        throw new Error("No YouTube tokens found");
    }

    const { clientId, clientSecret } = config.youtube;

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

    oauth2Client.setCredentials({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
    });

    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    const response = await youtube.playlists.list({
        part: ["snippet", "contentDetails"],
        mine: true,
        maxResults: 50,
    });

    if (!response.data.items) {
        return [];
    }

    return response.data.items.map((item) => ({
        id: item.id || "",
        name: item.snippet?.title || "Untitled",
        trackCount: item.contentDetails?.itemCount || 0,
        privacy: item.status?.privacyStatus || "private",
    }));
};
