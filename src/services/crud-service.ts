// TODO ObservableCrudService that return Observables instead of Promises (but I don't want to bring in rxjs dep
//      just to type an interface)

/**
 * Crud service for a collection that returns the id with the object
 */
export interface CrudWithIdService<T> {
    get(id: string): Promise<T>;
    getAll(): Promise<ReadonlyArray<{ readonly obj: T, readonly id: string }>>;
    getMany(ids: ReadonlyArray<string>): Promise<ReadonlyArray<{ readonly obj: T, readonly id: string }>>;
    delete(id: string): Promise<void>;
    // TODO create
    // TODO update
}

/**
 * Crud service for a collection indexed by tenant that returns the id with the object
 */
export interface TenantIndexedWithIdCrudService<T> {
    get(tenant: string, id: string): Promise<T>;
    getAll(tenant: string): Promise<ReadonlyArray<{ readonly obj: T, readonly id: string }>>;
    getMany(tenant: string, ids: ReadonlyArray<string>): Promise<ReadonlyArray<{ readonly obj: T, readonly id: string }>>;
    delete(tenant: string, id: string): Promise<void>;
    // TODO create
    // TODO update
}

/**
 * Crud service for a collection
 */
export interface CrudService<T> {
    get(id: string): Promise<T>;
    getAll(): Promise<ReadonlyArray<T>>;
    getMany(ids: ReadonlyArray<string>): Promise<ReadonlyArray<T>>;
    delete(id: string): Promise<void>;
    // TODO create
    // TODO update
}

/**
 * Crud service for a collection indexed by tenant
 */
export interface TenantIndexedCrudService<T> {
    get(tenant: string, id: string): Promise<T>;
    getAll(tenant: string): Promise<ReadonlyArray<T>>;
    getMany(tenant: string, ids: ReadonlyArray<string>): Promise<ReadonlyArray<T>>;
    delete(tenant: string, id: string): Promise<void>;
    // TODO create
    // TODO update
}
