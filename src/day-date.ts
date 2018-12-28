import { LocalTime } from "./local-time";

export interface IDayDate {
    /*
    * @TJS-type integer
    */
    day: number;

    /*
    * @TJS-type integer
    */
    month: number;

    /*
    * @TJS-type integer
    */
    year: number;
}

export class DayDate implements IDayDate {

    static fromNative(date: Date): DayDate {
        return new DayDate({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() });
    }

    static fromDayId(dayId: string): DayDate {
        const split = dayId.split("-");
        return new DayDate({ day: Number(split[2]), month: Number(split[1]), year: Number(split[0]) });
    }

    static fromISO8601(iso8601: string): DayDate {
        return this.fromDayId(iso8601);
    }

    static today(): DayDate {
        return DayDate.fromNative(new Date());
    }

    static compare(a: DayDate, b: DayDate) {
        return a.compareTo(b);
    }

    readonly day: number;
    readonly month: number;
    readonly year: number;

    constructor(daydate: IDayDate) {
        this.day = daydate.day;
        this.month = daydate.month;
        this.year = daydate.year;
    }

    get id(): string {
        return this.toISO8601();
    }

    toISO8601(): string {
        return "" + this.year + "-" + (this.month < 10 ? "0" + this.month : this.month) + "-" + (this.day < 10 ? "0" + this.day : this.day);
    }

    get nativeDate() {
        return new Date(this.year, this.month - 1, this.day);
    }

    nativeDayWithOffset(localTime: LocalTime) {
        return new Date(this.year, this.month - 1, this.day, localTime.hour, localTime.minute);
    }

    equals(other: DayDate): boolean {
        if (!other) {
            return false;
        }

        return this.day === other.day && this.month === other.month && this.year === other.year;
    }

    compareTo(other: DayDate) {
        return this.day + this.month * 100 + this.year * 10000 - (other.day + other.month * 100 + other.year * 10000);
    }

    isBefore(other: DayDate) {
        return this.compareTo(other) < 0;
    }

    isAfter(other: DayDate) {
        return this.compareTo(other) > 0;
    }

    isAfterOrEqual(other: DayDate) {
        return this.compareTo(other) >= 0;
    }

    isBeforeOrEqual(other: DayDate) {
        return this.compareTo(other) <= 0;
    }

    toString(): string {
        return `${this.day}/${this.month}/${this.year}`;
    }

    isToday(): boolean {
        const now = new Date();
        return this.day === now.getDate() && this.month === now.getMonth() + 1 && this.year === now.getFullYear();
    }

    toDayId(): string {
        return this.toISO8601();
    }
}
