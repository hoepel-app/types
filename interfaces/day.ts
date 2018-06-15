import { IShift } from './shift';

/**
 * A day, possibly containing shifts on that day
 */
export interface IDay {
    date: string;
    shifts: IShift[];
}
