/**
 * A shift: an activity or period of a day
 */
import { Price } from './price';
import { StartAndEndTime } from './start-and-end-time';

export interface Shift {
    id: string;
    price: Price;
    childrenCanBePresent: boolean;
    crewCanBePresent: boolean;
    kind: string;
    location?: string;
    description?: string;
    startAndEnd?: StartAndEndTime;
}
