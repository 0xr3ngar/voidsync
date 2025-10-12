import { Box } from "ink";
import { useState } from "react";
import { Auth } from "@/components/Auth/Auth";
import { Intro } from "@/components/Intro";

type Step = "intro" | "auth" | "sync" | "complete";

export const App = () => {
    const [currentStep, setCurrentStep] = useState<Step>("intro");

    return (
        <Box>
            {currentStep === "intro" && (
                <Intro onComplete={() => setCurrentStep("auth")} />
            )}
            {currentStep === "auth" && (
                <Auth onComplete={() => setCurrentStep("sync")} />
            )}
        </Box>
    );
};
