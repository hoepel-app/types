import { IPrice, Price } from "./price";

export interface IDetailedChildAttendance {
    /**
     * Whether the child participated in this activity - if false, this attendance is an intention to attend
     */
    readonly didAttend: boolean;

    /**
     * When the child was enrolled (intention to participate in an activity). Format: JS date (e.g. 2018-04-13T11:14:54.411Z)
     */
    readonly enrolled?: string;

    /**
     * Who registered the child's intent to participate in an activity. Crew id
     */
    readonly enrolledRegisteredBy?: string;

    /**
     * When the child arrived to participate in an activity. Format: JS date, e.g. 2018-04-13T11:14:54.411Z
     */
    readonly arrived?: string;

    /**
     * Which crew member registered the child as arrived. Crew id
     */
    readonly arrivedRegisteredBy?: string;

    /**
     * When the child left/went home after the activity. Format: JS date, e.g. 2018-04-13T11:14:54.411Z
     */
    readonly left?: string;

    /**
     * Who registered the child leaving. Crew id
     */
    readonly leftRegisteredBy?: string;

    /**
     * If child is part of an age group
     */
    readonly ageGroupName?: string;

    /**
     * The amount paid to attend this can be different from the shift's price due to discounts.
     */
    readonly amountPaid: IPrice;

    /**
     * The discounts that were applied for this attendance. Only the name of the discount is saved.
     */
    readonly discounts?: ReadonlyArray<{ readonly name: string }>;
}

export interface IDetailedCrewAttendance {
    /**
     * Whether the crew member was present for this activity - if false, this attendance is an intention to attend
     */
    readonly didAttend: boolean;

    /**
     * When the crew was enrolled (intention to participate in an activity). Format: JS date (e.g. 2018-04-13T11:14:54.411Z)
     */
    readonly enrolled?: string;

    /**
     * If crew member belongs to an age group for this shift
     */
    readonly ageGroupName?: string;
}

export class DetailedAttendancesOnShift {
    constructor(
        readonly shiftId: string,
        readonly childAttendances: { readonly [childId: string]: IDetailedChildAttendance },
        readonly crewAttendances: { readonly [crew: string]: IDetailedCrewAttendance },
    ) {}

    /**
     * Check if a given child attended this shift
     */
    didChildAttend(childId: string) {
        return !!this.childAttendances[childId] && this.childAttendances[childId].didAttend;
    }

    /**
     * Check if a given crew member attended this shift
     */
    didCrewMemberAttend(crewId: string) {
        return !!this.crewAttendances[crewId] && this.crewAttendances[crewId].didAttend;
    }

    /**
     * Get an array of child id's that attended this shift
     */
    attendingChildren(): ReadonlyArray<string> {
        return Object.keys(this.childAttendances).filter(childId => this.didChildAttend(childId));
    }

    /**
     * Get an array of crew member id's that attended this shift
     */
    attendingCrewMembers(): ReadonlyArray<string> {
        return Object.keys(this.crewAttendances).filter(crewId => this.didCrewMemberAttend(crewId));
    }

    /**
     * For the given child, check how much they paid for the shifts they attended
     * If they did not attend, or were not registered, return a zero price
     */
    amountPaidByChild(childId: string): Price {
        if (this.didChildAttend(childId)) {
            return new Price(this.childAttendances[childId].amountPaid);
        } else {
            return Price.zero;
        }
    }
}

export class DetailedAttendancesOnShifts {
    constructor(
        readonly detailedAttendancesOnShift: ReadonlyArray<DetailedAttendancesOnShift>,
    ) {
        if (new Set(detailedAttendancesOnShift.map(x => x.shiftId)).size !== detailedAttendancesOnShift.length) {
            throw new Error("detailedChildAttendancesOnShift may not contain two shifts with the same id");
        }
    }

    /**
     * Get the number of unique child attendances on given shifts
     *
     * @param onShifts The shifts to consider. If undefined, consider all shifts the object has
     */
    uniqueChildAttendances(onShifts?: ReadonlyArray<string>): number {
        const allShiftIds = this.detailedAttendancesOnShift.map(attendances => attendances.shiftId);

        const allAttendances = this.detailedAttendancesOnShift
            .filter(detailedAttendances => (onShifts || allShiftIds).indexOf(detailedAttendances.shiftId) !== -1)
            .map(detailedAttendances => detailedAttendances.attendingChildren());

        const set = new Set();

        allAttendances.forEach(attendances => attendances.forEach(attendance => set.add(attendance)));

        return set.size;
    }

    /**
     * Get the number of unique crew attendances on given shifts
     *
     * @param onShifts The shifts to consider. If undefined, consider all shifts the object has
     */
    uniqueCrewMemberAttendances(onShifts?: ReadonlyArray<string>): number {
        const allShiftIds = this.detailedAttendancesOnShift.map(attendances => attendances.shiftId);

        const allAttendances = this.detailedAttendancesOnShift
            .filter(detailedAttendances => (onShifts || allShiftIds).indexOf(detailedAttendances.shiftId) !== -1)
            .map(detailedAttendances => detailedAttendances.attendingCrewMembers());

        const set = new Set();

        allAttendances.forEach(attendances => attendances.forEach(attendance => set.add(attendance)));

        return set.size;
    }

    /**
     * Returns the number of shifts a crew member attended
     */
    numberOfCrewMemberAttendances(crewId: string) {
        return this.detailedAttendancesOnShift.reduce((previousValue, currentValue) => {
            return previousValue + (currentValue.didCrewMemberAttend(crewId) ? 1 : 0);
        }, 0);
    }

    /**
     * Returns the number of shifts a child attended
     */
    numberOfChildAttendances(childId: string) {
        return this.detailedAttendancesOnShift.reduce((previousValue, currentValue) => {
            return previousValue + (currentValue.didChildAttend(childId) ? 1 : 0);
        }, 0);
    }

    /**
     * Check if a given crew member did attend on a specific shift
     */
    didCrewMemberAttend(crewId: string, shiftId: string): boolean {
        const attendancesForShift = this.detailedAttendancesOnShift.find(att => att.shiftId === shiftId);

        if (!attendancesForShift) {
            return false;
        } else {
            return attendancesForShift.didCrewMemberAttend(crewId);
        }
    }

    /**
     * Check if a given child did attend on a specific shift
     */
    didChildAttend(childId: string, shiftId: string): boolean {
        const attendancesForShift = this.detailedAttendancesOnShift.find(att => att.shiftId === shiftId);

        if (!attendancesForShift) {
            return false;
        } else {
            return attendancesForShift.didChildAttend(childId);
        }
    }

    /**
     * For the given child, check how much they paid for the shifts they attended
     * If they did not attend, or were not registered, return a zero price
     */
    amountPaidByChild(childId: string): Price {
        return Price.total(...this.detailedAttendancesOnShift.map(x => x.amountPaidByChild(childId)));
    }
}
