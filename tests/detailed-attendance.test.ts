import { expect } from "chai";
import { DetailedAttendancesOnShift, DetailedAttendancesOnShifts } from "../src/models/detailed-attendance";
import { Price } from "../src/models/price";

describe("DetailedAttendancesOnShift", () => {
    it("didChildAttend", () => {
        const att = new DetailedAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        }, {
            "id-2": { didAttend: false }, // should not influence child attendances
        });

        expect(att.didChildAttend("id-1")).to.equal(true);
        expect(att.didChildAttend("id-2")).to.equal(false);
        expect(att.didChildAttend("id-3")).to.equal(true);
        expect(att.didChildAttend("id-4")).to.equal(false);
    });

    it("attendingChildren", () => {
        const att = new DetailedAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        }, {
            "id-2": { didAttend: true }, // Should not influence child attendances
        });

        expect(att.attendingChildren()).to.have.members([ "id-1", "id-3" ]);
    });

    it("amountPaidByChild", () => {
        const att = new DetailedAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true, amountPaid: { euro: 1, cents: 50 } },
           "id-2": { didAttend: false, amountPaid: { euro: 0, cents: 50 } },
           "id-3": { didAttend: true, amountPaid: { euro: 7, cents: 70 } },
        }, {});

        expect(att.amountPaidByChild("id-4").totalCents).to.equal(0);
        expect(att.amountPaidByChild("id-1").totalCents).to.equal(150);
        expect(att.amountPaidByChild("id-2").totalCents).to.equal(0);
        expect(att.amountPaidByChild("id-3").totalCents).to.equal(770);
    });
});

describe("DetailedAttendancesOnShifts", () => {
    it("uniqueChildAttendances", () => {
        const att1 = new DetailedAttendancesOnShift("shift-id-1", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        }, {
            "id-2": { didAttend: true }, // Should not influence child attendances
        });

        const att2 = new DetailedAttendancesOnShift("shift-id-2", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: false, amountPaid: Price.zero },
        }, {});

        const att3 = new DetailedAttendancesOnShift("shift-id-3", {
           "id-1": { didAttend: false, amountPaid: Price.zero },
           "id-2": { didAttend: true, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
           "id-4": { didAttend: true, amountPaid: Price.zero },
        }, {});

        const attendances = new DetailedAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.uniqueChildAttendances([ ])).to.equal(0);
        expect(attendances.uniqueChildAttendances()).to.equal(4);
        expect(attendances.uniqueChildAttendances([ "shift-id-3" ])).to.equal(3);
        expect(attendances.uniqueChildAttendances([ "shift-id-1", "shift-id-2" ])).to.equal(2);
        expect(attendances.uniqueChildAttendances([ "shift-id-3", "shift-id-2" ])).to.equal(4);
    });

    it("didChildAttend", () => {
        const att1 = new DetailedAttendancesOnShift("shift-id-1", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
        }, {
            "id-2": { didAttend: true }, // Should not influence child attendances
        });

        const att2 = new DetailedAttendancesOnShift("shift-id-2", {
           "id-1": { didAttend: true, amountPaid: Price.zero },
           "id-2": { didAttend: false, amountPaid: Price.zero },
           "id-3": { didAttend: false, amountPaid: Price.zero },
        }, {});

        const att3 = new DetailedAttendancesOnShift("shift-id-3", {
           "id-1": { didAttend: false, amountPaid: Price.zero },
           "id-2": { didAttend: true, amountPaid: Price.zero },
           "id-3": { didAttend: true, amountPaid: Price.zero },
           "id-4": { didAttend: true, amountPaid: Price.zero },
        }, {});

        const attendances = new DetailedAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.didChildAttend("id-1", "shift-id-1")).to.equal(true);
        expect(attendances.didChildAttend("id-2", "shift-id-1")).to.equal(false);
        expect(attendances.didChildAttend("id-4", "shift-id-1")).to.equal(false);
        expect(attendances.didChildAttend("id-4", "shift-id-3")).to.equal(true);
        expect(attendances.didChildAttend("id-unknown", "shift-id-3")).to.equal(false);
        expect(attendances.didChildAttend("id-1", "shift-id-unknown")).to.equal(false);
    });

    it("amountPaidByChild", () => {
        const att1 = new DetailedAttendancesOnShift("shift-id-1", {
            "id-1": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-2": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
            "id-3": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        }, {});

        const att2 = new DetailedAttendancesOnShift("shift-id-2", {
            "id-1": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-2": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
            "id-3": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
        }, {});

        const att3 = new DetailedAttendancesOnShift("shift-id-3", {
            "id-1": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
            "id-2": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-3": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
            "id-4": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        }, {});

        const attendances = new DetailedAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.amountPaidByChild("id-1").totalCents).to.equal(440);
        expect(attendances.amountPaidByChild("id-2").totalCents).to.equal(220);
        expect(attendances.amountPaidByChild("id-3").totalCents).to.equal(440);
        expect(attendances.amountPaidByChild("id-4").totalCents).to.equal(220);
    });

    it("numberOfChildAttendances", () => {
        const att1 = new DetailedAttendancesOnShift("shift-id-1", {
            "id-1": { didAttend: true, amountPaid: Price.zero },
            "id-2": { didAttend: false, amountPaid: Price.zero },
            "id-3": { didAttend: true, amountPaid: Price.zero },
        }, {
            "id-2": { didAttend: true }, // Should not influence child attendances
        });

        const att2 = new DetailedAttendancesOnShift("shift-id-2", {
            "id-1": { didAttend: true, amountPaid: Price.zero },
            "id-2": { didAttend: false, amountPaid: Price.zero },
            "id-3": { didAttend: false, amountPaid: Price.zero },
        }, {});

        const att3 = new DetailedAttendancesOnShift("shift-id-3", {
            "id-1": { didAttend: false, amountPaid: Price.zero },
            "id-2": { didAttend: true, amountPaid: Price.zero },
            "id-3": { didAttend: true, amountPaid: Price.zero },
            "id-4": { didAttend: true, amountPaid: Price.zero },
        }, {});

        const attendances = new DetailedAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.numberOfChildAttendances("id-1")).to.equal(2);
        expect(attendances.numberOfChildAttendances("id-2")).to.equal(1);
        expect(attendances.numberOfChildAttendances("id-3")).to.equal(2);
        expect(attendances.numberOfChildAttendances("id-4")).to.equal(1);
        expect(attendances.numberOfChildAttendances("id-5")).to.equal(0);
    });
});
