import { Box } from "ink";
import { useState } from "react";
import { Auth } from "@/components/Auth/Auth";
import { Complete } from "@/components/Complete";
import { Intro } from "@/components/Intro";
import { QuickSplash } from "@/components/QuickSplash";
import { SyncingPlaylists } from "@/components/SyncingPlaylists";
import { SyncSelection } from "@/components/SyncSelection/SyncSelection";
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
    const [playlistId, setPlaylistId] = useState<string | undefined>();

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
                    }}
                />
            )}
            {currentStep === "syncing" && (
                <SyncingPlaylists
                    spotifyPlaylistIds={spotifyPlaylists}
                    youtubePlaylistIds={youtubePlaylists}
                    onComplete={(id) => {
                        setPlaylistId(id);
                        setCurrentStep("complete");
                    }}
                />
            )}
            {currentStep === "complete" && <Complete playlistId={playlistId} />}
        </Box>
    );
};
