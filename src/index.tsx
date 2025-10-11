#! /usr/bin/env bun

// import { config } from "@/config";
// import { unique } from "@/utils/array";
// import { objectKeys } from "@/utils/object";

// export function main() {
//     console.log("Hello from Bun + TypeScript!");
//     console.log(`Bun version: ${Bun.version}`);
//     console.log(`Environment: ${config.nodeEnv}`);
//     console.log("Unique values:", unique([1, 2, 2, 3]));
//     console.log("Object keys:", objectKeys({ a: 1, b: 2 }));
// }

// if (import.meta.main) {
//     main();
// }

import { render, Text } from "ink";

const Demo = () => <Text>Hello World</Text>;

render(<Demo />);
