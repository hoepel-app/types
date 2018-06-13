/**
 * Contact information for a person. Describes how a person can be contacted.
 */
import { PhoneContact } from './phone-contact';

export interface ContactInfo {
    phone: PhoneContact[];
    email: string[];
}
