/**
 * A shift: an activity or period of a day
 */
import {DayDate} from "./day-date";
import {LocalTime} from "./local-time";
import {IPrice, Price} from "./price";
import {IStartAndEndTime, StartAndEndTime} from "./start-and-end-time";

/** @deprecated */
export interface IShift {
    readonly id?: string;
    readonly dayId: string;
    readonly price: IPrice;
    readonly childrenCanBePresent: boolean;
    readonly crewCanBePresent: boolean;
    readonly kind: string;
    readonly location?: string;
    readonly description?: string;
    readonly startAndEnd?: IStartAndEndTime;
}

/** @deprecated */
export class Shift implements IShift {
    static sort(shifts: ReadonlyArray<Shift>) {
        return [...shifts].sort( (a, b) => {
            if (DayDate.fromDayId(a.dayId).compareTo(DayDate.fromDayId(b.dayId)) !== 0) {
                return DayDate.fromDayId(a.dayId).compareTo(DayDate.fromDayId(b.dayId));
            }

            if (a.startAndEnd === undefined && b.startAndEnd === undefined) {
                return a.kind.localeCompare(b.kind);
            } else if (a.startAndEnd === undefined) {
                return 1; // corect? shifts with undefined startAndEnd should end up at the end
            } else if (b.startAndEnd === undefined) {
                return -1; // correct?
            }

            return new LocalTime(a.startAndEnd.start).compareTo(b.startAndEnd.start);
        });
    }

    readonly id?: string;
    readonly childrenCanBePresent: boolean;
    readonly crewCanBePresent: boolean;
    readonly description?: string;
    readonly dayId: string;
    readonly kind: string;
    readonly location?: string;
    readonly price: Price;
    readonly startAndEnd?: StartAndEndTime;

    constructor(obj: IShift) {
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
