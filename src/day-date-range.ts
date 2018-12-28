import { DayDate, IDayDate } from "./day-date";

export interface IDayDateRange {
    readonly from: IDayDate;
    readonly to: IDayDate;
}

export class DayDateRange implements IDayDateRange {
    readonly from: DayDate;
    readonly to: DayDate;

    constructor(range: IDayDateRange) {
        if (new DayDate(range.from).isAfter(new DayDate(range.to))) {
            throw new Error("Cannot create a DayDateRange where from is after to");
        }

        this.from = new DayDate(range.from);
        this.to = new DayDate(range.to);
    }

    contains(day: DayDate) {
        return day.isAfter(this.from) && day.isBefore(this.to);
    }

    isAfter(day: DayDate) {
        return day.isAfter(this.to);
    }

    isBefore(day: DayDate) {
        return day.isBefore(this.from);
    }

    includes(other: DayDateRange | DayDate) {
        if (other instanceof DayDate) {
            return other.isAfterOrEqual(this.from) && other.isBeforeOrEqual(this.to);
        } else if (other instanceof DayDateRange) {
            return this.from.isBeforeOrEqual(other.from) && this.to.isAfterOrEqual(other.to);
        }
    }
}
