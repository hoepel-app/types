export interface DetailedAttendance {
    /**
     * The shift this attendance is about
     */
    shiftId: string;

    /** When the child was enrolled (intention to participate in an activity)
     *  Format: JS date (e.g. 2018-04-13T11:14:54.411Z)
     */
    enrolled?: string;

    /**
     * Who registered the child's intent to participate in an activity
     * Crew id
     */
    enrolledRegisteredBy?: string;

    /**
     * When the child arrived to participate in an activity
     * Format: JS date, e.g. 2018-04-13T11:14:54.411Z
     */
    arrived?: string;

    /**
     * Which crew member registered the child as arrived
     * Crew id
     */
    arrivedRegisteredBy?: string;

    /**
     * When the child left/went home after the activity
     * Format: JS date, e.g. 2018-04-13T11:14:54.411Z
     */
    left?: string;

    /**
     * Who registered the child leaving
     * Crew id
     */
    leftRegisteredBy?: string;

    /**
     * If child is part of an age group
     */
    ageGroupName?: string;
}
