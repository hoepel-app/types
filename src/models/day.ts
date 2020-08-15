import { DayDate, IDayDate } from "../value-objects/day-date";
import { IShift, Shift } from "./shift";

/**
 * A day, possibly containing shifts on that day
 */
export interface IDay {
    readonly date: IDayDate;
    readonly shifts: ReadonlyArray<IShift>;
    readonly id?: string;
}

export class Day implements IDay {
    static sorted(list: ReadonlyArray<Day>): ReadonlyArray<Day> {
        return [ ...list ].sort((a: Day, b: Day) => a.date.compareTo(b.date));
    }

    readonly date: DayDate;
    readonly shifts: ReadonlyArray<Shift>;
    readonly id?: string;

    constructor(day: IDay) {
        this.date = new DayDate(day.date);
        this.shifts = day.shifts.map(ishift => new Shift(ishift));
        this.id = day.id;
    }

    withShifts(shifts: ReadonlyArray<Shift>) {
        return new Day({ id: this.id, date: this.date, shifts });
    }

    toString() {
        return this.date.toString();
    }
}
