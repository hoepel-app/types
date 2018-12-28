import { compile } from "virginity-ts";
import { Address, IAddress } from "./address";
import { IPhoneContact } from "./phone-contact";

export interface IContactPerson {
    readonly firstName: string;
    readonly lastName: string;
    readonly address: IAddress;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly id?: string;
}

export class ContactPerson implements IContactPerson {
    static empty() {
        return new ContactPerson({
            address: {},
            firstName: "",
            lastName: "",
            phone: [],
        });
    }

    static sorted(list: ReadonlyArray<ContactPerson>): ReadonlyArray<ContactPerson> {
        return [ ... list ].sort((a: ContactPerson, b: ContactPerson) => a.fullName.localeCompare(b.fullName));
    }

    readonly address: Address;
    readonly firstName: string;
    readonly id?: string;
    readonly lastName: string;
    readonly phone: ReadonlyArray<IPhoneContact>;

    constructor(obj: IContactPerson) {
        this.address = new Address(obj.address);
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.id = obj.id;
        this.phone = obj.phone;
    }

    get fullName() { return `${this.firstName} ${this.lastName}`; }

    get vcard(): string {
        const telType = (tel: string) => {
            if (tel.startsWith("04") || tel.startsWith("+324")) {
                return "cell";
            } else {
                return "home";
            }
        };

        const address = this.address.street ?  [{
            type: "home",
            street: `${this.address.street} ${this.address.number}`,
            city: this.address.city,
            zip: this.address.zipCode,
            country: "Belgium",
        }] : null;

        const obj = {
            name: {
                first: this.firstName,
                last: this.lastName,
            },
            categories: ["Speelplein (contactpersonen)"],
            note: "Geimporteerde contactpersoon (speelplein)",
            tel: this.phone.map((p) => {
                return { number: p.phoneNumber, type: telType(p.phoneNumber) };
            }),
        };

        return compile(address ? Object.assign(obj, { adr: address}) : obj);
    }

    withId(id?: string): ContactPerson {
        return Object.assign(this, { id });
    }
}
