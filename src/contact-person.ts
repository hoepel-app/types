import { compile } from "virginity-ts";
import { Address, IAddress } from "./address";
import {Person} from "./person";
import { IPhoneContact } from "./phone-contact";

export interface IContactPerson extends Person {
    readonly firstName: string;
    readonly lastName: string;
    readonly address: IAddress;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
    readonly id?: string;
    readonly remarks: string;
}

export class ContactPerson implements IContactPerson {
    static empty() {
        return new ContactPerson({
            address: {},
            firstName: "",
            lastName: "",
            phone: [],
            email: [],
            remarks: "",
        });
    }

    static sorted(list: ReadonlyArray<ContactPerson>): ReadonlyArray<ContactPerson> {
        return [ ... list ].sort((a: ContactPerson, b: ContactPerson) => a.fullName.localeCompare(b.fullName));
    }

    readonly address: Address;
    readonly firstName: string;
    readonly id?: string;
    readonly email: ReadonlyArray<string>;
    readonly lastName: string;
    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly remarks: string;

    constructor(obj: IContactPerson) {
        this.address = new Address(obj.address);
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.id = obj.id;
        this.phone = obj.phone || [];
        this.email = obj.email || [];
        this.remarks = obj.remarks;
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

        return compile(address ? Object.assign({}, { adr: address}, obj) : obj);
    }

    withId(id?: string): ContactPerson {
        return new ContactPerson({...(this as any),  id });
    }
}
