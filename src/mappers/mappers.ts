import { Child, IChild } from "../models/child";
import { ContactPerson, IContactPerson } from "../models/contact-person";
import { Crew, ICrew } from "../models/crew";
import { IShift, Shift } from "../models/shift";
import { Mapper } from "./mapper";

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

export const crewMapper: Mapper<ICrew, Crew> = {
    lift(id: string, obj: ICrew): Crew {
        return new Crew({ id, ...obj });
    },
    unlift(crew: Crew): ICrew {
        const { id, ...obj } = crew;
        return obj;
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
