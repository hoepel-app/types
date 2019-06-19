import {
    Collection,
    MappingCollection,
    TenantIndexedCollection,
    TenantIndexedMappingCollection,
} from "../collections/collection";

import {
    CrudService,
    CrudWithIdService,
    TenantIndexedCrudService,
    TenantIndexedWithIdCrudService,
} from "./crud-service";

export type CrudServiceCreator<T> = (collection: Collection<T>) => CrudService<T>;
export type TenantIndexedCrudServiceCreator<T> = (collection: TenantIndexedCollection<T>) => TenantIndexedCrudService<T>;
export type MappingCrudServiceCreator<IT, T> = (collection: MappingCollection<IT, T>) => CrudWithIdService<T>;
export type TenantIndexedMappingCrudServiceCreator<IT, T> = (collection: TenantIndexedMappingCollection<IT, T>) =>
    TenantIndexedWithIdCrudService<T>;
