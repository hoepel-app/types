import { expect } from "chai";
import { DetailedChildAttendancesOnShift, DetailedChildAttendancesOnShifts } from "../src/models/detailed-attendance";

describe("DetailedChildAttendancesOnShift", () => {
    it("didAttend", () => {
        const att = new DetailedChildAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true },
           "id-2": { didAttend: false },
           "id-3": { didAttend: true },
        });

        expect(att.didAttend("id-1")).to.equal(true);
        expect(att.didAttend("id-2")).to.equal(false);
        expect(att.didAttend("id-3")).to.equal(true);
        expect(att.didAttend("id-4")).to.equal(false);
    });

    it("attendingChildren", () => {
        const att = new DetailedChildAttendancesOnShift("shift-id", {
           "id-1": { didAttend: true },
           "id-2": { didAttend: false },
           "id-3": { didAttend: true },
        });

        expect(att.attendingChildren()).to.have.members([ "id-1", "id-3" ]);
    });
});

describe("DetailedChildAttendancesOnShifts", () => {
    it("uniqueAttendances", () => {
        const att1 = new DetailedChildAttendancesOnShift("shift-id-1", {
           "id-1": { didAttend: true },
           "id-2": { didAttend: false },
           "id-3": { didAttend: true },
        });

        const att2 = new DetailedChildAttendancesOnShift("shift-id-2", {
           "id-1": { didAttend: true },
           "id-2": { didAttend: false },
           "id-3": { didAttend: false },
        });

        const att3 = new DetailedChildAttendancesOnShift("shift-id-3", {
           "id-1": { didAttend: false },
           "id-2": { didAttend: true },
           "id-3": { didAttend: true },
           "id-4": { didAttend: true },
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
           "id-1": { didAttend: true },
           "id-2": { didAttend: false },
           "id-3": { didAttend: true },
        });

        const att2 = new DetailedChildAttendancesOnShift("shift-id-2", {
           "id-1": { didAttend: true },
           "id-2": { didAttend: false },
           "id-3": { didAttend: false },
        });

        const att3 = new DetailedChildAttendancesOnShift("shift-id-3", {
           "id-1": { didAttend: false },
           "id-2": { didAttend: true },
           "id-3": { didAttend: true },
           "id-4": { didAttend: true },
        });

        const attendances = new DetailedChildAttendancesOnShifts([ att1, att2, att3 ]);

        expect(attendances.didAttend("id-1", "shift-id-1")).to.equal(true);
        expect(attendances.didAttend("id-2", "shift-id-1")).to.equal(false);
        expect(attendances.didAttend("id-4", "shift-id-1")).to.equal(false);
        expect(attendances.didAttend("id-4", "shift-id-3")).to.equal(true);
        expect(attendances.didAttend("id-unknown", "shift-id-3")).to.equal(false);
        expect(attendances.didAttend("id-1", "shift-id-unknown")).to.equal(false);
    });
});
