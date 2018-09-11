import { DayDate, IDayDate } from './day-date';

export interface IDayDateRange {
    from: IDayDate;
    to: IDayDate;
}

export class DayDateRange implements IDayDateRange {
    public readonly from: DayDate;
    public readonly to: DayDate;


    constructor(range: IDayDateRange) {
        if (new DayDate(range.from).isAfter(new DayDate(range.to))) {
            throw new Error('Cannot create a DayDateRange where from is after to');
        }

        this.from = new DayDate(range.from);
        this.to = new DayDate(range.to);
    }

    public contains(day: DayDate) {
        return day.isAfter(this.from) && day.isBefore(this.to);
    }

    public isAfter(day: DayDate) {
        return day.isAfter(this.to);
    }

    public isBefore(day: DayDate) {
        return day.isBefore(this.from);
    }

    public includes(other: DayDateRange | DayDate) {
        if (other instanceof DayDate) {
            return other.isAfterOrEqual(this.from) && other.isBeforeOrEqual(this.to);
        } else if (other instanceof DayDateRange) {
            return this.from.isBeforeOrEqual(other.from) && this.to.isAfterOrEqual(other.to);
        }
    }
}