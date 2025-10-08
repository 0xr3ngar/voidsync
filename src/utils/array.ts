export function unique<T>(array: T[]): T[] {
    return [...new Set(array)];
}

export function compact<T>(array: (T | null | undefined)[]): T[] {
    return array.filter((item): item is T => item != null);
}

export function flatten<T>(array: T[][]): T[] {
    return array.flat();
}

export function difference<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.filter((item) => !set2.has(item));
}

export function union<T>(arr1: T[], arr2: T[]): T[] {
    return unique([...arr1, ...arr2]);
}

export function sum(array: number[]): number {
    return array.reduce((acc, val) => acc + val, 0);
}

export function findFirst<T>(
    array: T[],
    predicate: (item: T) => boolean,
): T | undefined {
    return array.find((item) => predicate(item));
}

export function findLast<T>(
    array: T[],
    predicate: (item: T) => boolean,
): T | undefined {
    for (let i = array.length - 1; i >= 0; i--) {
        const item = array[i];
        if (item !== undefined && predicate(item)) {
            return item;
        }
    }
    return undefined;
}
