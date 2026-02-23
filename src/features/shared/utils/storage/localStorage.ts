export function storeItem<T>(key: string, value: T ) : void {
    localStorage.setItem(key, JSON.stringify(value))
}

export function getItem<T>(key: string) : T | null {
    const raw = localStorage.getItem(key);

    if(!raw) return null;

    try {
        return JSON.parse(raw) as T;
    } catch {
        console.log(`Invalid JSON in local storage with key ${key}`);
        return null;
    }
}

export function removeItemsByKey(key: string) : void {
    localStorage.removeItem(key);
}

export function clearItems() : void {
    localStorage.clear();
} 