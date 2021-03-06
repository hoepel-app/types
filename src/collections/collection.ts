import { Mapper } from "../mappers/mapper";

/**
 * A collection in Firestore storing entities of type T
 */
export class Collection<T extends { readonly [key: string]: any }> {

    /**
     * @param collectionName Name of the collection in Firestore
     * @param eventPrefix Prefix for events. E.g. prefix = 'child', events will be 'child-update', etc.
     * @param docIdIsTenantName Whether the document id's are the tenant name, e.g. doc(collection/example): example is
     *        the name of the tenant
     */
    constructor(
        readonly collectionName: string,
        readonly eventPrefix: string,
        readonly docIdIsTenantName: boolean = false,
    ) {}
}

/**
 * A collection that maps plain objects received from Firestore using a mapper to rich object
 */
export class MappingCollection<IT extends { readonly [field: string]: any; }, T> extends Collection<T> {
    constructor(
        collectionName: string,
        eventPrefix: string,
        readonly mapper: Mapper<IT, T>, docIdIsTenantName: boolean = false,
    ) {
        super(collectionName, eventPrefix, docIdIsTenantName);
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
    constructor(
        collectionName: string,
        eventPrefix: string,
        readonly mapper: Mapper<Omit<IT & { readonly tenant: string }, "tenant">, T>,
        docIdIsTenantName: boolean = false) {
        super(collectionName, eventPrefix, docIdIsTenantName);
    }
}

/**
 * A collection that is indexed by tenant (every document contains a tenant field - e.g. { name: ..., tenant: ..., ... }
 *
 * @tparam T Type of the lifted object. May not contain "tenant" field - will be dropped. Likewise, an "id" field will be
 *         added automatically when getting data, but will be stripped before persisting.
 */
export class TenantIndexedCollection<T extends Omit<{ readonly [field: string]: any; }, "tenant">>
    extends TenantIndexedMappingCollection<T, T & { readonly id: string }> {
    constructor(collectionName: string, eventPrefix: string, docIdIsTenantName: boolean = false) {
        const mapper: Mapper<Omit<T & { readonly tenant: string }, "tenant">, T & { readonly id: string }> = {
            lift(id: string, obj: Omit<T & { readonly tenant: string }, "tenant">): T & { readonly id: string } {
                const { tenant, ...res } = obj;
                return { id, ...res } as any;
            },
            unlift(obj: T): Omit<T & { readonly tenant: string }, "tenant"> {
                const { id, ...res } = obj;
                return res as any;
            },
        };

        super(collectionName, eventPrefix, mapper, docIdIsTenantName);
    }
}
