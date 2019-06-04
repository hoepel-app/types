import { expect } from "chai";
import { Discount } from "../src/discount";

describe("Discount", () => {
    it("Relative discount must be e [0, 100]", () => {
        expect(() => new Discount({ name: "test", relativeDiscount: -1 })).to.throw();
        expect(() => new Discount({ name: "test", relativeDiscount: 101 })).to.throw();
        expect(() => new Discount({ name: "test", relativeDiscount: 0 })).not.to.throw();
        expect(() => new Discount({ name: "test", relativeDiscount: 100 })).not.to.throw();
        expect(() => new Discount({ name: "test", relativeDiscount: 50 })).not.to.throw();
    });
});
