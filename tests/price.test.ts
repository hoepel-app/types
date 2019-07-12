import { expect } from "chai";
import { Discount } from "../src/models/discount";
import { Price } from "../src/models/price";

describe("Price", () => {
    it("Add cents to euros when >= 100", () => {
        const result = new Price({ cents: 111, euro: 4 });
        expect(result.euro).to.equal(5);
        expect(result.cents).to.equal(11);
    });

    it("Correctly add prices together", () => {
        const one = new Price({ euro: 2, cents: 50 });
        const two = new Price({ euro: 3, cents: 70 });
        const result = Price.zero.add(one).add(two).add({ euro: 1, cents: 20 });

        expect(result.cents).to.equal(40);
        expect(result.euro).to.equal(7);
    });

    it("Should not allow creation of negative prices", () => {
        expect(() => new Price({ euro: 0, cents: -1 })).to.throw();
        expect(() => new Price({ euro: -1, cents: 0 })).to.throw();
        expect(Price.zero.subtract(new Price({ euro: 1, cents: 0 })).totalCents).to.equal(0);
    });

    it("Correctly subtract prices", () => {
        const one = new Price({ euro: 2, cents: 70 });
        const two = new Price({ euro: 3, cents: 50 });
        const result = two.subtract(one).subtract(Price.zero);

        expect(result.cents).to.equal(80);
        expect(result.euro).to.equal(0);
    });

    it("Price#totalCents should return total euro centns", () => {
        expect(new Price({ euro: 12, cents: 30 }).totalCents).to.equal(1230);
    });

    it("Price#toString should format price in euro format", () => {
        expect(new Price({ euro: 12, cents: 30 }).toString()).to.equal("€12.30");
        expect(new Price({ euro: 12, cents: 0 }).toString()).to.equal("€12.00");
        expect(new Price({ euro: 12, cents: 3 }).toString()).to.equal("€12.03");
        expect(new Price({ euro: 0, cents: 0 }).toString()).to.equal("€0.00");
        expect(new Price({ euro: 0, cents: 7 }).toString()).to.equal("€0.07");
    });

    it("Apply absolute discounts", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });

        const discount1 = new Discount({ absoluteDiscount: { euro: 3, cents: 0 }, name: "test" });
        const discount2 = new Discount({ absoluteDiscount: { euro: 2, cents: 99 }, name: "test" });

        expect(price1.applyDiscount(discount1).totalCents).to.equal(700);
        expect(price2.applyDiscount(discount1).totalCents).to.equal(357);
        expect(price2.applyDiscount(discount2).totalCents).to.equal(358);
        expect(price1.applyDiscount(discount2).totalCents).to.equal(701);
        expect(Price.zero.applyDiscount(discount1).totalCents).to.equal(0);
    });

    it("Apply relative discounts", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });

        const discount1 = new Discount({ relativeDiscount: 100, name: "test" });
        const discount2 = new Discount({ relativeDiscount: 20, name: "test" });
        const discount3 = new Discount({ relativeDiscount: 0, name: "test" });
        const discount4 = new Discount({ relativeDiscount: 33, name: "test" });

        expect(price1.applyDiscount(discount1).totalCents).to.equal(0);
        expect(price1.applyDiscount(discount2).totalCents).to.equal(800);
        expect(price1.applyDiscount(discount3).totalCents).to.equal(1000);
        expect(price1.applyDiscount(discount4).totalCents).to.equal(670);
        expect(price2.applyDiscount(discount1).totalCents).to.equal(0);
        expect(price2.applyDiscount(discount2).totalCents).to.equal(526);
        expect(price2.applyDiscount(discount3).totalCents).to.equal(657);
        expect(price2.applyDiscount(discount4).totalCents).to.equal(440);
    });

    it("Apply discounts that have both a relative and absolute component", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });

        const discount1 = new Discount({ relativeDiscount: 20, absoluteDiscount: { euro: 2, cents: 50 }, name: "test" });
        const discount2 = new Discount({ relativeDiscount: 0, absoluteDiscount: { euro: 2, cents: 50 },  name: "test" });
        const discount3 = new Discount({ relativeDiscount: 33, absoluteDiscount: { euro: 3, cents: 22 }, name: "test" });

        expect(price1.applyDiscount(discount1).totalCents).to.equal(600);
        expect(price1.applyDiscount(discount2).totalCents).to.equal(750);
        expect(price1.applyDiscount(discount3).totalCents).to.equal(454);
        expect(price2.applyDiscount(discount1).totalCents).to.equal(326);
        expect(price2.applyDiscount(discount2).totalCents).to.equal(407);
        expect(price2.applyDiscount(discount3).totalCents).to.equal(224);
        expect(new Price({ euro: 3, cents: 50 }).applyDiscount(discount3).totalCents).to.equal(19);
    });

    it("Apply a list of discounts", () => {
        const price1 = new Price({ euro: 10, cents: 0 });

        const discount1 = new Discount({ relativeDiscount: 20, absoluteDiscount: { euro: 2, cents: 50 }, name: "test" });
        const discount2 = new Discount({ relativeDiscount: 0, absoluteDiscount: { euro: 2, cents: 50 },  name: "test" });
        const discount3 = new Discount({ relativeDiscount: 33, absoluteDiscount: { euro: 3, cents: 22 }, name: "test" });

        expect(price1.applyAllDiscounts([ discount1 ]).totalCents).to.equal(600);
        expect(price1.applyAllDiscounts([ discount2, discount1 ]).totalCents).to.equal(400);
        expect(price1.applyAllDiscounts([ discount1, discount2 ]).totalCents).to.equal(350);
        expect(price1.applyAllDiscounts([ discount1, discount2, discount3 ]).totalCents).to.equal(19);
        expect(price1.applyAllDiscounts([ discount1, discount2, discount2 ]).totalCents).to.equal(100);
        expect(price1.applyAllDiscounts([ discount2, discount2, discount2 ]).totalCents).to.equal(250);
    });

    it("Should total prices", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });
        const price3 = new Price({ euro: 0, cents: 0 });

        const total = Price.total(price1, price2, price2, price3);

        expect(total.euro).to.equal(23);
        expect(total.cents).to.equal(14);
    });

    it("Should multiply prices", () => {
        const price1 = new Price({ euro: 10, cents: 0 });
        const price2 = new Price({ euro: 6, cents: 57 });
        const price3 = new Price({ euro: 12, cents: 69 });

        expect(price1.multiply(1).euro).to.equal(10);
        expect(price1.multiply(1).cents).to.equal(0);
        expect(price2.multiply(2).euro).to.equal(13);
        expect(price2.multiply(2).cents).to.equal(14);
        expect(price2.multiply(0).euro).to.equal(0);
        expect(price2.multiply(0).cents).to.equal(0);
        expect(price2.multiply(-5).euro).to.equal(0);
        expect(price2.multiply(-5).cents).to.equal(0);
        expect(price3.multiply(3.5).euro).to.equal(44);
        expect(price3.multiply(3.5).cents).to.equal(42);
    });
});
