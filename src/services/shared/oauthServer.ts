type CallbackResolver = (success: boolean) => void;

let globalResolver: CallbackResolver | null = null;
let server: ReturnType<typeof Bun.serve> | null = null;

export const startGlobalOAuthServer = () => {
    if (server) {
        return;
    }

    server = Bun.serve({
        port: 3000,
        async fetch(req) {
            const url = new URL(req.url);

            if (url.pathname === "/callback") {
                const code = url.searchParams.get("code");
                const error = url.searchParams.get("error");

                if (error) {
                    globalResolver?.(false);
                    globalResolver = null;
                    return new Response(
                        createErrorPage(
                            "Authentication Failed",
                            `Error: ${error}`,
                        ),
                        { headers: { "Content-Type": "text/html" } },
                    );
                }

                if (code && globalResolver) {
                    pendingCallback = { url, code };
                    globalResolver(true);
                    globalResolver = null;
                    return new Response(createSuccessPage(), {
                        headers: { "Content-Type": "text/html" },
                    });
                }

                return new Response(
                    createErrorPage(
                        "No Pending Authentication",
                        "No authentication in progress",
                    ),
                    { headers: { "Content-Type": "text/html" } },
                );
            }

            return new Response("Not Found", { status: 404 });
        },
    });
};

export const stopGlobalOAuthServer = () => {
    if (server) {
        server.stop();
        server = null;
    }
};

let pendingCallback: { url: URL; code: string } | null = null;

export const waitForOAuthCallback = (): Promise<{
    url: URL;
    code: string;
} | null> => {
    return new Promise((resolve) => {
        globalResolver = (success: boolean) => {
            if (success && pendingCallback) {
                resolve(pendingCallback);
                pendingCallback = null;
            } else {
                resolve(null);
            }
        };

        setTimeout(() => {
            if (globalResolver) {
                globalResolver(false);
                globalResolver = null;
            }
        }, 60 * 1000);
    });
};

const createSuccessPage = (): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Authentication Successful</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: #1a1a1a;
                    color: white;
                }
                h1 { font-size: 2.5em; margin-bottom: 20px; }
                p { font-size: 1.2em; }
            </style>
        </head>
        <body>
            <h1>Authentication Successful!</h1>
            <p>You have successfully connected your account.</p>
            <p>You can close this window and return to the terminal.</p>
        </body>
        </html>
    `;
};

const createErrorPage = (title: string, message: string): string => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    color: white;
                    background: #1a1a1a;
                }
                h1 { font-size: 2.5em; margin-bottom: 20px; }
                p { font-size: 1.2em; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p>${message}</p>
            <p>You can close this window and try again.</p>
        </body>
        </html>
    `;
};
