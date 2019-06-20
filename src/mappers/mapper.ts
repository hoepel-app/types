/**
 * An interface that describes how to lift a plain object (usually gotten from JSON) to a rich object of class T
 */
export interface Mapper<IT extends { readonly [field: string]: any }, T> {
    lift(id: string, obj: IT): T;

    /**
     * Cneate a plain object from a rich object, to be saved into the database
     *
     * @param obj The rich object
     * @return The plain object, ready for saving in the database. The mapper is repsonsible for stripping of the id when
     *         the rich object has an id and it may not be persisted in the object
     */
    unlift(obj: T): IT;
}
