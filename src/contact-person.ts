import { IPhoneContact } from './phone-contact';
import { IAddress } from './address';
import * as vcard from 'virginity';

export interface IContactPerson {
    readonly firstName: string,
    readonly lastName: string,
    readonly address: IAddress,
    readonly phone: ReadonlyArray<IPhoneContact>,
    readonly id?: string,
}

export class ContactPerson implements IContactPerson {
    static empty() {
        return new ContactPerson({
            address: {},
            firstName: '',
            lastName: '',
            phone: []
        });
    }

    public readonly address: IAddress;
    public readonly firstName: string;
    public readonly id?: string;
    public readonly lastName: string;
    public readonly phone: ReadonlyArray<IPhoneContact>;


    constructor(obj: IContactPerson) {
        this.address = obj.address;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.id = obj.id;
        this.phone = obj.phone;
    }

    get fullName() { return `${this.firstName} ${this.lastName}`; }

    get vcard(): string {
        const telType = (tel: string) => {
            if (tel.startsWith('04') || tel.startsWith('+324')) {
                return 'cell';
            } else {
                return 'home';
            }
        };

        const address = this.address.street ?  [{
            type: 'home',
            street: `${this.address.street} ${this.address.number}`,
            city: this.address.city,
            zip: this.address.zipCode,
            country: 'Belgium'
        }] : null;

        const obj = {
            name: {
                first: this.firstName,
                last: this.lastName
            },
            categories: ['Speelplein (contactpersonen)'],
            note: 'Geimporteerde contactpersoon (speelplein)',
            tel: this.phone.map(p => {
                return { number: p.phoneNumber, type: telType(p.phoneNumber) };
            })
        };

        return vcard(address ? Object.assign(obj, { adr: address}) : obj);
    }

    public withId(id?: string): ContactPerson {
        return Object.assign(this, { id });
    }
}
