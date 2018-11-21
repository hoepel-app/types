/**
 * A shift: an activity or period of a day
 */
import { IPrice, Price } from './price';
import { IStartAndEndTime, StartAndEndTime } from './start-and-end-time';
import { isUndefined } from 'lodash';
import { LocalTime } from './local-time';
import { DayDate } from './day-date';

export interface IShift {
    id?: string;
    dayId: string;
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
            if (DayDate.fromDayId(a.dayId).compareTo(DayDate.fromDayId(b.dayId)) !== 0) {
                return DayDate.fromDayId(a.dayId).compareTo(DayDate.fromDayId(b.dayId));
            }

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


    public readonly id?: string;
    public readonly childrenCanBePresent: boolean;
    public readonly crewCanBePresent: boolean;
    public readonly description?: string;
    public readonly dayId: string;
    public readonly kind: string;
    public readonly location?: string;
    public readonly price: Price;
    public readonly startAndEnd?: StartAndEndTime;

    constructor (obj: IShift) {
        this.id = obj.id;
        this.childrenCanBePresent = obj.childrenCanBePresent;
        this.crewCanBePresent = obj.crewCanBePresent;
        this.description = obj.description;
        this.dayId = obj.dayId;
        this.kind = obj.kind;
        this.location = obj.location;
        this.price = new Price(obj.price);
        this.startAndEnd = obj.startAndEnd ? new StartAndEndTime(obj.startAndEnd) : undefined;
    }
}
