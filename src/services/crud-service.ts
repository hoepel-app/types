// TODO ObservableCrudService that return Observables instead of Promises (but I don't want to bring in rxjs dep
//      just to type an interface)

export interface CrudService<T> {
    get(id: string): Promise<T>;
    getAll(): Promise<ReadonlyArray<T>>;
    getMany(ids: ReadonlyArray<string>): Promise<ReadonlyArray<T>>;
    delete(id: string): Promise<void>;
    // TODO create
    // TODO update
}

export interface CrudIndexedByTenantService<T> {
    get(tenant: string, id: string): Promise<T>;
    getAll(tenant: string): Promise<ReadonlyArray<T>>;
    getMany(tenant: string, ids: ReadonlyArray<string>): Promise<ReadonlyArray<T>>;
    delete(tenant: string, id: string): Promise<void>;
    // TODO create
    // TODO update
}
