/**
 * Contact information for a person. Describes how a person can be contacted.
 */
import { IPhoneContact } from './phone-contact';

export interface IContactInfo {
    phone: IPhoneContact[];
    email: string[];
}
