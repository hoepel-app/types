import { expect } from "chai";
import { DetailedChildAttendancesOnShift, DetailedChildAttendancesOnShifts } from "../src/models/detailed-attendance";
import { Price } from "../src/models/price";

describe("DetailedChildAttendancesOnShift", () => {
    it("didAttend", () => {
        const att = new DetailedChildAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        });

        expect(att.didAttend("id-1")).to.equal(true);
        expect(att.didAttend("id-2")).to.equal(false);
        expect(att.didAttend("id-3")).to.equal(true);
        expect(att.didAttend("id-4")).to.equal(false);
    });

    it("attendingChildren", () => {
        const att = new DetailedChildAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        });

        expect(att.attendingChildren()).to.have.members([ "id-1", "id-3" ]);
    });

    it("amountPaidBy", () => {
        const att = new DetailedChildAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true, amountPaid: { euro: 1, cents: 50 } },
           "id-2": { didAttend: false, amountPaid: { euro: 0, cents: 50 } },
           "id-3": { didAttend: true, amountPaid: { euro: 7, cents: 70 } },
        });

        expect(att.amountPaidBy("id-4").totalCents).to.equal(0);
        expect(att.amountPaidBy("id-1").totalCents).to.equal(150);
        expect(att.amountPaidBy("id-2").totalCents).to.equal(0);
        expect(att.amountPaidBy("id-3").totalCents).to.equal(770);
    });
});

describe("DetailedChildAttendancesOnShifts", () => {
    it("uniqueAttendances", () => {
        const att1 = new DetailedChildAttendancesOnShift("shift-id-1", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        });

        const att2 = new DetailedChildAttendancesOnShift("shift-id-2", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: false, amountPaid: Price.zero },
        });

        const att3 = new DetailedChildAttendancesOnShift("shift-id-3", {
           "id-1": { didAttend: false, amountPaid: Price.zero },
           "id-2": { didAttend: true, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
           "id-4": { didAttend: true, amountPaid: Price.zero },
        });

        const attendances = new DetailedChildAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.uniqueAttendances([ ])).to.equal(0);
        expect(attendances.uniqueAttendances()).to.equal(4);
        expect(attendances.uniqueAttendances([ "shift-id-3" ])).to.equal(3);
        expect(attendances.uniqueAttendances([ "shift-id-1", "shift-id-2" ])).to.equal(2);
        expect(attendances.uniqueAttendances([ "shift-id-3", "shift-id-2" ])).to.equal(4);
    });

    it("didAttend", () => {
        const att1 = new DetailedChildAttendancesOnShift("shift-id-1", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        });

        const att2 = new DetailedChildAttendancesOnShift("shift-id-2", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: false, amountPaid: Price.zero },
        });

        const att3 = new DetailedChildAttendancesOnShift("shift-id-3", {
           "id-1": { didAttend: false, amountPaid: Price.zero },
           "id-2": { didAttend: true, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
           "id-4": { didAttend: true, amountPaid: Price.zero },
        });

        const attendances = new DetailedChildAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.didAttend("id-1", "shift-id-1")).to.equal(true);
        expect(attendances.didAttend("id-2", "shift-id-1")).to.equal(false);
        expect(attendances.didAttend("id-4", "shift-id-1")).to.equal(false);
        expect(attendances.didAttend("id-4", "shift-id-3")).to.equal(true);
        expect(attendances.didAttend("id-unknown", "shift-id-3")).to.equal(false);
        expect(attendances.didAttend("id-1", "shift-id-unknown")).to.equal(false);
    });

    it("amountPaidBy", () => {
        const att1 = new DetailedChildAttendancesOnShift("shift-id-1", {
            "id-1": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-2": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
            "id-3": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        });

        const att2 = new DetailedChildAttendancesOnShift("shift-id-2", {
            "id-1": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-2": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
            "id-3": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
        });

        const att3 = new DetailedChildAttendancesOnShift("shift-id-3", {
            "id-1": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
            "id-2": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-3": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-4": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        });

        const attendances = new DetailedChildAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.amountPaidBy("id-1").totalCents).to.equal(440);
        expect(attendances.amountPaidBy("id-2").totalCents).to.equal(220);
        expect(attendances.amountPaidBy("id-3").totalCents).to.equal(440);
        expect(attendances.amountPaidBy("id-4").totalCents).to.equal(220);
    });
});
