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

export class DetailedChildAttendancesOnShift {
    constructor(
        readonly shiftId: string,
        readonly attendances: { readonly [childId: string]: IDetailedChildAttendance },
    ) {}

    /**
     * Check if a given child attended this shift
     */
    didAttend(childId: string) {
        return !!this.attendances[childId] && this.attendances[childId].didAttend;
    }

    /**
     * Get an array of child id's that attended this shift
     */
    attendingChildren(): ReadonlyArray<string> {
        return Object.keys(this.attendances).filter(childId => this.didAttend(childId));
    }

    /**
     * For the given child, check how much they paid for the shifts they attended
     * If they did not attend, or were not registered, return a zero price
     */
    amountPaidBy(childId: string): Price {
        if (this.didAttend(childId)) {
            return new Price(this.attendances[childId].amountPaid);
        } else {
            return Price.zero;
        }
    }
}

export class DetailedChildAttendancesOnShifts {
    constructor(
        readonly detailedChildAttendancesOnShift: ReadonlyArray<DetailedChildAttendancesOnShift>,
    ) {
        if (new Set(detailedChildAttendancesOnShift.map(x => x.shiftId)).size !== detailedChildAttendancesOnShift.length) {
            throw new Error("detailedChildAttendancesOnShift may not contain two shifts with the same id");
        }
    }

    /**
     * Get the number of unique child attendances on given shifts
     *
     * @param onShifts The shifts to consider. If undefined, consider all shifts the object has
     */
    uniqueAttendances(onShifts?: ReadonlyArray<string>): number {
        const allShiftIds = this.detailedChildAttendancesOnShift.map(attendances => attendances.shiftId);

        const allAttendances = this.detailedChildAttendancesOnShift
            .filter(detailedAttendances => (onShifts || allShiftIds).indexOf(detailedAttendances.shiftId) !== -1)
            .map(detailedAttendances => detailedAttendances.attendingChildren());

        const set = new Set();

        allAttendances.forEach(attendances => attendances.forEach(attendance => set.add(attendance)));

        return set.size;
    }

    /**
     * Returns the number of shifts a child attended
     */
    numberOfAttendances(childId: string) {
        return this.detailedChildAttendancesOnShift.reduce((previousValue, currentValue) => {
            return previousValue + (currentValue.didAttend(childId) ? 1 : 0);
        }, 0);
    }

    /**
     * Check if a given child did attend on a specific shift
     */
    didAttend(childId: string, shiftId: string): boolean {
        const attendancesForShift = this.detailedChildAttendancesOnShift.find(att => att.shiftId === shiftId);

        if (!attendancesForShift) {
            return false;
        } else {
            return attendancesForShift.didAttend(childId);
        }
    }

    /**
     * For the given child, check how much they paid for the shifts they attended
     * If they did not attend, or were not registered, return a zero price
     */
    amountPaidBy(childId: string): Price {
        return Price.total(...this.detailedChildAttendancesOnShift.map(x => x.amountPaidBy(childId)));
    }
}
