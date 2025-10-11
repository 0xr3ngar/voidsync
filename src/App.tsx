import { Box } from "ink";
import { useState } from "react";
import { Intro } from "@/components/Intro";

type Step = "intro" | "auth" | "sync" | "complete";

export const App = () => {
    const [currentStep, setCurrentStep] = useState<Step>("intro");

    return (
        <Box>
            {currentStep === "intro" && (
                <Intro onComplete={() => setCurrentStep("auth")} />
            )}
        </Box>
    );
};
