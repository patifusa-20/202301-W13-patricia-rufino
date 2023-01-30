export interface RepositoryImages<T> {
    load: () => Promise<T>;
}
