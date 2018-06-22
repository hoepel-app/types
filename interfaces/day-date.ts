export interface IDayDate {
    day: number;
    month: number;
    year: number;
}

export class DayDate {
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
}
