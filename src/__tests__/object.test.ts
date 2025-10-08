import { describe, expect, test } from "bun:test";
import {
    deepClone,
    hasProperty,
    isEmptyObject,
    objectEntries,
    objectKeys,
    objectValues,
    omit,
    pick,
} from "@/utils/object";

describe("pick", () => {
    test("should pick specified keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });

    test("should handle empty keys array", () => {
        const obj = { a: 1, b: 2 };
        expect(pick(obj, [])).toEqual({});
    });

    test("should only pick existing keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pick(obj, ["a", "b"])).toEqual({ a: 1, b: 2 });
    });
});

describe("omit", () => {
    test("should omit specified keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
    });

    test("should handle empty keys array", () => {
        const obj = { a: 1, b: 2 };
        expect(omit(obj, [])).toEqual({ a: 1, b: 2 });
    });

    test("should handle multiple keys", () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 };
        expect(omit(obj, ["b", "d"])).toEqual({ a: 1, c: 3 });
    });
});

describe("objectKeys", () => {
    test("should return object keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objectKeys(obj)).toEqual(["a", "b", "c"]);
    });

    test("should return empty array for empty object", () => {
        expect(objectKeys({})).toEqual([]);
    });
});

describe("objectEntries", () => {
    test("should return key-value pairs", () => {
        const obj = { a: 1, b: 2 };
        expect(objectEntries(obj)).toEqual([
            ["a", 1],
            ["b", 2],
        ]);
    });

    test("should return empty array for empty object", () => {
        expect(objectEntries({})).toEqual([]);
    });
});

describe("objectValues", () => {
    test("should return object values", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(objectValues(obj)).toEqual([1, 2, 3]);
    });

    test("should return empty array for empty object", () => {
        expect(objectValues({})).toEqual([]);
    });
});

describe("isEmptyObject", () => {
    test("should return true for empty object", () => {
        expect(isEmptyObject({})).toBe(true);
    });

    test("should return false for non-empty object", () => {
        expect(isEmptyObject({ a: 1 })).toBe(false);
    });

    test("should return false for object with undefined value", () => {
        expect(isEmptyObject({ a: undefined })).toBe(false);
    });
});

describe("deepClone", () => {
    test("should clone simple object", () => {
        const obj = { a: 1, b: 2 };
        const cloned = deepClone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
    });

    test("should clone nested object", () => {
        const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
        const cloned = deepClone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned.b).not.toBe(obj.b);
        expect(cloned.b.d).not.toBe(obj.b.d);
    });

    test("should clone array", () => {
        const arr = [1, 2, [3, 4]];
        const cloned = deepClone(arr);
        expect(cloned).toEqual(arr);
        expect(cloned).not.toBe(arr);
        expect(cloned[2]).not.toBe(arr[2]);
    });
});

describe("hasProperty", () => {
    test("should return true for own property", () => {
        const obj = { a: 1, b: 2 };
        expect(hasProperty(obj, "a")).toBe(true);
    });

    test("should return false for non-existent property", () => {
        const obj = { a: 1 };
        expect(hasProperty(obj, "b")).toBe(false);
    });

    test("should return true for property with undefined value", () => {
        const obj = { a: undefined };
        expect(hasProperty(obj, "a")).toBe(true);
    });

    test("should return false for inherited property", () => {
        const obj = Object.create({ inherited: true });
        expect(hasProperty(obj, "inherited")).toBe(false);
    });
});
