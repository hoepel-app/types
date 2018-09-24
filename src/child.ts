/**
 * A child
 */
import { Address, IAddress } from './address';
import { IContactInfo } from './contact-info';
import { DayDate, IDayDate } from './day-date';

export interface IChild {
    firstName: string;
    lastName: string;
    id?: string;
    legacyAddress?: IAddress;
    legacyContact?: IContactInfo;
    gender?: "male" | "female" | "other";
    contactPeople: ReadonlyArray<{
        contactPersonId?: string;
        /**
         * The relationship between the person and the contact person. E.g. 'Father', 'Grandparent'
         */
        relationship?: string;
    }>;
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

    public readonly birthDate?: DayDate;
    public readonly contactPeople: ReadonlyArray<{ contactPersonId?: string; relationship?: string }>;
    public readonly firstName: string;
    public readonly gender?: "male" | "female" | "other";
    public readonly lastName: string;
    public readonly legacyAddress?: Address;
    public readonly legacyContact?: IContactInfo;
    public readonly remarks: string;
    public readonly id?: string;

    constructor(obj: IChild) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.birthDate = obj.birthDate ? new DayDate(obj.birthDate) : undefined;
        this.contactPeople = obj.contactPeople;
        this.gender = obj.gender;
        this.legacyAddress = obj.legacyAddress ? new Address(obj.legacyAddress) : undefined;
        this.legacyContact = obj.legacyContact;
        this.remarks = obj.remarks;
        this.id = obj.id;
    }

    get fullName() { return `${this.firstName} ${this.lastName}`; }

    withId(id?: string): Child {
        return Object.assign(this, { id });
    }

    withContactPeople(people: ReadonlyArray<{ contactPersonId?: string; relationship?: string }>): Child {
        return Object.assign(this, { contactPeople: people });
    }

    withFirstName(firstName: string): Child {
        return Object.assign(this, { firstName });
    }

    withLastName(lastName: string): Child {
        return Object.assign(this, { lastName });
    }

    withBirthDate(date: IDayDate): Child {
        return Object.assign(this, { birthDate: new DayDate(date) });
    }

    withGender(gender: "male" | "female" | "other"): Child {
        return Object.assign(this, { gender });
    }

    withLegacyAddress(address: Address): Child {
        return Object.assign(this, { legacyAddress: address });
    }

    withLegacyContact(legacyContact: IContactInfo): Child {
        return Object.assign(this, { legacyContact });
    }

    withRemarks(remarks: string): Child {
        return Object.assign(this, { remarks });
    }
}
