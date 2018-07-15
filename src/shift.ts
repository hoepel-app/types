/**
 * A shift: an activity or period of a day
 */
import { IPrice } from './price';
import { IStartAndEndTime } from './start-and-end-time';

export interface IShift {
    id: string;
    price: IPrice;
    childrenCanBePresent: boolean;
    crewCanBePresent: boolean;
    kind: string;
    location?: string;
    description?: string;
    startAndEnd?: IStartAndEndTime;
}
