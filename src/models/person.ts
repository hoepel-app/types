import {IAddress} from "../value-objects/address";
import {IPhoneContact} from "../value-objects/phone-contact";

export interface Person {
    readonly id?: string;

    readonly firstName: string;
    readonly lastName: string;

    readonly address: IAddress;

    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;

    readonly remarks: string;
}
