import { config } from "@/config";
import { unique } from "@/utils/array";
import { objectKeys } from "@/utils/object";

export function main() {
    console.log("Hello from Bun + TypeScript!");
    console.log(`Bun version: ${Bun.version}`);
    console.log(`Environment: ${config.nodeEnv}`);

    // Example usage of utility functions
    console.log("Unique values:", unique([1, 2, 2, 3]));
    console.log("Object keys:", objectKeys({ a: 1, b: 2 }));
}

// Run main if this file is executed directly
if (import.meta.main) {
    main();
}
