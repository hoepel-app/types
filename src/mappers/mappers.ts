import { AgeGroup, IAgeGroup } from "../models/age-group";
import { Child, IChild } from "../models/child";
import { ContactPerson, IContactPerson } from "../models/contact-person";
import { Crew, ICrew } from "../models/crew";
import { Discount, IDiscount } from "../models/discount";
import { FileType } from "../models/file";
import { IReport } from "../models/report";
import { IShift, Shift } from "../models/shift";
import { Mapper } from "./mapper";

export const ageGroupMapper: Mapper<IAgeGroup, AgeGroup> = {
    lift(obj: IAgeGroup): AgeGroup {
        return new AgeGroup(obj);
    },
    unlift(obj: AgeGroup): IAgeGroup {
        return obj;
    },
};

export const childMapper: Mapper<IChild, Child> = {
    lift(obj: IChild): Child {
        return new Child(obj);
    },
    unlift(obj: Child): IChild {
        return obj;
    },
};

export const contactPersonMapper: Mapper<IContactPerson, ContactPerson> = {
    lift(obj: IContactPerson): ContactPerson {
        return new ContactPerson(obj);
    },
    unlift(obj: ContactPerson): IContactPerson {
        return obj;
    },
};

export const crewMapper: Mapper<ICrew, Crew> = {
    lift(obj: ICrew): Crew {
        return new Crew(obj);
    },
    unlift(obj: Crew): ICrew {
        return obj;
    },
};

export const discountMapper: Mapper<{ readonly discounts: ReadonlyArray<IDiscount> }, ReadonlyArray<Discount>> = {
    lift(obj: { readonly discounts: ReadonlyArray<IDiscount> }): ReadonlyArray<Discount> {
        return obj.discounts.map(idiscount => new Discount(idiscount));
    },
    unlift(obj: ReadonlyArray<Discount>): { readonly discounts: ReadonlyArray<IDiscount> } {
        return {
            discounts: obj,
        };
    },
};

export const shiftMapper: Mapper<IShift, Shift> = {
    lift(obj: IShift): Shift {
        return new Shift(obj);
    },
    unlift(obj: Shift): IShift {
        return obj;
    },
};

export const shiftPresetMapper: Mapper<{ readonly presets: ReadonlyArray<IShift> }, ReadonlyArray<Shift>> = {
    lift(obj: { readonly presets: ReadonlyArray<IShift> }): ReadonlyArray<Shift> {
        return obj.presets.map(shiftMapper.lift);
    },
    unlift(obj: ReadonlyArray<Shift>): { readonly presets: ReadonlyArray<IShift> } {
        return { presets: obj.map(shiftMapper.unlift) };
    },
};
