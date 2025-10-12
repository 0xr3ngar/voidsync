import Conf from "conf";

export const store = new Conf({
    projectName: "voidsync",
    defaults: {
        hasSeenIntro: false,
        connectedPlatforms: [],
    },
});
