import { AgeGroup, IAgeGroup } from "../models/age-group";
import { Child, IChild } from "../models/child";
import { ContactPerson, IContactPerson } from "../models/contact-person";
import { Crew, ICrew } from "../models/crew";
import { Discount, IDiscount } from "../models/discount";
import { IShift, Shift } from "../models/shift";
import { Mapper, tenantName } from "./mapper";

export const ageGroupMapper: Mapper<IAgeGroup, AgeGroup> = {
    lift(id: string, obj: IAgeGroup): AgeGroup {
        return new AgeGroup(obj);
    },
    unlift(obj: AgeGroup): { readonly obj: IAgeGroup, readonly id: symbol } {
        return { obj, id: tenantName };
    },
};

export const childMapper: Mapper<IChild, Child> = {
    lift(id: string, obj: IChild): Child {
        return new Child({ id, ...obj });
    },
    unlift(child: Child): { readonly obj: IChild, readonly id?: string } {
        const { id, ...obj } = child;
        return { id, obj };
    },
};

export const contactPersonMapper: Mapper<IContactPerson, ContactPerson> = {
    lift(id: string, obj: IContactPerson): ContactPerson {
        return new ContactPerson({ id, ...obj });
    },
    unlift(contactPerson: ContactPerson): { readonly obj: IContactPerson, readonly id?: string } {
        const { id, ...obj } = contactPerson;
        return { id, obj };
    },
};

export const crewMapper: Mapper<ICrew, Crew> = {
    lift(id: string, obj: ICrew): Crew {
        return new Crew({ id, ...obj });
    },
    unlift(crew: Crew): { readonly obj: ICrew, readonly id?: string } {
        const { id, ...obj } = crew;
        return { id, obj };
    },
};

export const discountMapper: Mapper<{ readonly discounts: ReadonlyArray<IDiscount> }, ReadonlyArray<Discount>> = {
    lift(id: string, obj: { readonly discounts: ReadonlyArray<IDiscount> }): ReadonlyArray<Discount> {
        return obj.discounts.map(idiscount => new Discount(idiscount));
    },
    unlift(obj: ReadonlyArray<Discount>): { readonly obj: { readonly discounts: ReadonlyArray<IDiscount> }, readonly id: symbol } {
        return {
            obj: {
                discounts: obj,
            },
            id: tenantName,
        };
    },
};

export const shiftMapper: Mapper<IShift, Shift> = {
    lift(id: string, obj: IShift): Shift {
        return new Shift({ id, ...obj });
    },
    unlift(shift: Shift): { readonly obj: IShift, readonly id?: string } {
        const { id, ...obj } = shift;
        return { id, obj };
    },
};

export const shiftPresetMapper: Mapper<{ readonly presets: ReadonlyArray<IShift> }, ReadonlyArray<Shift>> = {
    lift(id: string, obj: { readonly presets: ReadonlyArray<IShift> }): ReadonlyArray<Shift> {
        return obj.presets.map(shift => new Shift(shift));
    },
    unlift(obj: ReadonlyArray<Shift>): { readonly obj: { readonly presets: ReadonlyArray<IShift> }, readonly id: symbol } {
        return {
            id: tenantName,
            obj: { presets: obj },
        };
    },
};
