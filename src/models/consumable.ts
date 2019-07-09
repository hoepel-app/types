/**
 * Used to represent something that can be consumed or purchased, which is not an attendance.
 * E.g. drink, cookies, ...
 * Consumption of consumables is tied to a dayid/DayDate (a specific date)
 * The same consumable can be consumed multiple times by the same child on the same day.
 */
import { DayDate } from "./day-date";
import { IPrice, Price } from "./price";

export interface IConsumable {
    /**
     * Name of the consumable, e.g. "Big chocolate cookie"
     */
    readonly name: string;

    /**
     * Price of the consumable. May not be included in fiscal certificates (these costs are non-refundable)!
     */
    readonly price: IPrice;
}

export interface IConsumption {
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

export class Consumable implements IConsumable {
    readonly name: string;
    readonly price: Price;

    constructor(obj: IConsumable) {
        this.name = obj.name;
        this.price = new Price(obj.price);
    }
}

export class Consumption implements IConsumption {
    readonly childId: string;
    readonly consumableName: string;
    readonly dayId: string;
    readonly day: DayDate;
    readonly pricePaid: Price;

    constructor(obj: IConsumption) {
        this.childId = obj.childId;
        this.consumableName = obj.consumableName;
        this.dayId = obj.dayId;
        this.day = DayDate.fromDayId(obj.dayId);
        this.pricePaid = new Price(obj.pricePaid);
    }
}
