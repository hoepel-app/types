/**
 * @tparam T
 */
import { Mapper } from "../mappers/mapper";

/**
 * A collection in Firestore storing entities of type T
 */
export class Collection<T extends { readonly [key: string]: any }> {
    constructor(
        readonly collectionName: string,
    ) {}
}

/**
 * A collection that maps plain objects received from Firestore using a mapper to rich object
 */
export class MappingCollection<IT extends { readonly [field: string]: any; }, T> extends Collection<T> {
    constructor(collectionName: string, readonly mapper: Mapper<IT, T>) {
        super(collectionName);
    }
}

/**
 * A collection that is indexed by tenant (every document contains a tenant field - e.g. { name: ..., tenant: ..., ... }
 *
 * @tparam T Type of the lifted object
 */
export class TenantIndexedCollection<T extends Omit<{ readonly [field: string]: any; }, "tenant">> extends Collection<T> {
    constructor(collectionName: string) {
        super(collectionName);
    }
}

/**
 * A collection that is indexed by tenant (every document contains a tenant field - e.g. { name: ..., tenant: ..., ... }
 * and mapping the plain objects it receives from the database to rich objects
 *
 * @tparam IT Interface type representing how the type is saved in the database
 * @tparam T Type of the lifted object
 */
export class TenantIndexedMappingCollection<IT extends Omit<{ readonly [field: string]: any; }, "tenant">, T> extends Collection<T> {
    constructor(collectionName: string, readonly mapper: Mapper<Pick<IT & { readonly tenant: string }, Exclude<keyof IT, "tenant">>, T>) {
        super(collectionName);
    }
}
