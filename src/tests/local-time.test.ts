import { LocalTime } from "../models/local-time";

describe("LocalTime", () => {
    describe("fromMinutesSinceMidnight", () => {
        test("0", () => {
            const time = LocalTime.fromMinutesSinceMidnight(0);

            expect(time.hour).toEqual(0);
            expect(time.minute).toEqual(0);
        });

        test("-2", () => {
            const time = LocalTime.fromMinutesSinceMidnight(-2);

            expect(time.hour).toEqual(0);
            expect(time.minute).toEqual(0);
        });

        test("60", () => {
            const time = LocalTime.fromMinutesSinceMidnight(60);

            expect(time.hour).toEqual(1);
            expect(time.minute).toEqual(0);
        });

        test("188", () => {
            const time = LocalTime.fromMinutesSinceMidnight(188);

            expect(time.hour).toEqual(3);
            expect(time.minute).toEqual(8);
        });

        test("1177", () => {
            const time = LocalTime.fromMinutesSinceMidnight(1177);

            expect(time.hour).toEqual(19);
            expect(time.minute).toEqual(37);
        });

        test("1439", () => {
            const time = LocalTime.fromMinutesSinceMidnight(1439);

            expect(time.hour).toEqual(23);
            expect(time.minute).toEqual(59);
        });

        test("1440", () => {
            const time = LocalTime.fromMinutesSinceMidnight(1440);

            expect(time.hour).toEqual(23);
            expect(time.minute).toEqual(59);
        });

        test("2000", () => {
            const time = LocalTime.fromMinutesSinceMidnight(2000);

            expect(time.hour).toEqual(23);
            expect(time.minute).toEqual(59);
        });
    });
});
