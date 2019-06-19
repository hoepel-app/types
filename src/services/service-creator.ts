import {
    Collection,
    MappingCollection,
    TenantIndexedCollection,
    TenantIndexedMappingCollection,
} from "../collections/collection";

import { CrudIndexedByTenantService, CrudService } from "./crud-service";

export type CrudServiceCreator<T> = (collection: Collection<T>) => CrudService<T>;
export type TenantIndexedCrudServiceCreator<T> = (collection: TenantIndexedCollection<T>) => CrudIndexedByTenantService<T>;
export type MappingCrudServiceCreator<IT, T> = (collection: MappingCollection<IT, T>) => CrudService<T>;
export type TenantIndexedMappingCrudServiceCreator<IT, T> = (collection: TenantIndexedMappingCollection<IT, T>) =>
    CrudIndexedByTenantService<T>;
