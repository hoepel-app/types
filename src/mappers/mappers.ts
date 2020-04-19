import { Child, IChild } from "../models/child";
import { Consumable, IConsumable } from "../models/consumable";
import { Consumption, IConsumption } from "../models/consumption";
import { ContactPerson, IContactPerson } from "../models/contact-person";
import { Crew, ICrew } from "../models/crew";
import { Discount, IDiscount } from "../models/discount";
import { IShift, IShiftPreset, Shift } from "../models/shift";
import { Mapper } from "./mapper";

export const identityMapper = <T>(): Mapper<T, T & { readonly id: string }> => {
    return {
        lift(id: string, obj: T): T & { readonly id: string } {
            return { id, ...obj };
        },
        unlift(obj: T & { readonly id?: string }): T {
            const { id, ...res } = obj;
            return res as T;
        },
    };
};

export const childMapper: Mapper<IChild, Child> = {
    lift(id: string, obj: IChild): Child {
        return new Child({ id, ...obj });
    },
    unlift(child: Child): IChild {
        const { id, ...obj } = child;
        return obj;
    },
};

export const contactPersonMapper: Mapper<IContactPerson, ContactPerson> = {
    lift(id: string, obj: IContactPerson): ContactPerson {
        return new ContactPerson({ id, ...obj });
    },
    unlift(contactPerson: ContactPerson): IContactPerson {
        const { id, ...obj } = contactPerson;
        return obj;
    },
};

export const consumableMapper: Mapper<{ readonly consumables: ReadonlyArray<IConsumable> }, ReadonlyArray<Consumable>> = {
    lift(id: string, obj: { readonly consumables: ReadonlyArray<IConsumable> }): ReadonlyArray<Consumable> {
        return obj.consumables.map(iconsumable => new Consumable(iconsumable));
    },
    unlift(obj: ReadonlyArray<Consumable>): { readonly consumables: ReadonlyArray<IConsumable> } {
        return { consumables: obj };
    },
};

export const consumptionMapper: Mapper<IConsumption, Consumption> = {
    lift(id: string, obj: IConsumption): Consumption {
        return new Consumption(obj);
    },
    unlift(obj: Consumption): IConsumption {
        return obj;
    },
};

export const crewMapper: Mapper<ICrew, Crew> = {
    lift(id: string, obj: ICrew): Crew {
        return new Crew({ id, ...obj });
    },
    unlift(crew: Crew): ICrew {
        const { id, ...obj } = crew;
        return obj;
    },
};

export const discountMapper: Mapper<{ readonly discounts: ReadonlyArray<IDiscount> }, ReadonlyArray<Discount>> = {
    lift(id: string, obj: { readonly discounts: ReadonlyArray<IDiscount> }): ReadonlyArray<Discount> {
        return obj.discounts.map(idiscount => new Discount(idiscount));
    },
    unlift(obj: ReadonlyArray<Discount>): { readonly discounts: ReadonlyArray<IDiscount> } {
        return { discounts: obj };
    },
};

export const shiftMapper: Mapper<IShift, Shift> = {
    lift(id: string, obj: IShift): Shift {
        return new Shift({ id, ...obj });
    },
    unlift(shift: Shift): IShift {
        const { id, ...obj } = shift;
        return obj;
    },
};

export const shiftPresetMapper: Mapper<{ readonly presets: ReadonlyArray<IShiftPreset> }, ReadonlyArray<Shift>> = {
    lift(id: string, obj: { readonly presets: ReadonlyArray<IShift> }): ReadonlyArray<Shift> {
        return obj.presets.map(shift => new Shift(shift));
    },
    unlift(obj: ReadonlyArray<Shift>): { readonly presets: ReadonlyArray<IShift> } {
        return { presets: obj };
    },
};
