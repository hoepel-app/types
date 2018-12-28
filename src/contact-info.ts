/**
 * Contact information for a person. Describes how a person can be contacted.
 */
import { IPhoneContact } from "./phone-contact";

export interface IContactInfo {
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
}
