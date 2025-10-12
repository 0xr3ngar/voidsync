import type { Platform } from "@/models/Platform";
import { handleSoundCloudConnect } from "@/services/soundcloud/handleSoundCloudConnect";
import { handleSpotifyConnect } from "@/services/spotify/handleSpotifyConnect";
import { handleYouTubeConnect } from "@/services/youtube/handleYouTubeConnect";
import { assert } from "@/utils/assert";

interface HandlePlatformConnectProps {
    platform: Platform;
    onConnect: (isConnected: boolean) => void;
}
export const handlePlatformConnect = ({
    platform,
    onConnect,
}: HandlePlatformConnectProps) => {
    switch (platform.name) {
        case "YouTube":
            handleYouTubeConnect(platform, onConnect);
            break;
        case "Spotify":
            handleSpotifyConnect(platform, onConnect);
            break;
        case "SoundCloud":
            handleSoundCloudConnect(platform, onConnect);
            break;
        default:
            assert(false, `Unsupported platform: ${platform.name}`);
    }
};
