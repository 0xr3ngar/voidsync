import type { OAuth2Client } from "google-auth-library";
import { handleYoutubeRouteCallback } from "@/services/youtube/server/handleYoutubeRouteCallback";

const SERVER_TIMEOUT = 5 * 60 * 1000;

export const startOAuthServer = (oauth2Client: OAuth2Client) => {
    return new Promise<boolean>((resolve) => {
        let serverClosed = false;
        let server: ReturnType<typeof Bun.serve>;

        server = Bun.serve({
            port: 3000,
            async fetch(req) {
                const url = new URL(req.url);

                if (url.pathname === "/callback") {
                    return await handleYoutubeRouteCallback(
                        url,
                        oauth2Client,
                        server,
                        serverClosed,
                        (closed) => {
                            serverClosed = closed;
                        },
                        resolve,
                    );
                }

                return new Response("Not Found", { status: 404 });
            },
        });

        setTimeout(() => {
            if (!serverClosed) {
                serverClosed = true;
                server.stop();
                resolve(false);
            }
        }, SERVER_TIMEOUT);
    });
};
