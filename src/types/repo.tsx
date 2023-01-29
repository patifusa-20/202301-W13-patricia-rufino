export interface RepositoryProducts<T> {
    load: () => Promise<T[]>;
    create: (payload: Partial<T>) => Promise<T>;
}
