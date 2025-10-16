import type { Platform } from "@/models/Platform";
import { handleSoundCloudConnect } from "@/services/soundcloud/handleSoundCloudConnect";
import { handleSpotifyConnect } from "@/services/spotify/handleSpotifyConnect";
import { handleYouTubeConnect } from "@/services/youtube/handleYouTubeConnect";
import { assert } from "@/utils/assert";

interface HandlePlatformConnectProps {
    platform: Platform;
    onConnect: (isConnected: boolean) => void;
}
export const handlePlatformConnect = async ({
    platform,
    onConnect,
}: HandlePlatformConnectProps) => {
    try {
        switch (platform.name) {
            case "YouTube":
                await handleYouTubeConnect(onConnect);
                break;
            case "Spotify":
                await handleSpotifyConnect(onConnect);
                break;
            case "SoundCloud":
                await handleSoundCloudConnect(platform, onConnect);
                break;
            default:
                assert(false, `Unsupported platform: ${platform.name}`);
        }
    } catch (error) {
        console.error(`Error connecting to ${platform.name}:`, error);
        onConnect(false);
    }
};
