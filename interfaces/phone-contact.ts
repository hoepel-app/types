/**
 * Phone contact information for a person. Includes phone number and phone number meta-information.
 */
export interface IPhoneContact {
    phoneNumber: string;
    kind?: string;
    comment?: string;
}
