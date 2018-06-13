/**
 * A crew member
 */
import { Address } from './address';
import { ContactInfo } from './contact-info';

export interface Crew {
    firstName: string;
    lastName: string;
    address: Address;
    active: boolean;
    /**
     * Bank account of the person, preferably IBAN format
     */
    bankAccount?: string;
    contact: ContactInfo;
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
