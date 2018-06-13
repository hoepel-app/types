/**
 * Phone contact information for a person. Includes phone number and phone number meta-information.
 */
export interface PhoneContact {
    phoneNumber: string;
    kind?: string;
    comment?: string;
}
