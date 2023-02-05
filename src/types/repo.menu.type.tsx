export interface RepositoryMenus<T> {
    load: () => Promise<T>;
    create: (payload: Partial<T>) => Promise<T>;
}
