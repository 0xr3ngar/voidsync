import { Box } from "ink";
import { AuthPlatformItem } from "@/components/Auth/AuthPlatformItem";
import type { Platform } from "@/models/Platform";

interface AuthBodyProps {
    platforms: Platform[];
    selectedIndex: number;
}
export const AuthBody = ({ platforms, selectedIndex }: AuthBodyProps) => {
    return (
        <Box flexDirection="column" gap={1}>
            {platforms.map((platform, index) => (
                <AuthPlatformItem
                    key={platform.name}
                    isSelected={selectedIndex === index}
                    name={platform.name}
                    isConnected={platform.connected}
                    color={platform.color}
                />
            ))}
        </Box>
    );
};
