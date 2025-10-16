/**
 * Type-safe environment configuration
 * Bun automatically loads .env files
 */

export const config = {
    nodeEnv: process.env.NODE_ENV || "development",
    isDevelopment: process.env.NODE_ENV !== "production",
    isProduction: process.env.NODE_ENV === "production",

    youtube: {
        clientId: process.env.YOUTUBE_CLIENT_ID,
        clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
        redirectUri:
            process.env.YOUTUBE_REDIRECT_URI ||
            "http://localhost:3000/callback",
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri:
            process.env.SPOTIFY_REDIRECT_URI ||
            "http://localhost:3000/callback",
    },
} as const;
