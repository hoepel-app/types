import { IShift } from './shift';

/**
 * A day, possibly containing shifts on that day
 */
export interface IDay {
    date: string;
    shifts: IShift[];
}

export class Day {
    public readonly date: string;
    public readonly shifts: ReadonlyArray<IShift>;

    constructor(day: IDay) {
        this.date = day.date;
        this.shifts = day.shifts;
    }
}
