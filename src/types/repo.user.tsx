export interface RepositoryUsers<T> {
    load: () => Promise<T[]>;
    create: (payload: Partial<T>) => Promise<T>;
}
