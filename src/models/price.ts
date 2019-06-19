import {Discount} from "./discount";

export interface IPrice {
    readonly euro: number;
    readonly cents: number;
}

export class Price implements IPrice {
    static readonly zero = new Price({ euro: 0, cents: 0 });

    static total(...prices: ReadonlyArray<Price>): Price {
        return prices.reduce((a, b) => a.add(b), Price.zero);
    }

    readonly cents: number;
    readonly euro: number;

    constructor(obj: IPrice) {
        if (obj.cents < 0 || obj.euro < 0) {
            throw new Error("Tried to create a price with a negative value for cents or euro. Input: " + JSON.stringify(obj));
        }

        this.cents = (obj.cents % 100) || 0;
        const carry = ((obj.cents - (obj.cents % 100)) / 100) || 0;
        this.euro = ((obj.euro || 0) + carry) || 0;
    }

    toString() {
        const c = this.cents <= 9 ? "0" + this.cents.toString() : this.cents.toString();
        return `€${this.euro}.${c}`;
    }

    add(that: IPrice): Price {
        return new Price({ euro: 0, cents: new Price(that).totalCents + this.totalCents });
    }

    /**
     * Subtract `that` from the current price. Does not allow negative prices: returns €0.00 if price were to become negative.
     */
    subtract(that: IPrice): Price {
        if (this.totalCents - new Price(that).totalCents < 0) {
            // Don't create a negative price
            return Price.zero;
        } else {
            return new Price({ euro: 0, cents: this.totalCents - new Price(that).totalCents });
        }
    }

    /**
     * Apply a discount
     *
     * When a discount has both an absolute and a relative component, the relative component is applied first
     * When a discount would make the resulting price negative, a zero price is returned
     */
    applyDiscount(discount: Discount): Price {
        const appliedAbsoluteDiscount = this.subtract(discount.absoluteDiscount || Price.zero);

        const multiplier = 1 - (discount.relativeDiscount || 0) / 100;
        return new Price({ euro: 0, cents: Math.round(appliedAbsoluteDiscount.totalCents * multiplier) });

    }

    /**
     * Apply a list of discounts
     *
     * Discounts are applied left to right.
     */
    applyAllDiscounts(discounts: ReadonlyArray<Discount>): Price {
        return discounts.reduce( ((previousValue: Price, currentValue: Discount) => {
            return previousValue.applyDiscount(currentValue);
        }), this);
    }

    /**
     * Returns the total number of cents, that is, this price expressed as cents. €12.30 => 1230
     */
    get totalCents(): number {
        return this.euro * 100 + this.cents;
    }

}
