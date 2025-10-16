import { Box } from "ink";
import { useState } from "react";
import { Auth } from "@/components/Auth/Auth";
import { Intro } from "@/components/Intro";
import { QuickSplash } from "@/components/QuickSplash";
import { SyncSelection } from "@/components/SyncSelection/SyncSelection";
import { handlePlaylistSync } from "@/services/handlePlaylistSync";
import { store } from "@/store";

type Step =
    | "intro"
    | "splash"
    | "auth"
    | "sync-selection"
    | "syncing"
    | "complete";

export const App = () => {
    const hasSeenIntro = store.get("hasSeenIntro");
    const [currentStep, setCurrentStep] = useState<Step>(
        hasSeenIntro ? "splash" : "intro",
    );
    const [spotifyPlaylists, setSpotifyPlaylists] = useState<string[]>([]);
    const [youtubePlaylists, setYoutubePlaylists] = useState<string[]>([]);

    return (
        <Box>
            {currentStep === "intro" && (
                <Intro
                    onComplete={() => {
                        store.set("hasSeenIntro", true);
                        setCurrentStep("auth");
                    }}
                />
            )}
            {currentStep === "splash" && (
                <QuickSplash onComplete={() => setCurrentStep("auth")} />
            )}
            {currentStep === "auth" && (
                <Auth onComplete={() => setCurrentStep("sync-selection")} />
            )}
            {currentStep === "sync-selection" && (
                <SyncSelection
                    onComplete={(spotifyPlaylistIds, youtubePlaylistIds) => {
                        setSpotifyPlaylists(spotifyPlaylistIds);
                        setYoutubePlaylists(youtubePlaylistIds);
                        setCurrentStep("syncing");
                        // TODO: move handlePlaylistSync to syncing step
                        handlePlaylistSync(
                            spotifyPlaylistIds,
                            youtubePlaylistIds,
                        );
                    }}
                />
            )}
            {/* TODO: Add syncing step */}
        </Box>
    );
};
