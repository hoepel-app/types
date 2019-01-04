/**
 * A child
 */
import { Address, IAddress } from "./address";
import { DayDate, IDayDate } from "./day-date";
import {Person} from "./person";
import {IPhoneContact} from "./phone-contact";

export interface IChild extends Person {
    readonly firstName: string;
    readonly lastName: string;
    readonly id?: string;
    readonly address: IAddress;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
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
            address: {},
            phone: [],
            email: [],
        });
    }

    readonly birthDate?: DayDate;
    readonly contactPeople: ReadonlyArray<{ readonly contactPersonId: string; readonly relationship: string }>;
    readonly firstName: string;
    readonly gender?: "male" | "female" | "other";
    readonly lastName: string;
    readonly address: Address;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
    readonly remarks: string;
    readonly id?: string;

    constructor(obj: IChild) {
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.birthDate = obj.birthDate ? new DayDate(obj.birthDate) : undefined;
        this.contactPeople = obj.contactPeople;
        this.gender = obj.gender;
        this.address = new Address(obj.address || {});
        this.email = obj.email || [];
        this.phone = obj.phone || [];
        this.remarks = obj.remarks;
        this.id = obj.id;
    }

    get fullName() { return `${this.firstName} ${this.lastName}`; }

    withId(id?: string): Child {
        return new Child({ ...(this as any),  id });
    }

    withContactPeople(people: ReadonlyArray<{ readonly contactPersonId: string; readonly relationship: string }>): Child {
        return new Child({ ...(this as any),  contactPeople: people });
    }

    withFirstName(firstName: string): Child {
        return new Child({ ...(this as any),  firstName });
    }

    withLastName(lastName: string): Child {
        return new Child({ ...(this as any),  lastName });
    }

    withBirthDate(date: IDayDate): Child {
        return new Child({ ...(this as any),  birthDate: new DayDate(date) });
    }

    withGender(gender: "male" | "female" | "other"): Child {
        return new Child({ ...(this as any),  gender });
    }

    withAddress(address: Address): Child {
        return new Child({ ...(this as any),  address });
    }

    withEmail(email: ReadonlyArray<string>) {
        return new Child({ ...(this as any),  email });
    }

    withPhoneContact(phone: ReadonlyArray<IPhoneContact>) {
        return new Child({ ...(this as any),  phone });
    }

    withRemarks(remarks: string): Child {
        return new Child({ ...(this as any),  remarks });
    }
}
