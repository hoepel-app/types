/**
 * A child
 */
import { Address, IAddress } from './address';
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


export class Child implements IChild {
    static sorted(list: ReadonlyArray<Child>): ReadonlyArray<Child> {
        return [ ...list ].sort((a: Child, b: Child) => a.fullName.localeCompare(b.fullName));
    }

    static empty(): Child {
        return new Child({
            contactPeople: [],
            firstName: '',
            lastName: '',
            remarks: '',
        });
    }

    public readonly birthDate?: IDayDate;
    public readonly contactPeople: { contactPersonId?: string; relationship?: string }[];
    public readonly firstName: string;
    public readonly gender?: "male" | "female" | "other";
    public readonly lastName: string;
    public readonly legacyAddress?: Address;
    public readonly legacyContact?: IContactInfo;
    public readonly remarks: string;

    constructor(obj: IChild) {
        this.birthDate = obj.birthDate;
        this.contactPeople = obj.contactPeople;
        this.firstName = obj.firstName;
        this.gender = obj.gender;
        this.lastName = obj.lastName;
        this.legacyAddress = obj.legacyAddress ? new Address(obj.legacyAddress) : undefined;
        this.legacyContact = obj.legacyContact;
        this.remarks = obj.remarks;
    }

    get fullName() { return `${this.firstName} ${this.lastName}`; }
}
