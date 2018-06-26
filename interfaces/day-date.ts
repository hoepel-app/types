export interface IDayDate {
    day: number;
    month: number;
    year: number;
}

export class DayDate implements IDayDate {

    static fromNative(date: Date): DayDate {
        return new DayDate({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() });
    }

    static fromDayId(dayId: string): DayDate {
        const split = dayId.split('-');
        return new DayDate({ day: Number(split[2]), month: Number(split[1]), year: Number(split[0]) });
    }

    static fromISO8601(iso8601: string): DayDate {
        return this.fromDayId(iso8601);
    }

    public readonly day: number;
    public readonly month: number;
    public readonly year: number;

    constructor(daydate: IDayDate) {
        this.day = daydate.day;
        this.month = daydate.month;
        this.year = daydate.month;
    }

    get id(): string {
        return this.toISO8601();
    }

    public toISO8601(): string {
        return '' + this.year + '-' + (this.month < 10 ? '0' + this.month : this.month) + '-' + (this.day < 10 ? '0' + this.day : this.day);
    }

    public get nativeDate() {
        return new Date(this.year, this.month - 1, this.day);
    }

    public equals(other: DayDate): boolean {
        if (!other) {
            return false;
        }

        return this.day === other.day && this.month === other.month && this.year === other.year;
    }

    public compareTo(other: DayDate) {
        return this.day + this.month * 100 + this.year * 10000 - (other.day + other.month * 100 + other.year * 10000);
    }

    public isBefore(other: DayDate) {
        return this.compareTo(other) < 0;
    }

    public isAfter(other: DayDate) {
        return this.compareTo(other) > 0;
    }

    public isAfterOrEqual(other: DayDate) {
        return this.compareTo(other) >= 0;
    }

    public isBeforeOrEqual(other: DayDate) {
        return this.compareTo(other) <= 0;
    }
}
