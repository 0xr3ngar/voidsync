import { OAuth2Client } from "google-auth-library";
import { config } from "@/config";
import { startOAuthServer } from "@/services/youtube/server/oauthServer";
import { hasValidTokens } from "@/services/youtube/store/tokenStorage";

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

        const authPromise = startOAuthServer(oauth2Client);

        try {
            const proc = Bun.spawn(["open", authUrl]);
            await proc.exited;
        } catch {
            console.error(authUrl);
        }

        const success = await authPromise;
        onConnect(success);
    } catch (error) {
        console.error("✗ Error during YouTube authentication:", error);
        onConnect(false);
    }
};
