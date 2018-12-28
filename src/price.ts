export interface IPrice {
    /**
     * @TJS-type integer
     */

    euro: number;
    /**
     * @TJS-type integer
     */
    cents: number;
}

export class Price implements IPrice {
    readonly cents: number;
    readonly euro: number;

    constructor(obj: IPrice) {
        this.cents = obj.cents;
        this.euro = obj.euro;
    }

    toString() {
        const c = this.cents <= 9 ? "0" + this.cents.toString() : this.cents.toString();
        return `€${this.euro}.${c}`;
    }

    add(that: IPrice): Price {
        const resCents = this.cents + that.cents;
        const carry = (resCents - (resCents % 100)) / 100;
        const resEuro = this.euro + that.euro + carry;
        return new Price({ euro: resEuro, cents: resCents % 100 });
    }
}
