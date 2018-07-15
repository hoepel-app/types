import { IDetailedAttendance } from './detailed-attendance';

export interface IDetailedAttendancesOnDay {
    /**
     * Day id of the day
     */
    day: string;

    /**
     * The shifts this child attended on this day
     */
    shifts: IDetailedAttendance[];
}
