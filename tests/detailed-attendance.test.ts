import { expect } from "chai";
import { DetailedAttendancesOnShift, DetailedAttendancesOnShifts } from "../src/models/detailed-attendance";
import { Price } from "../src/models/price";

describe("DetailedAttendancesOnShift", () => {
    const att = new DetailedAttendancesOnShift("shift-id", {
        "id-1": { didAttend: true, amountPaid: { euro: 1, cents: 50 } },
        "id-2": { didAttend: false, amountPaid: { euro: 0, cents: 50 } },
        "id-3": { didAttend: true, amountPaid: { euro: 7, cents: 70 } },
    }, {
        "id-2": { didAttend: true },
        "id-10": { didAttend: true },
        "id-11": { didAttend: false },
    });

    it("didChildAttend", () => {
        expect(att.didChildAttend("id-1")).to.equal(true);
        expect(att.didChildAttend("id-2")).to.equal(false);
        expect(att.didChildAttend("id-3")).to.equal(true);
        expect(att.didChildAttend("id-4")).to.equal(false);
    });

    it("didCrewMemberAttend", () => {
        expect(att.didCrewMemberAttend("id-2")).to.equal(true);
        expect(att.didCrewMemberAttend("id-10")).to.equal(true);
        expect(att.didCrewMemberAttend("id-11")).to.equal(false);
        expect(att.didCrewMemberAttend("id-12")).to.equal(false);
    });

    it("attendingChildren", () => {
        expect(att.attendingChildren()).to.have.members([ "id-1", "id-3" ]);
    });

    it("attendingCrewMembers", () => {
        expect(att.attendingCrewMembers()).to.have.members([ "id-2", "id-10" ]);
    });

    it("amountPaidByChild", () => {
        expect(att.amountPaidByChild("id-4").totalCents).to.equal(0);
        expect(att.amountPaidByChild("id-1").totalCents).to.equal(150);
        expect(att.amountPaidByChild("id-2").totalCents).to.equal(0);
        expect(att.amountPaidByChild("id-3").totalCents).to.equal(770);
    });
});

describe("DetailedAttendancesOnShifts", () => {
    const att1 = new DetailedAttendancesOnShift("shift-id-1", {
        "id-1": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        "id-2": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
        "id-3": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
    }, {
        "id-2": { didAttend: true },
        "id-10": { didAttend: true },
        "id-11": { didAttend: false },
    });

    const att2 = new DetailedAttendancesOnShift("shift-id-2", {
        "id-1": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        "id-2": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
        "id-3": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
    }, {
        "id-2": { didAttend: false },
        "id-10": { didAttend: true },
        "id-11": { didAttend: false },
    });

    const att3 = new DetailedAttendancesOnShift("shift-id-3", {
        "id-1": { didAttend: false, amountPaid: { euro: 2, cents: 20 } },
        "id-2": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        "id-3": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
        "id-4": { didAttend: true, amountPaid: { euro: 2, cents: 20 } },
    }, {
        "id-2": { didAttend: true },
        "id-10": { didAttend: true },
        "id-11": { didAttend: true },
        "id-12": { didAttend: true },
    });

    const attendances = new DetailedAttendancesOnShifts([ att1, att2, att3 ]);

    it("uniqueChildAttendances", () => {
        expect(attendances.uniqueChildAttendances([ ])).to.equal(0);
        expect(attendances.uniqueChildAttendances()).to.equal(4);
        expect(attendances.uniqueChildAttendances([ "shift-id-3" ])).to.equal(3);
        expect(attendances.uniqueChildAttendances([ "shift-id-1", "shift-id-2" ])).to.equal(2);
        expect(attendances.uniqueChildAttendances([ "shift-id-3", "shift-id-2" ])).to.equal(4);
    });

    it("uniqueCrewMemberAttendances", () => {
        expect(attendances.uniqueCrewMemberAttendances([ ])).to.equal(0);
        expect(attendances.uniqueCrewMemberAttendances()).to.equal(4);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-3" ])).to.equal(4);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-2" ])).to.equal(1);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-1", "shift-id-2" ])).to.equal(2);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-3", "shift-id-2" ])).to.equal(4);
    });

    it("didCrewMemberAttend", () => {
        expect(attendances.didCrewMemberAttend("id-1", "shift-id-1")).to.equal(false);
        expect(attendances.didCrewMemberAttend("id-2", "shift-id-1")).to.equal(true);
        expect(attendances.didCrewMemberAttend("id-11", "shift-id-1")).to.equal(false);
        expect(attendances.didCrewMemberAttend("id-12", "shift-id-1")).to.equal(false);
        expect(attendances.didCrewMemberAttend("id-12", "shift-id-3")).to.equal(true);
        expect(attendances.didCrewMemberAttend("id-unknown", "shift-id-3")).to.equal(false);
        expect(attendances.didCrewMemberAttend("id-1", "shift-id-unknown")).to.equal(false);
    });

    it("didChildAttend", () => {
        expect(attendances.didChildAttend("id-1", "shift-id-1")).to.equal(true);
        expect(attendances.didChildAttend("id-2", "shift-id-1")).to.equal(false);
        expect(attendances.didChildAttend("id-4", "shift-id-1")).to.equal(false);
        expect(attendances.didChildAttend("id-4", "shift-id-3")).to.equal(true);
        expect(attendances.didChildAttend("id-unknown", "shift-id-3")).to.equal(false);
        expect(attendances.didChildAttend("id-1", "shift-id-unknown")).to.equal(false);
    });

    it("amountPaidByChild", () => {
        expect(attendances.amountPaidByChild("id-1").totalCents).to.equal(440);
        expect(attendances.amountPaidByChild("id-2").totalCents).to.equal(220);
        expect(attendances.amountPaidByChild("id-3").totalCents).to.equal(440);
        expect(attendances.amountPaidByChild("id-4").totalCents).to.equal(220);
    });

    it("numberOfChildAttendances", () => {
        expect(attendances.numberOfChildAttendances("id-1")).to.equal(2);
        expect(attendances.numberOfChildAttendances("id-2")).to.equal(1);
        expect(attendances.numberOfChildAttendances("id-3")).to.equal(2);
        expect(attendances.numberOfChildAttendances("id-4")).to.equal(1);
        expect(attendances.numberOfChildAttendances("id-5")).to.equal(0);
    });

    it("numberOfCrewMemberAttendances", () => {
        expect(attendances.numberOfCrewMemberAttendances("id-2")).to.equal(2);
        expect(attendances.numberOfCrewMemberAttendances("id-10")).to.equal(3);
        expect(attendances.numberOfCrewMemberAttendances("id-11")).to.equal(1);
        expect(attendances.numberOfCrewMemberAttendances("id-12")).to.equal(1);
        expect(attendances.numberOfCrewMemberAttendances("id-55")).to.equal(0);
    });
});
