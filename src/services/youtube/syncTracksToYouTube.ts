import { addVideoToPlaylist } from "./addVideoToPlaylist";
import { createYouTubePlaylist } from "./createYouTubePlaylist";
import { searchYouTubeVideo } from "./searchYouTubeVideo";

export interface SyncProgress {
    phase: "searching" | "adding";
    total: number;
    current: number;
    successful: number;
    failed: number;
    currentTrack: string;
}

interface SyncResult {
    playlistId: string;
    successful: number;
    failed: number;
}

export const syncTracksToYouTube = async (
    tracks: string[],
    playlistName: string,
    onProgress?: (progress: SyncProgress) => void,
): Promise<SyncResult> => {
    const videoResults: Array<{ track: string; videoId: string | null }> = [];

    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        if (!track) continue;

        onProgress?.({
            phase: "searching",
            total: tracks.length,
            current: i + 1,
            successful: 0,
            failed: 0,
            currentTrack: track,
        });

        try {
            const videoId = await searchYouTubeVideo(track);
            videoResults.push({ track, videoId });
        } catch {
            videoResults.push({ track, videoId: null });
        }

        // Small delay to be respectful
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const foundVideos = videoResults.filter((r) => r.videoId !== null);

    const playlistId = await createYouTubePlaylist(
        playlistName,
        `Synced from Spotify - ${foundVideos.length}/${tracks.length} tracks found`,
    );

    let successful = 0;
    let failed = 0;

    for (let i = 0; i < foundVideos.length; i++) {
        const result = foundVideos[i];
        if (!result?.videoId) continue;

        const { track, videoId } = result;

        onProgress?.({
            phase: "adding",
            total: foundVideos.length,
            current: i + 1,
            successful,
            failed,
            currentTrack: track,
        });

        try {
            await addVideoToPlaylist(playlistId, videoId);
            successful++;
        } catch {
            failed++;
        }

        // Small delay to be respectful
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    return { playlistId, successful, failed };
};
