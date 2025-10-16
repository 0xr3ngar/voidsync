import { google } from "googleapis";
import { config } from "@/config";
import { getYouTubeTokens } from "@/services/youtube/store/tokenStorage";

// TODO: maybe use https://github.com/codyduong/ytmusicapiJS?tab=readme-ov-file for this?
// because this way we avoid the quota-limit as well as the rate limit
// and we can use the unofficial API for the search as well
export const createYouTubePlaylist = async (
    title: string,
    description?: string,
): Promise<string> => {
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

    const response = await youtube.playlists.insert({
        part: ["snippet", "status"],
        requestBody: {
            snippet: {
                title,
                description: description || "Created by VoidSync",
            },
            status: {
                privacyStatus: "private",
            },
        },
    });

    if (!response.data.id) {
        throw new Error("Failed to create YouTube playlist");
    }

    return response.data.id;
};
