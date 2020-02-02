import { Discount } from "../models/discount";

describe("Discount", () => {
    it("Relative discount must be e [0, 100]", () => {
        expect(() => new Discount({ name: "test", relativeDiscount: -1 })).toThrow();
        expect(() => new Discount({ name: "test", relativeDiscount: 101 })).toThrow();
        expect(() => new Discount({ name: "test", relativeDiscount: 0 })).not.toThrow();
        expect(() => new Discount({ name: "test", relativeDiscount: 100 })).not.toThrow();
        expect(() => new Discount({ name: "test", relativeDiscount: 50 })).not.toThrow();
    });
});
