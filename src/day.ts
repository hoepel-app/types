import { IShift } from './shift';
import { DayDate, IDayDate } from './day-date';

/**
 * A day, possibly containing shifts on that day
 */
export interface IDay {
    date: IDayDate;
    shifts: ReadonlyArray<IShift>;
    id?: string;
}

export class Day {
    static sorted(list: ReadonlyArray<Day>): ReadonlyArray<Day> {
        return [ ...list ].sort((a: Day, b: Day) => a.date.compareTo(b.date));
    }

    public readonly date: DayDate;
    public readonly shifts: ReadonlyArray<IShift>;
    public readonly id?: string;

    constructor(day: IDay) {
        this.date = new DayDate(day.date);
        this.shifts = day.shifts;
        this.id = day.id;
    }

    withShifts(shifts: ReadonlyArray<IShift>) {
        return new Day({ id: this.id, date: this.date, shifts: shifts });
    }
}
