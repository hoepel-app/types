/**
 * A child
 */
import { Address } from './address';
import { ContactInfo } from './contact-info';

export interface Child {
    firstName: string;
    lastName: string;
    legacyAddress?: Address;
    legacyContact?: ContactInfo;
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
    birthDate?: string;
    remarks: string;
}
