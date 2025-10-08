import { describe, expect, test } from "bun:test";
import {
    compact,
    difference,
    findFirst,
    findLast,
    flatten,
    sum,
    union,
    unique,
} from "@/utils/array";

describe("unique", () => {
    test("should return unique elements from array", () => {
        expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    test("should work with strings", () => {
        expect(unique(["a", "b", "a", "c", "b"])).toEqual(["a", "b", "c"]);
    });

    test("should return empty array for empty input", () => {
        expect(unique([])).toEqual([]);
    });

    test("should preserve order of first occurrence", () => {
        expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });
});

describe("compact", () => {
    test("should remove null and undefined", () => {
        expect(compact([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
    });

    test("should keep falsy values that are not null/undefined", () => {
        expect(compact([0, false, "", null, undefined, NaN])).toEqual([
            0,
            false,
            "",
            NaN,
        ]);
    });

    test("should return empty array for array of nulls", () => {
        expect(compact([null, undefined, null])).toEqual([]);
    });

    test("should handle empty array", () => {
        expect(compact([])).toEqual([]);
    });
});

describe("flatten", () => {
    test("should flatten nested arrays one level", () => {
        expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]);
    });

    test("should handle empty arrays", () => {
        expect(flatten([[], [1], []])).toEqual([1]);
    });

    test("should return empty array for empty input", () => {
        expect(flatten([])).toEqual([]);
    });

    test("should work with strings", () => {
        expect(flatten([["a", "b"], ["c"]])).toEqual(["a", "b", "c"]);
    });
});

describe("difference", () => {
    test("should return elements in first array not in second", () => {
        expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
    });

    test("should return all elements if no overlap", () => {
        expect(difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
    });

    test("should return empty array if all elements in second", () => {
        expect(difference([1, 2], [1, 2, 3])).toEqual([]);
    });

    test("should handle empty arrays", () => {
        expect(difference([], [1, 2])).toEqual([]);
        expect(difference([1, 2], [])).toEqual([1, 2]);
    });

    test("should work with strings", () => {
        expect(difference(["a", "b", "c"], ["b"])).toEqual(["a", "c"]);
    });
});

describe("union", () => {
    test("should return unique elements from both arrays", () => {
        expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
    });

    test("should handle duplicates within same array", () => {
        expect(union([1, 1, 2], [2, 3, 3])).toEqual([1, 2, 3]);
    });

    test("should handle empty arrays", () => {
        expect(union([], [1, 2])).toEqual([1, 2]);
        expect(union([1, 2], [])).toEqual([1, 2]);
        expect(union([], [])).toEqual([]);
    });

    test("should work with strings", () => {
        expect(union(["a", "b"], ["b", "c"])).toEqual(["a", "b", "c"]);
    });
});

describe("sum", () => {
    test("should return sum of numbers", () => {
        expect(sum([1, 2, 3, 4])).toBe(10);
    });

    test("should return 0 for empty array", () => {
        expect(sum([])).toBe(0);
    });

    test("should handle negative numbers", () => {
        expect(sum([1, -2, 3, -4])).toBe(-2);
    });

    test("should handle decimals", () => {
        expect(sum([1.5, 2.5, 3])).toBe(7);
    });

    test("should handle single element", () => {
        expect(sum([42])).toBe(42);
    });
});

describe("findFirst", () => {
    test("should find first matching element", () => {
        expect(findFirst([1, 2, 3, 4], (x) => x > 2)).toBe(3);
    });

    test("should return undefined if no match", () => {
        expect(findFirst([1, 2, 3], (x) => x > 5)).toBeUndefined();
    });

    test("should return first match when multiple exist", () => {
        expect(findFirst([1, 2, 3, 2, 1], (x) => x === 2)).toBe(2);
    });

    test("should handle empty array", () => {
        expect(findFirst([], (x) => x === 1)).toBeUndefined();
    });

    test("should work with objects", () => {
        const items = [
            { id: 1, name: "a" },
            { id: 2, name: "b" },
            { id: 3, name: "c" },
        ];
        expect(findFirst(items, (x) => x.id === 2)).toEqual({
            id: 2,
            name: "b",
        });
    });
});

describe("findLast", () => {
    test("should find last matching element", () => {
        expect(findLast([1, 2, 3, 4, 3], (x) => x === 3)).toBe(3);
    });

    test("should return undefined if no match", () => {
        expect(findLast([1, 2, 3], (x) => x > 5)).toBeUndefined();
    });

    test("should find from end of array", () => {
        const items = [1, 2, 3, 4, 5];
        expect(findLast(items, (x) => x > 2)).toBe(5);
    });

    test("should handle empty array", () => {
        expect(findLast([], (x) => x === 1)).toBeUndefined();
    });

    test("should work with objects", () => {
        const items = [
            { id: 1, name: "a" },
            { id: 2, name: "b" },
            { id: 1, name: "c" },
        ];
        expect(findLast(items, (x) => x.id === 1)).toEqual({
            id: 1,
            name: "c",
        });
    });

    test("should handle arrays with undefined elements", () => {
        const arr = [1, 2, undefined, 3];
        expect(findLast(arr, (x) => x === 3)).toBe(3);
    });
});
