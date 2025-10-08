/**
 * Type-safe environment configuration
 * Bun automatically loads .env files
 */

export const config = {
    nodeEnv: process.env.NODE_ENV || "development",
    isDevelopment: process.env.NODE_ENV !== "production",
    isProduction: process.env.NODE_ENV === "production",

    // Add your environment variables here
    // Example with assertDefined:
    // import { assertDefined } from "@/utils/assert";
    // apiKey: assertDefined(process.env.API_KEY, "API_KEY"),
    // apiUrl: process.env.API_URL || "https://api.example.com",
} as const;
