/**
 * A crew member
 */
import { IAddress } from './address';
import { IContactInfo } from './contact-info';

export interface ICrew {
    firstName: string;
    lastName: string;
    address: IAddress;
    active: boolean;
    /**
     * Bank account of the person, preferably IBAN format
     */
    bankAccount?: string;
    contact: IContactInfo;
    /**
     * In which year the crew member started volunteering/working
     * @TJS-type integer
     */
    yearStarted?: number;
    /**
     * Day on which child was born as ISO 8601
     */
    birthDate?: string;
    remarks: string;
}
