import { IEvent } from "../events";
import {
    ageGroupMapper,
    childMapper, consumableMapper, consumptionMapper,
    contactPersonMapper,
    crewMapper,
    discountMapper, shiftMapper, shiftPresetMapper,
} from "../mappers/mappers";
import { AgeGroup, IAgeGroup } from "../models/age-group";
import { Child, IChild } from "../models/child";
import { Consumable, IConsumable } from "../models/consumable";
import { Consumption, IConsumption } from "../models/consumption";
import { ContactPerson, IContactPerson } from "../models/contact-person";
import { Crew, ICrew } from "../models/crew";
import { IDetailedChildAttendance, IDetailedCrewAttendance } from "../models/detailed-attendance";
import { Discount, IDiscount } from "../models/discount";
import { IReport } from "../models/report";
import { IShift, IShiftPreset, Shift } from "../models/shift";
import { ITemplate } from "../models/template";
import { ITenant } from "../models/tenant";
import { IUser } from "../models/user";
import { Collection, MappingCollection, TenantIndexedCollection, TenantIndexedMappingCollection } from "./collection";

export interface ChildAttendanceAddDoc {
    readonly childId: string;
    readonly shiftId: string;
    readonly doc: IDetailedChildAttendance;
}

export interface ChildAttendanceDeleteDoc {
    readonly childId: string;
    readonly shiftId: string;
    readonly tenant: string;
}

export interface ChildAttendancesByShiftDoc {
    readonly attendances: { readonly [childId: string]: IDetailedChildAttendance };
}

export interface ChildAttendancesByChildDoc {
    readonly attendances: { readonly [shiftId: string]: IDetailedChildAttendance };
}

export interface CrewAttendanceAddDoc {
    readonly crewId: string;
    readonly shiftId: string;
    readonly doc: IDetailedCrewAttendance;
}

export interface CrewAttendanceDeleteDoc {
    readonly crewId: string;
    readonly shiftId: string;
    readonly tenant: string;
}

export interface CrewAttendancesByShiftDoc {
    readonly attendances: { readonly [childId: string]: IDetailedCrewAttendance };
}

export interface CrewAttendancesByCrewDoc {
    readonly attendances: { readonly [shiftId: string]: IDetailedCrewAttendance };
}

export interface ConsumableDoc {
    readonly consumables: ReadonlyArray<IConsumable>;
}

export interface DiscountDoc {
    readonly discounts: ReadonlyArray<IDiscount>;
}

/**
 * Models Firestore contents with types
 */
export const store = {
    ageGroups: new MappingCollection<
        { readonly groups: ReadonlyArray<IAgeGroup> },
        { readonly groups: ReadonlyArray<AgeGroup> }
        >("age-groups", "age-groups", ageGroupMapper, true),

    childAttendanceAdd: new TenantIndexedCollection<ChildAttendanceAddDoc>(
        "child-attendances-add", "child-attendance-add",
    ),
    childAttendanceDelete: new TenantIndexedCollection<ChildAttendanceDeleteDoc>(
        "child-attendances-delete", "child-attendance-delete",
    ),
    childAttendancesByChild: new TenantIndexedCollection<ChildAttendancesByChildDoc>(
        "child-attendances-by-child", "child-attendance-by-child",
    ),
    childAttendancesByShift: new TenantIndexedCollection<ChildAttendancesByShiftDoc>(
        "child-attendances-by-shift", "child-attendance-by-shift",
    ),
    children: new TenantIndexedMappingCollection<IChild, Child>(
        "children", "child", childMapper,
    ),
    contactPeople: new TenantIndexedMappingCollection<IContactPerson, ContactPerson>(
        "contact-people", "contact-person", contactPersonMapper,
    ),
    consumables: new MappingCollection<ConsumableDoc, ReadonlyArray<Consumable>>(
        "consumables", "consumables", consumableMapper, true,
    ),
    consumptions: new TenantIndexedMappingCollection<IConsumption, Consumption>(
        "consumables", "consumables", consumptionMapper, true,
    ),
    crewAttendancesAdd: new TenantIndexedCollection<CrewAttendanceAddDoc>(
        "crew-attendances-add", "crew-attendance-add",
    ),
    crewAttendancesDelete: new TenantIndexedCollection<CrewAttendanceDeleteDoc>(
        "crew-attendances-delete", "crew-attendance-delete",
    ),
    crewAttendancesByShift: new TenantIndexedCollection<CrewAttendancesByShiftDoc>(
        "crew-attendances-by-shift", "crew-attendance-by-shift",
    ),
    crewAttendancesByCrew: new TenantIndexedCollection<CrewAttendancesByCrewDoc>(
        "crew-attendances-by-crew", "crew-attendance-by-crew",
    ),
    crewMembers: new TenantIndexedMappingCollection<ICrew, Crew>(
        "crew-members", "crew-member", crewMapper,
    ),
    discounts: new MappingCollection<DiscountDoc, ReadonlyArray<Discount>>(
        "discounts", "discounts", discountMapper, true,
    ),
    events: new Collection<IEvent<any>>("events", "event"),
    reports: new TenantIndexedCollection<IReport>(
        "reports", "report",
    ), // TODO check if dates convert correctly (created and expires) for reports
    shiftPresets: new MappingCollection<
        { readonly presets: ReadonlyArray<IShiftPreset> },
        ReadonlyArray<Shift>
        >("shift-presets", "shift-presets", shiftPresetMapper, true),
    shifts: new TenantIndexedMappingCollection<IShift, Shift>(
        "shifts", "shift", shiftMapper,
    ),
    templates: new TenantIndexedCollection<ITemplate>(
        "templates", "template",
    ),
    tenants: new TenantIndexedCollection<ITenant>(
        "tenants", "tenant", true,
    ),
    users: new Collection<IUser>(
        "users", "user",
    ),
};
