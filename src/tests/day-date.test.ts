import { DayDate } from "../value-objects/day-date";

describe("DayDate", () => {
    it("throws when creating DayDate with NaN", () => {
        expect(() => new DayDate({ day: NaN, month: 2, year: 2020 })).toThrow(Error("Day is NaN"));
    });

    it("throws when creating DayDate from invalid day id", () => {
        expect(() => DayDate.fromDayId("2020-April-01")).toThrow(Error("Month is NaN"));
    });
});
