#! /usr/bin/env bun
import { render } from "ink";
import { App } from "@/App.tsx";
import {
    startGlobalOAuthServer,
    stopGlobalOAuthServer,
} from "@/services/shared/oauthServer";

process.stdout.write("\x1Bc");

startGlobalOAuthServer();

const instance = render(<App />, {
    exitOnCtrlC: true,
});

process.on("SIGINT", () => {
    stopGlobalOAuthServer();
    instance.unmount();
    process.exit(0);
});

instance.waitUntilExit().then(async () => {
    stopGlobalOAuthServer();
    process.stdout.write("\x1Bc");
    process.exit(0);
});
