/**
 * A child
 */
import { Address, IAddress } from "./address";
import { IContactInfo } from "./contact-info";
import { DayDate, IDayDate } from "./day-date";

export interface IChild {
    readonly firstName: string;
    readonly lastName: string;
    readonly id?: string;
    readonly legacyAddress?: IAddress;
    readonly legacyContact?: IContactInfo;
    readonly gender?: "male" | "female" | "other";
    readonly contactPeople: ReadonlyArray<{
        readonly contactPersonId: string;
        /**
         * The relationship between the person and the contact person. E.g. 'Father', 'Grandparent'
         */
        readonly relationship: string;
    }>;
    /**
     * Day on which child was born as ISO 8601
     */
    readonly birthDate?: IDayDate;
    readonly remarks: string;
}

export class Child implements IChild {
    static sorted(list: ReadonlyArray<Child>): ReadonlyArray<Child> {
        return [ ...list ].sort((a: Child, b: Child) => a.fullName.localeCompare(b.fullName));
    }

    static empty(): Child {
        return new Child({
            contactPeople: [],
            firstName: "",
            lastName: "",
            remarks: "",
        });
    }

    readonly birthDate?: DayDate;
    readonly contactPeople: ReadonlyArray<{ readonly contactPersonId: string; readonly relationship: string }>;
    readonly firstName: string;
    readonly gender?: "male" | "female" | "other";
    readonly lastName: string;
    readonly legacyAddress?: Address;
    readonly legacyContact?: IContactInfo;
    readonly remarks: string;
    readonly id?: string;

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

    withContactPeople(people: ReadonlyArray<{ readonly contactPersonId: string; readonly relationship: string }>): Child {
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
