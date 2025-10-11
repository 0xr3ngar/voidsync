import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { render } from "ink-testing-library";
import { Intro } from "@/components/Intro";

const INITIAL_RENDER_DELAY = 100;
const CYCLE_DELAY = 1000;

describe("Intro", () => {
    beforeEach(() => {
        mock.restore();
    });

    afterEach(() => {
        mock.restore();
    });

    test("should render first platform (YouTube) initially", () => {
        const onComplete = mock(() => {});
        const { lastFrame } = render(<Intro onComplete={onComplete} />);

        expect(lastFrame()).toContain("Team Red?");
    });

    test("should cycle through platforms in order", async () => {
        const onComplete = mock(() => {});
        const { lastFrame } = render(<Intro onComplete={onComplete} />);

        expect(lastFrame()).toContain("Team Red?");

        await Bun.sleep(CYCLE_DELAY + INITIAL_RENDER_DELAY);
        expect(lastFrame()).toContain("Team Green?");

        await Bun.sleep(CYCLE_DELAY);
        expect(lastFrame()).toContain("Team Orange?");

        await Bun.sleep(CYCLE_DELAY);
        expect(lastFrame()).toContain("Why choose?");
    });

    test("should stop cycling at VoidSync", async () => {
        const onComplete = mock(() => {});
        const { lastFrame } = render(<Intro onComplete={onComplete} />);

        await Bun.sleep(CYCLE_DELAY * 3 + INITIAL_RENDER_DELAY);
        expect(lastFrame()).toContain("Why choose?");

        await Bun.sleep(CYCLE_DELAY);
        expect(lastFrame()).toContain("Why choose?");

        expect(lastFrame()).not.toContain("Team Red?");
    });

    test("should display correct taglines for each platform", async () => {
        const onComplete = mock(() => {});
        const { lastFrame } = render(<Intro onComplete={onComplete} />);

        const taglines = [
            "Team Red?",
            "Team Green?",
            "Team Orange?",
            "Why choose?",
        ];

        for (let i = 0; i < taglines.length; i++) {
            await Bun.sleep(i === 0 ? INITIAL_RENDER_DELAY : CYCLE_DELAY);
            expect(lastFrame()).toContain(taglines[i]);
        }
    });

    test("should cleanup timers on unmount", () => {
        const onComplete = mock(() => {});
        const { unmount } = render(<Intro onComplete={onComplete} />);

        unmount();
        expect(onComplete).not.toHaveBeenCalled();
    });
});
