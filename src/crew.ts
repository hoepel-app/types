import { compile } from "virginity-ts";
import { IAddress } from "./address";
import { IContactInfo } from "./contact-info";
import { DayDate, IDayDate } from "./day-date";

/**
 * A crew member
 */

export interface ICrew {
    readonly id?: string;

    readonly firstName: string;
    readonly lastName: string;
    readonly address: IAddress;
    readonly active: boolean;
    /**
     * Bank account of the person, preferably IBAN format
     */
    readonly bankAccount?: string;
    readonly contact: IContactInfo;
    /**
     * In which year the crew member started volunteering/working
     * @TJS-type integer
     */
    readonly yearStarted?: number;
    /**
     * Day on which crew member was born as ISO 8601
     */
    readonly birthDate?: IDayDate;
    readonly remarks: string;
}

export class Crew implements ICrew {
    static sorted(list: ReadonlyArray<Crew>): ReadonlyArray<Crew> {
        return [ ...list ].sort((a: Crew, b: Crew) => a.fullName.localeCompare(b.fullName));
    }

    static empty() {
        return new Crew({
            active: true,
            address: {},
            contact: { email: [], phone: [] },
            firstName: "",
            lastName: "",
            remarks: "",
        });
    }

    readonly id?: string;
    readonly active: boolean;
    readonly address: IAddress;
    readonly bankAccount?: string;
    readonly birthDate?: DayDate;
    readonly contact: IContactInfo;
    readonly firstName: string;
    readonly lastName: string;
    readonly remarks: string;
    readonly yearStarted?: number;

    constructor(obj: ICrew) {
        this.id = obj.id;
        this.active = obj.active;
        this.address = obj.address;
        this.bankAccount = obj.bankAccount;
        this.birthDate = obj.birthDate ? new DayDate(obj.birthDate) : undefined;
        this.contact = obj.contact;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.remarks = obj.remarks;
        this.yearStarted = obj.yearStarted;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get vcard(): string {
        const telType = (tel: string) => {
            if (tel.startsWith("04") || tel.startsWith("+324")) {
                return "cell";
            } else {
                return "home";
            }
        };

        // TODO address not included in vcard?
        const address = this.address.street ?  [{ adr: {
                type: "home",
                street: `${this.address.street} ${this.address.number}`,
                city: this.address.city,
                zip: this.address.zipCode,
                country: "Belgium",
            }}] : undefined;

        const bday: string | null = this.birthDate ? new DayDate(this.birthDate).toISO8601() : null;

        const obj = {
            name: {
                first: this.firstName,
                last: this.lastName,
            },
            categories: ["Speelplein (animator)"],
            note: "Geimporteerde animator (speelplein)",
            tel: this.contact.phone.map((p) => {
                return { number: p.phoneNumber, type: telType(p.phoneNumber) };
            }),
            email: this.contact.email.map((e) => {
                return { type: "personal", address: e };
            }),
            bday: bday || undefined,
        };

        return compile(address ? Object.assign(obj, address) : obj);
    }

    withId(id?: string): Crew {
        return Object.assign(this, { id });
    }

    withActive(active: boolean): Crew {
        return Object.assign(this, { active });
    }

    withAddress(address: IAddress): Crew {
        return Object.assign(this, { address });
    }

    withBankAccount(bankAccount?: string): Crew {
        return Object.assign(this, { bankAccount });
    }

    withBirthDate(birthDate: IDayDate): Crew {
        return Object.assign(this, { birthDate });
    }

    withContact(contact: IContactInfo): Crew {
        return Object.assign(this, { contact });
    }

    withFirstName(firstName: string): Crew {
        return Object.assign(this, { firstName });
    }

    withLastName(lastName: string): Crew {
        return Object.assign(this, { lastName });
    }

    withRemarks(remarks: string): Crew {
        return Object.assign(this, { remarks });
    }

    withYearStarted(yearStarted: number): Crew {
        return Object.assign(this, { yearStarted });
    }
}
