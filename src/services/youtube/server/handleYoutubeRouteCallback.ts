import type { OAuth2Client } from "google-auth-library";
import { createErrorPage } from "@/services/youtube/pages/createErrorPage";
import { createSuccessPage } from "@/services/youtube/pages/createSuccessPage";
import { saveYouTubeTokens } from "@/services/youtube/store/tokenStorage";

export const handleYoutubeRouteCallback = async (
    url: URL,
    oauth2Client: OAuth2Client,
    server: ReturnType<typeof Bun.serve>,
    serverClosed: boolean,
    setServerClosed: (closed: boolean) => void,
    resolve: (value: boolean) => void,
) => {
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
        const errorPage = createErrorPage(
            "Authentication Failed",
            `Error: ${error}`,
        );

        if (!serverClosed) {
            setServerClosed(true);
            server.stop();
            resolve(false);
        }

        return new Response(errorPage, {
            headers: { "Content-Type": "text/html" },
        });
    }

    if (!code) {
        const errorPage = createErrorPage(
            "No Authorization Code",
            "No authorization code received.",
        );

        if (!serverClosed) {
            setServerClosed(true);
            server.stop();
            resolve(false);
        }

        return new Response(errorPage, {
            headers: { "Content-Type": "text/html" },
        });
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);

        if (
            !tokens.access_token ||
            !tokens.refresh_token ||
            !tokens.expiry_date
        ) {
            throw new Error("Invalid tokens received");
        }

        saveYouTubeTokens({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiryDate: tokens.expiry_date,
        });

        const successPage = createSuccessPage();

        if (!serverClosed) {
            setServerClosed(true);
            server.stop();
            resolve(true);
        }

        return new Response(successPage, {
            headers: { "Content-Type": "text/html" },
        });
    } catch {
        const errorPage = createErrorPage(
            "Token Exchange Failed",
            "Failed to exchange authorization code for tokens.",
        );

        if (!serverClosed) {
            setServerClosed(true);
            server.stop();
            resolve(false);
        }

        return new Response(errorPage, {
            headers: { "Content-Type": "text/html" },
        });
    }
};
