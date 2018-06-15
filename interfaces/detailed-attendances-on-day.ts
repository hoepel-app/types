import { DetailedAttendance } from './detailed-attendance';

export interface DetailedAttendancesOnDay {
    /**
     * Day id of the day
     */
    day: string;

    /**
     * The shifts this child attended on this day
     */
    shifts: DetailedAttendance[];
}
