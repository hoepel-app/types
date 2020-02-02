import { DetailedAttendancesOnShift, DetailedAttendancesOnShifts } from "../models/detailed-attendance";

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
        expect(att.didChildAttend("id-1")).toEqual(true);
        expect(att.didChildAttend("id-2")).toEqual(false);
        expect(att.didChildAttend("id-3")).toEqual(true);
        expect(att.didChildAttend("id-4")).toEqual(false);
    });

    it("didCrewMemberAttend", () => {
        expect(att.didCrewMemberAttend("id-2")).toEqual(true);
        expect(att.didCrewMemberAttend("id-10")).toEqual(true);
        expect(att.didCrewMemberAttend("id-11")).toEqual(false);
        expect(att.didCrewMemberAttend("id-12")).toEqual(false);
    });

    it("attendingChildren", () => {
        expect(att.attendingChildren()).toEqual([ "id-1", "id-3" ]);
    });

    it("attendingCrewMembers", () => {
        expect(att.attendingCrewMembers()).toEqual([ "id-2", "id-10" ]);
    });

    it("amountPaidByChild", () => {
        expect(att.amountPaidByChild("id-4").totalCents).toEqual(0);
        expect(att.amountPaidByChild("id-1").totalCents).toEqual(150);
        expect(att.amountPaidByChild("id-2").totalCents).toEqual(0);
        expect(att.amountPaidByChild("id-3").totalCents).toEqual(770);
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
        expect(attendances.uniqueChildAttendances([ ])).toEqual(0);
        expect(attendances.uniqueChildAttendances()).toEqual(4);
        expect(attendances.uniqueChildAttendances([ "shift-id-3" ])).toEqual(3);
        expect(attendances.uniqueChildAttendances([ "shift-id-1", "shift-id-2" ])).toEqual(2);
        expect(attendances.uniqueChildAttendances([ "shift-id-3", "shift-id-2" ])).toEqual(4);
    });

    it("uniqueCrewMemberAttendances", () => {
        expect(attendances.uniqueCrewMemberAttendances([ ])).toEqual(0);
        expect(attendances.uniqueCrewMemberAttendances()).toEqual(4);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-3" ])).toEqual(4);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-2" ])).toEqual(1);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-1", "shift-id-2" ])).toEqual(2);
        expect(attendances.uniqueCrewMemberAttendances([ "shift-id-3", "shift-id-2" ])).toEqual(4);
    });

    it("didCrewMemberAttend", () => {
        expect(attendances.didCrewMemberAttend("id-1", "shift-id-1")).toEqual(false);
        expect(attendances.didCrewMemberAttend("id-2", "shift-id-1")).toEqual(true);
        expect(attendances.didCrewMemberAttend("id-11", "shift-id-1")).toEqual(false);
        expect(attendances.didCrewMemberAttend("id-12", "shift-id-1")).toEqual(false);
        expect(attendances.didCrewMemberAttend("id-12", "shift-id-3")).toEqual(true);
        expect(attendances.didCrewMemberAttend("id-unknown", "shift-id-3")).toEqual(false);
        expect(attendances.didCrewMemberAttend("id-1", "shift-id-unknown")).toEqual(false);
    });

    it("didChildAttend", () => {
        expect(attendances.didChildAttend("id-1", "shift-id-1")).toEqual(true);
        expect(attendances.didChildAttend("id-2", "shift-id-1")).toEqual(false);
        expect(attendances.didChildAttend("id-4", "shift-id-1")).toEqual(false);
        expect(attendances.didChildAttend("id-4", "shift-id-3")).toEqual(true);
        expect(attendances.didChildAttend("id-unknown", "shift-id-3")).toEqual(false);
        expect(attendances.didChildAttend("id-1", "shift-id-unknown")).toEqual(false);
    });

    it("amountPaidByChild", () => {
        expect(attendances.amountPaidByChild("id-1").totalCents).toEqual(440);
        expect(attendances.amountPaidByChild("id-2").totalCents).toEqual(220);
        expect(attendances.amountPaidByChild("id-3").totalCents).toEqual(440);
        expect(attendances.amountPaidByChild("id-4").totalCents).toEqual(220);
    });

    it("numberOfChildAttendances", () => {
        expect(attendances.numberOfChildAttendances("id-1")).toEqual(2);
        expect(attendances.numberOfChildAttendances("id-2")).toEqual(1);
        expect(attendances.numberOfChildAttendances("id-3")).toEqual(2);
        expect(attendances.numberOfChildAttendances("id-4")).toEqual(1);
        expect(attendances.numberOfChildAttendances("id-5")).toEqual(0);
    });

    it("numberOfCrewMemberAttendances", () => {
        expect(attendances.numberOfCrewMemberAttendances("id-2")).toEqual(2);
        expect(attendances.numberOfCrewMemberAttendances("id-10")).toEqual(3);
        expect(attendances.numberOfCrewMemberAttendances("id-11")).toEqual(1);
        expect(attendances.numberOfCrewMemberAttendances("id-12")).toEqual(1);
        expect(attendances.numberOfCrewMemberAttendances("id-55")).toEqual(0);
    });
});
