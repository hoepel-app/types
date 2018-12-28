import { ILocalTime, LocalTime } from "./local-time";

export interface IStartAndEndTime {
    start: ILocalTime;
    end: ILocalTime;
}

export class StartAndEndTime implements IStartAndEndTime {
    readonly end: LocalTime;
    readonly start: LocalTime;

    constructor(obj: IStartAndEndTime) {
        this.start = new LocalTime(obj.start);
        this.end = new LocalTime(obj.end);
    }

    toString() {
        return `${this.start}-${this.end}`;
    }
}
