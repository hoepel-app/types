import { ILocalTime } from './local-time';

export interface IStartAndEndTime {
    start: ILocalTime;
    end: ILocalTime;
}

export class StartAndEndTime implements IStartAndEndTime {
    public readonly end: ILocalTime;
    public readonly start: ILocalTime;

    constructor (obj: IStartAndEndTime) {
        this.start = obj.start;
        this.end = obj.end;
    }

    toString() {
        return `${this.start}-${this.end}`;
    }
}
