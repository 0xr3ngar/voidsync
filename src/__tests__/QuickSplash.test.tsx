import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { render } from "ink-testing-library";
import { QuickSplash } from "@/components/QuickSplash";

const SPLASH_DURATION = 1500;

describe("QuickSplash", () => {
    beforeEach(() => {
        mock.restore();
    });

    afterEach(() => {
        mock.restore();
    });

    test("should render VoidSync branding", () => {
        const onComplete = mock(() => {});
        const { lastFrame } = render(<QuickSplash onComplete={onComplete} />);

        expect(lastFrame()).toContain(
            "Conquer the void of scattered playlists.",
        );
    });

    test("should call onComplete after 1.5 seconds", async () => {
        const onComplete = mock(() => {});
        render(<QuickSplash onComplete={onComplete} />);

        expect(onComplete).not.toHaveBeenCalled();

        await Bun.sleep(SPLASH_DURATION + 100);

        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    test("should not call onComplete before timeout", async () => {
        const onComplete = mock(() => {});
        render(<QuickSplash onComplete={onComplete} />);

        await Bun.sleep(1000);

        expect(onComplete).not.toHaveBeenCalled();
    });

    test("should cleanup timer on unmount", () => {
        const onComplete = mock(() => {});
        const { unmount } = render(<QuickSplash onComplete={onComplete} />);

        unmount();

        expect(onComplete).not.toHaveBeenCalled();
    });
});
