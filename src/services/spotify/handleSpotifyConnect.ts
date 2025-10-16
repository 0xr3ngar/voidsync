import { config } from "@/config";
import { waitForOAuthCallback } from "@/services/shared/oauthServer";
import {
    hasValidSpotifyTokens,
    saveSpotifyTokens,
} from "@/services/spotify/store/tokenStorage";

const SCOPES = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
];

export const handleSpotifyConnect = async (
    onConnect: (isConnected: boolean) => void,
) => {
    try {
        if (hasValidSpotifyTokens()) {
            onConnect(true);
            return;
        }

        const { clientId, clientSecret, redirectUri } = config.spotify;

        if (!clientId || !clientSecret) {
            onConnect(false);
            return;
        }

        const authUrl = new URL("https://accounts.spotify.com/authorize");
        authUrl.searchParams.append("client_id", clientId);
        authUrl.searchParams.append("response_type", "code");
        authUrl.searchParams.append(
            "redirect_uri",
            redirectUri || "http://localhost:3000/callback",
        );
        authUrl.searchParams.append("scope", SCOPES.join(" "));
        authUrl.searchParams.append("show_dialog", "true");

        try {
            const proc = Bun.spawn(["open", authUrl.toString()]);
            await proc.exited;
        } catch {
            console.error(authUrl.toString());
        }

        const callbackData = await waitForOAuthCallback();

        if (!callbackData) {
            onConnect(false);
            return;
        }

        const credentials = btoa(`${clientId}:${clientSecret}`);

        const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${credentials}`,
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code: callbackData.code,
                    redirect_uri:
                        redirectUri || "http://localhost:3000/callback",
                }),
            },
        );

        if (!tokenResponse.ok) {
            onConnect(false);
            return;
        }

        const tokenData = (await tokenResponse.json()) as {
            access_token: string;
            refresh_token: string;
            expires_in: number;
        };

        if (!tokenData.access_token || !tokenData.refresh_token) {
            onConnect(false);
            return;
        }

        const expiryDate = Date.now() + tokenData.expires_in * 1000;

        saveSpotifyTokens({
            accessToken: tokenData.access_token,
            refreshToken: tokenData.refresh_token,
            expiryDate: expiryDate,
        });

        onConnect(true);
    } catch (error) {
        console.error("✗ Error during Spotify authentication:", error);
        onConnect(false);
    }
};
