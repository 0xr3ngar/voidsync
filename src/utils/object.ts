export function pick<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key];
        }
    }
    return result;
}

export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
): Omit<T, K> {
    const result = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result;
}

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}

export function objectEntries<T extends object>(
    obj: T,
): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export function objectValues<T extends object>(obj: T): T[keyof T][] {
    return Object.values(obj) as T[keyof T][];
}

export function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

export function deepClone<T>(obj: T): T {
    return structuredClone(obj);
}

export function hasProperty<T extends object>(
    obj: T,
    key: PropertyKey,
): key is keyof T {
    return Object.hasOwn(obj, key);
}
