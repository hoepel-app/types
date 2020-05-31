
export interface ILocalTime {
    readonly hour: number;
    readonly minute: number;
}

export class LocalTime implements ILocalTime {
    static fromMinutesSinceMidnight(minutesSinceMidnight: number): LocalTime {
        const clamped = Math.min(Math.max(0, minutesSinceMidnight), 1439);
        const minute = clamped % 60;
        const hour = (clamped - minute) / 60;

        return new LocalTime({
            hour,
            minute,
        });
    }

    readonly hour: number;
    readonly minute: number;

    constructor(obj: ILocalTime) {
        this.hour = obj.hour;
        this.minute = obj.minute;
    }

    compareTo(that: ILocalTime): number {
        return (this.hour * 60 + this.minute) - (that.hour * 60 + that.minute);
    }

    toString() {
        const min = this.minute <= 9 ? "0" + this.minute : this.minute;
        return this.hour.toString() + ":" + min;
    }
}
