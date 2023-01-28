export interface RepositoryProducts<T> {
    load: () => Promise<T[]>;
}
