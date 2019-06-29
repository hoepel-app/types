import { expect } from "chai";
import { Address } from "../src/models/address";

describe("Address#formatted", () => {
    it("should return formatted full address", () => {
        const address = new Address({ street: "Straat", number: "122A bus 2", zipCode: 4558, city: "Stad" });
        expect(address.formatted()).to.equal("Straat 122A bus 2, 4558 Stad");
    });
    it("should return formatted address with only street", () => {
        const address = new Address({ street: "Straat" });
        expect(address.formatted()).to.equal("Straat");
    });
    it("should return formatted address with only street and number", () => {
        const address = new Address({ street: "Straat", number: "122A bus 2"});
        expect(address.formatted()).to.equal("Straat 122A bus 2");
    });
    it("should return formatted address with only zip code", () => {
        const address = new Address({ zipCode: 4558 });
        expect(address.formatted()).to.equal("4558");
    });
    it("should return formatted address with only city", () => {
        const address = new Address({ city: "Stad" });
        expect(address.formatted()).to.equal("Stad");
    });
    it("should return formatted address with only zip code and city", () => {
        const address = new Address({ zipCode: 4558, city: "Stad" });
        expect(address.formatted()).to.equal("4558 Stad");
    });
    it("should return formatted address with only street, number and city", () => {
        const address = new Address({ street: "Straat", number: "122A bus 2", city: "Stad" });
        expect(address.formatted()).to.equal("Straat 122A bus 2, Stad");
    });
});
