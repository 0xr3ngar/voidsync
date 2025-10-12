import { Box } from "ink";
import { useState } from "react";
import { Auth } from "@/components/Auth/Auth";
import { Intro } from "@/components/Intro";
import { QuickSplash } from "@/components/QuickSplash";
import { store } from "@/store";

type Step = "intro" | "splash" | "auth" | "sync" | "complete";

export const App = () => {
    const hasSeenIntro = store.get("hasSeenIntro");
    const [currentStep, setCurrentStep] = useState<Step>(
        hasSeenIntro ? "splash" : "intro",
    );

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
                <Auth onComplete={() => setCurrentStep("sync")} />
            )}
        </Box>
    );
};
