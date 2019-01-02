import {IAddress} from "./address";
import {IPhoneContact} from "./phone-contact";

export interface Person {
    readonly id?: string;

    readonly firstName: string;
    readonly lastName: string;

    readonly address: IAddress;

    readonly phone: ReadonlyArray<IPhoneContact>;
    readonly email: ReadonlyArray<string>;
}
