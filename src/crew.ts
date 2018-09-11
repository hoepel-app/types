import { IAddress } from './address';
import { IContactInfo } from './contact-info';
import { DayDate, IDayDate } from './day-date';
import * as vcard from 'virginity';

/**
 * A crew member
 */

export interface ICrew {
    firstName: string;
    lastName: string;
    address: IAddress;
    active: boolean;
    /**
     * Bank account of the person, preferably IBAN format
     */
    bankAccount?: string;
    contact: IContactInfo;
    /**
     * In which year the crew member started volunteering/working
     * @TJS-type integer
     */
    yearStarted?: number;
    /**
     * Day on which crew member was born as ISO 8601
     */
    birthDate?: IDayDate;
    remarks: string;
}

export class Crew implements ICrew {
    static sorted(list: ReadonlyArray<Crew>): ReadonlyArray<Crew> {
        return [ ...list ].sort((a: Crew, b: Crew) => a.fullName.localeCompare(b.fullName));
    }

    public readonly active: boolean;
    public readonly address: IAddress;
    public readonly bankAccount?: string;
    public readonly birthDate?: IDayDate;
    public readonly contact: IContactInfo;
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly remarks: string;
    public readonly yearStarted?: number;

    constructor (obj: ICrew) {
        this.active = obj.active;
        this.address = obj.address;
        this.bankAccount = obj.bankAccount;
        this.birthDate = obj.birthDate;
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
            if (tel.startsWith('04') || tel.startsWith('+324')) {
                return 'cell';
            } else {
                return 'home';
            }
        };

        // TODO address not included in vcard?
        const address = this.address.street ?  [{ adr: {
                type: 'home',
                street: `${this.address.street} ${this.address.number}`,
                city: this.address.city,
                zip: this.address.zipCode,
                country: 'Belgium'
            }}] : undefined;

        const bday: string | null = this.birthDate ? new DayDate(this.birthDate).toISO8601() : null;

        const obj = {
            name: {
                first: this.firstName,
                last: this.lastName
            },
            categories: ['Speelplein (animator)'],
            note: 'Geimporteerde animator (speelplein)',
            tel: this.contact.phone.map(p => {
                return { number: p.phoneNumber, type: telType(p.phoneNumber) };
            }),
            email: this.contact.email.map(e => {
                return { type: 'personal', address: e };
            }),
            bday: bday
        };

        return vcard(address ? Object.assign(obj, address) : obj);
    }
}
