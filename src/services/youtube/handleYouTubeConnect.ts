import { OAuth2Client } from "google-auth-library";
import { config } from "@/config";
import { waitForOAuthCallback } from "@/services/shared/oauthServer";
import {
    hasValidTokens,
    saveYouTubeTokens,
} from "@/services/youtube/store/tokenStorage";

const SCOPES = ["https://www.googleapis.com/auth/youtube"];

export const handleYouTubeConnect = async (
    onConnect: (isConnected: boolean) => void,
) => {
    try {
        if (hasValidTokens()) {
            onConnect(true);
            return;
        }

        const { clientId, clientSecret, redirectUri } = config.youtube;

        if (!clientId || !clientSecret) {
            onConnect(false);
            return;
        }

        const oauth2Client = new OAuth2Client(
            clientId,
            clientSecret,
            redirectUri,
        );

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
            prompt: "consent",
        });

        try {
            const proc = Bun.spawn(["open", authUrl]);
            await proc.exited;
        } catch {
            console.error(authUrl);
        }

        const callbackData = await waitForOAuthCallback();

        if (!callbackData) {
            onConnect(false);
            return;
        }

        const { tokens } = await oauth2Client.getToken(callbackData.code);

        if (
            !tokens.access_token ||
            !tokens.refresh_token ||
            !tokens.expiry_date
        ) {
            onConnect(false);
            return;
        }

        saveYouTubeTokens({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryDate: tokens.expiry_date,
        });

        onConnect(true);
    } catch (error) {
        console.error("✗ Error during YouTube authentication:", error);
        onConnect(false);
    }
};
