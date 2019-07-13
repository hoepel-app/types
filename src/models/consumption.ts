import { DayDate } from "./day-date";
import { IPrice, Price } from "./price";

export interface IConsumption {
    readonly id?: string;

    readonly childId: string;
    readonly dayId: string; // Parseable by DayDate.fromDayId

    /**
     * Name of the consumable
     */
    readonly consumableName: string;

    /**
     * The price that was effectively paid by the child/parents
     */
    readonly pricePaid: IPrice;
}

export class Consumption implements IConsumption {
    readonly id?: string;

    readonly childId: string;
    readonly consumableName: string;
    readonly dayId: string;
    readonly day: DayDate;
    readonly pricePaid: Price;

    constructor(obj: IConsumption) {
        this.id = obj.id;
        this.childId = obj.childId;
        this.consumableName = obj.consumableName;
        this.dayId = obj.dayId;
        this.day = DayDate.fromDayId(obj.dayId);
        this.pricePaid = new Price(obj.pricePaid);
    }
}
