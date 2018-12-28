/**
 * Phone contact information for a person. Includes phone number and phone number meta-information.
 */
export interface IPhoneContact {
    readonly phoneNumber: string;
    readonly kind?: string;
    readonly comment?: string;
}
