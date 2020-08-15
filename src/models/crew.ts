import { compile } from "virginity-ts";
import { IAddress } from "../value-objects/address";
import { CrewCertificates, ICrewCertificates } from "../value-objects/crew-certificates";
import { DayDate, IDayDate } from "../value-objects/day-date";
import {Person} from "./person";
import {IPhoneContact} from "../value-objects/phone-contact";

/**
 * A crew member
 */

export interface ICrew extends Person {
    readonly id?: string;

    readonly firstName: string;
    readonly lastName: string;
    readonly address: IAddress;
    readonly active: boolean;
    /**
     * Bank account of the person, preferably IBAN format
     */
    readonly bankAccount?: string;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
    /**
     * In which year the crew member started volunteering/working
     */
    readonly yearStarted?: number;
    /**
     * Day on which crew member was born as ISO 8601
     */
    readonly birthDate?: IDayDate;
    readonly certificates?: ICrewCertificates;
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
            firstName: "",
            lastName: "",
            remarks: "",
            email: [],
            phone: [],
        });
    }

    readonly id?: string;
    readonly active: boolean;
    readonly address: IAddress;
    readonly bankAccount?: string;
    readonly birthDate?: DayDate;
    readonly firstName: string;
    readonly lastName: string;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
    readonly certificates: CrewCertificates;
    readonly remarks: string;
    readonly yearStarted?: number;

    constructor(obj: ICrew) {
        this.id = obj.id;
        this.active = obj.active;
        this.address = obj.address;
        this.bankAccount = obj.bankAccount;
        this.birthDate = obj.birthDate ? new DayDate(obj.birthDate) : undefined;
        this.phone = obj.phone ? obj.phone.filter(phone => !!phone.phoneNumber) : [];
        this.email = obj.email ? obj.email.filter(email => !!email) : [];
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.remarks = obj.remarks;
        this.yearStarted = obj.yearStarted;
        this.certificates = new CrewCertificates(obj.certificates || {
            hasPlayworkerCertificate: false,
            hasTeamleaderCertificate: false,
            hasTrainerCertificate: false,
        });
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
            tel: this.phone.map(p => {
                return { number: p.phoneNumber, type: telType(p.phoneNumber) };
            }),
            email: this.email.map(e => {
                return { type: "personal", address: e };
            }),
            bday: bday || undefined,
        };

        return compile(address ? Object.assign({}, address, obj) : obj);
    }

    withId(id?: string): Crew {
        return new Crew({ ...(this as any), id });
    }

    withActive(active: boolean): Crew {
        return new Crew({ ...(this as any), active });
    }

    withAddress(address: IAddress): Crew {
        return new Crew({ ...(this as any), address });
    }

    withBankAccount(bankAccount?: string): Crew {
        return new Crew({ ...(this as any), bankAccount });
    }

    withBirthDate(birthDate: IDayDate): Crew {
        return new Crew({ ...(this as any), birthDate });
    }

    withEmail(email: ReadonlyArray<string>) {
        return new Crew({ ...(this as any), email });
    }

    withPhoneContact(phone: ReadonlyArray<IPhoneContact>) {
        return new Crew({ ...(this as any), phone });
    }

    withFirstName(firstName: string): Crew {
        return new Crew({ ...(this as any), firstName });
    }

    withLastName(lastName: string): Crew {
        return new Crew({ ...(this as any), lastName });
    }

    withRemarks(remarks: string): Crew {
        return new Crew({ ...(this as any), remarks });
    }

    withYearStarted(yearStarted: number): Crew {
        return new Crew({ ...(this as any), yearStarted });
    }

    withCertificates(certificates?: ICrewCertificates): Crew {
        return new Crew({ ...(this as any), certificates });
    }
}
