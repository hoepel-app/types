import { DayDate } from "../models/day-date";
import { DayDateRange } from "../models/day-date-range";

describe("DayDateRange", () => {
    test("containsInclusive", () => {
        const range = new DayDateRange({
            from: {
                day: 1,
                month: 6,
                year: 2020,
            },
            to: {
                day: 7,
                month: 6,
                year: 2020,
            },
        });

        expect(range.containsInclusive(new DayDate({
            day: 1,
            month: 6,
            year: 2020,
        }))).toBeTruthy();
        expect(range.containsInclusive(new DayDate({
            day: 2,
            month: 6,
            year: 2020,
        }))).toBeTruthy();
        expect(range.containsInclusive(new DayDate({
            day: 7,
            month: 6,
            year: 2020,
        }))).toBeTruthy();
        expect(range.containsInclusive(new DayDate({
            day: 8,
            month: 6,
            year: 2020,
        }))).toBeFalsy();
        expect(range.containsInclusive(new DayDate({
            day: 31,
            month: 5,
            year: 2020,
        }))).toBeFalsy();
    });
});
