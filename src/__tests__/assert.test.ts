import { describe, expect, test } from "bun:test";
import { AssertError, assert, assertDefined } from "@/utils/assert";

describe("assert", () => {
    test("should not throw when condition is true", () => {
        expect(() => assert(true, "This should pass")).not.toThrow();
    });

    test("should throw AssertError when condition is false", () => {
        expect(() => assert(false, "This should fail")).toThrow(AssertError);
    });

    test("should include message in error", () => {
        try {
            assert(false, "Custom error message");
        } catch (error) {
            expect(error).toBeInstanceOf(AssertError);
            expect((error as Error).message).toContain("Custom error message");
        }
    });
});

describe("assertDefined", () => {
    test("should return value when defined", () => {
        const value = "test";
        expect(assertDefined(value, "value")).toBe("test");
    });

    test("should return value when it's 0 or empty string", () => {
        expect(assertDefined(0, "zero")).toBe(0);
        expect(assertDefined("", "empty")).toBe("");
        expect(assertDefined(false, "false")).toBe(false);
    });

    test("should throw when value is null", () => {
        expect(() => assertDefined(null, "nullValue")).toThrow(AssertError);
    });

    test("should throw when value is undefined", () => {
        expect(() => assertDefined(undefined, "undefinedValue")).toThrow(
            AssertError,
        );
    });
});
