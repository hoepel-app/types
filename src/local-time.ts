
export interface ILocalTime {
    /**
     * @TJS-type integer
     */
    hour: number;

    /**
     * @TJS-type integer
     */
    minute: number;
}

export class LocalTime implements ILocalTime{
    public readonly hour: number;
    public readonly minute: number;

    constructor(obj: ILocalTime) {
        this.hour = obj.hour;
        this.minute = obj.minute;
    }

    compareTo(that: ILocalTime): number {
        return (this.hour * 60 + this.minute) - (that.hour * 60 + that.minute);
    }

    toString() {
        const min = this.minute <= 9 ? '0' + this.minute : this.minute;
        return this.hour.toString() + ':' + min;
    }
}
