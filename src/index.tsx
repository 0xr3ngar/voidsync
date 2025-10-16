#! /usr/bin/env bun
import { render } from "ink";
import { App } from "@/App.tsx";
import { startGlobalOAuthServer } from "@/services/shared/oauthServer";

process.stdout.write("\x1Bc");

startGlobalOAuthServer();

render(<App />, {
    exitOnCtrlC: true,
});
