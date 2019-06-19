import {
    Collection,
    MappingCollection,
    TenantIndexedCollection,
    TenantIndexedMappingCollection,
} from "../collections/collection";

import { CrudIndexedByTenantService, CrudService } from "./crud-service";

type CrudServiceCreator<T> = ((collection: Collection<T>) => CrudService<T>) |
    ((collection: TenantIndexedCollection<T>) => CrudIndexedByTenantService<T>);

type MappingCrudServiceCreator<IT, T> = ((collection: MappingCollection<IT, T>) => CrudService<T>) |
    ((collection: TenantIndexedMappingCollection<IT, T>) => CrudIndexedByTenantService<T>);
