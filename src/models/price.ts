export interface IPrice {
    readonly euro: number;
    readonly cents: number;
}

export class Price implements IPrice {
    static readonly zero = new Price({ euro: 0, cents: 0 });

    static total(...prices: ReadonlyArray<Price>): Price {
        return prices.reduce((a, b) => a.add(b), Price.zero);
    }

    static fromCents(cents: number): Price {
        return new Price({ euro: 0, cents });
    }

    readonly cents: number;
    readonly euro: number;

    constructor(obj: IPrice) {
        if (obj.cents < 0 || obj.euro < 0) {
            throw new Error("Tried to create a price with a negative value for cents or euro. Input: " + JSON.stringify(obj));
        }

        this.cents = Math.round((obj.cents % 100) || 0);
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
     * Multiply the current price by a factor. Does not allow negative prices: returns €0.00 if price were to become negative.
     */
    multiply(factor: number) {
        const resultCents = this.totalCents * factor;

        if (resultCents < 0) {
            return Price.zero;
        } else {
            return new Price({ euro: 0, cents: resultCents });
        }

    }

    /**
     * Returns the total number of cents, that is, this price expressed as cents. €12.30 => 1230
     */
    get totalCents(): number {
        return this.euro * 100 + this.cents;
    }

}
