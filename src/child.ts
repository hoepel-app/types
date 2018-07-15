/**
 * A child
 */
import { IAddress } from './address';
import { IContactInfo } from './contact-info';
import { IDayDate } from './day-date';

export interface IChild {
    firstName: string;
    lastName: string;
    legacyAddress?: IAddress;
    legacyContact?: IContactInfo;
    gender?: "male" | "female" | "other";
    contactPeople: {
        contactPersonId?: string;
        /**
         * The relationship between the person and the contact person. E.g. 'Father', 'Grandparent'
         */
        relationship?: string;
    }[];
    /**
     * Day on which child was born as ISO 8601
     */
    birthDate?: IDayDate;
    remarks: string;
}
