#! /usr/bin/env bun
import { render } from "ink";
import { App } from "@/App.tsx";

process.stdout.write("\x1Bc");

render(<App />, {
    exitOnCtrlC: true,
});
