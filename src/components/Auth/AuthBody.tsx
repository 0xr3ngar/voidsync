import { Box } from "ink";
import { AuthPlatformItem } from "@/components/Auth/AuthPlatformItem";
import type { Platform } from "@/models/Platform";

interface AuthBodyProps {
    platforms: Platform[];
    selectedIndex: number;
}
export const AuthBody = ({ platforms, selectedIndex }: AuthBodyProps) => {
    return (
        <Box flexDirection="column" gap={1} justifyContent="center">
            {platforms.map((platform, index) => (
                <AuthPlatformItem
                    key={platform.name}
                    isSelected={selectedIndex === index}
                    isConnected={platform.connected}
                    textParts={platform.textParts}
                    name={platform.name}
                />
            ))}
        </Box>
    );
};
