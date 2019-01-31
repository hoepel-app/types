import {IPrice} from "./price";

export interface IDiscount {
    readonly name: string;

    /**
     * The absolute discount to be applied. For example, an absolute discount of €2.30 applied to a total price of
     * €7.30 results in a price of €5.00.
     *
     * The absolute discount is applied after the relative discount is applied.
     *
     * If the resulting price were to become negative. €0.00 is returned.
     */
    readonly absoluteDiscount?: IPrice;

    /**
     * The relative discount to be applied as a percentage (0-100). For example, a relative discount of 20 applied to
     * a total price of €10.00 results in a price of €8.00.
     *
     * The relative discount is applied after the absolute discount is applied.
     *
     * The relative discount must be e [0, 100].
     */
    readonly relativeDiscount?: number;
}

export class Discount implements IDiscount {
    static readonly noopDiscount = new Discount(
        { name: "No-operation discount", relativeDiscount: 0, absoluteDiscount: { cents: 0, euro: 0 } },
    );

    readonly name: string;
    readonly absoluteDiscount?: IPrice;
    readonly relativeDiscount?: number;

    constructor(idiscount: IDiscount) {
        if (idiscount.relativeDiscount && (idiscount.relativeDiscount < 0 || idiscount.relativeDiscount > 100)) {
            throw new Error("relativeDiscount must be a number between 0 and 100");
        }

        this.absoluteDiscount = idiscount.absoluteDiscount;
        this.relativeDiscount = idiscount.relativeDiscount;
        this.name = idiscount.name;
    }
}
