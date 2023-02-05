export interface RepositoryImages<T> {
    load: (query: string) => Promise<T[]>;
}
