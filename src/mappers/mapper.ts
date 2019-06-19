/**
 * An interface that describes how to lift a plain object (usually gotten from JSON) to a rich object of class T
 */
export interface Mapper<IT, T> {
    lift(obj: IT): T;
    unlift(obj: T): IT;
}
