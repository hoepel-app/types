/**
 * A shift: an activity or period of a day
 */
import { IPrice } from './price';
import { IStartAndEndTime } from './start-and-end-time';
import { isUndefined } from 'lodash';
import { LocalTime } from './local-time';

export interface IShift {
    id: string;
    price: IPrice;
    childrenCanBePresent: boolean;
    crewCanBePresent: boolean;
    kind: string;
    location?: string;
    description?: string;
    startAndEnd?: IStartAndEndTime;
}

export class Shift implements IShift {
    static sort(shifts: ReadonlyArray<Shift>) {
        const mutableShifts = [ ...shifts ];

        return mutableShifts.sort( (a, b) => {
            if (isUndefined(a.startAndEnd) && isUndefined(b.startAndEnd)) {
                return a.kind.localeCompare(b.kind);
            } else if (isUndefined(a.startAndEnd)) {
                return 1; // corect? shifts with undefined startAndEnd should end up at the end
            } else if (isUndefined(b.startAndEnd)) {
                return -1; // correct?
            }

            return new LocalTime(a.startAndEnd.start).compareTo(b.startAndEnd.start);
        });
    }


    public readonly childrenCanBePresent: boolean;
    public readonly crewCanBePresent: boolean;
    public readonly description?: string;
    public readonly id: string;
    public readonly kind: string;
    public readonly location?: string;
    public readonly price: IPrice; // TODO this'd better be Price instead of IPrice - if only for the toString() method
    public readonly startAndEnd?: IStartAndEndTime;

    constructor (obj: IShift) {
        this.childrenCanBePresent = obj.childrenCanBePresent;
        this.crewCanBePresent = obj.crewCanBePresent;
        this.description = obj.description;
        this.id = obj.id;
        this.kind = obj.kind;
        this.location = obj.location;
        this.price = obj.price;
        this.startAndEnd = obj.startAndEnd;
    }
}
