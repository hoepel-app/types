import { Shift } from './shift';

/**
 * A day, possibly containing shifts on that day
 */
export interface Day {
    date: string;
    shifts: Shift[];
}
