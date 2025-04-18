export const CreateDraftStorage = <T>(key: string) => {
    return {
        save: (data: T) => {
            localStorage.setItem(key, JSON.stringify(data));
        },
        get: (): T | null => {
            const raw = localStorage.getItem(key);
            return raw ? (JSON.parse(raw) as T) : null;
        },
        clear: () => {
            localStorage.removeItem(key);
        },
    };
};
