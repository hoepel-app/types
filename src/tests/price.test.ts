import { Price } from "../value-objects/price";

describe("Price", () => {
    it("Add cents to euros when >= 100", () => {
        const result = new Price({ cents: 111, euro: 4 });
        expect(result.euro).toEqual(5);
        expect(result.cents).toEqual(11);
    });

    it("Correctly add prices together", () => {
        const one = new Price({ euro: 2, cents: 50 });
        const two = new Price({ euro: 3, cents: 70 });
        const result = Price.zero.add(one).add(two).add({ euro: 1, cents: 20 });

        expect(result.cents).toEqual(40);
        expect(result.euro).toEqual(7);
    });

    it("Should not allow creation of negative prices", () => {
        expect(() => new Price({ euro: 0, cents: -1 })).toThrow();
        expect(() => new Price({ euro: -1, cents: 0 })).toThrow();
        expect(Price.zero.subtract(new Price({ euro: 1, cents: 0 })).totalCents).toEqual(0);
    });

    it("Correctly subtract prices", () => {
        const one = new Price({ euro: 2, cents: 70 });
        const two = new Price({ euro: 3, cents: 50 });
        const result = two.subtract(one).subtract(Price.zero);

        expect(result.cents).toEqual(80);
        expect(result.euro).toEqual(0);
    });

    it("Price#totalCents should return total euro centns", () => {
        expect(new Price({ euro: 12, cents: 30 }).totalCents).toEqual(1230);
    });

    it("Price#toString should format price in euro format", () => {
        expect(new Price({ euro: 12, cents: 30 }).toString()).toEqual("€12.30");
        expect(new Price({ euro: 12, cents: 0 }).toString()).toEqual("€12.00");
        expect(new Price({ euro: 12, cents: 3 }).toString()).toEqual("€12.03");
        expect(new Price({ euro: 0, cents: 0 }).toString()).toEqual("€0.00");
        expect(new Price({ euro: 0, cents: 7 }).toString()).toEqual("€0.07");
    });

    it("Should total prices", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });
        const price3 = new Price({ euro: 0, cents: 0 });

        const total = Price.total(price1, price2, price2, price3);

        expect(total.euro).toEqual(23);
        expect(total.cents).toEqual(14);
    });

    it("Should multiply prices", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });
        const price3 = new Price({ euro: 12, cents: 69 });

        expect(price1.multiply(1).euro).toEqual(10);
        expect(price1.multiply(1).cents).toEqual(0);
        expect(price2.multiply(2).euro).toEqual(13);
        expect(price2.multiply(2).cents).toEqual(14);
        expect(price2.multiply(0).euro).toEqual(0);
        expect(price2.multiply(0).cents).toEqual(0);
        expect(price2.multiply(-5).euro).toEqual(0);
        expect(price2.multiply(-5).cents).toEqual(0);
        expect(price3.multiply(3.5).euro).toEqual(44);
        expect(price3.multiply(3.5).cents).toEqual(42);
    });

    it("Creates price from cents", () => {
        expect(Price.fromCents(1234).cents).toEqual(34);
        expect(Price.fromCents(1234).euro).toEqual(12);
        expect(Price.fromCents(1234).totalCents).toEqual(1234);
    });
});
