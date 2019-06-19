/**
 * A symbol that signifies that the name of the tenant should be used as the document name
 */
export const tenantName = Symbol("tenant-name");

/**
 * An interface that describes how to lift a plain object (usually gotten from JSON) to a rich object of class T
 */
export interface Mapper<IT, T> {
    lift(id: string, obj: IT): T;

    /**
     * Cneate a plain object from a rich object, to be saved into the database
     *
     * @param obj The rich object
     * @return Object with obj being the plain object, and id either a string (the id to be used), undefined (no value) or
     *         the tenantName symbol (the current tenant should be automagically used)
     */
    unlift(obj: T): { readonly obj: IT, readonly id?: string | symbol };
}
