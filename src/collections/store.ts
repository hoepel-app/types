import {
    ageGroupMapper,
    childMapper,
    contactPersonMapper,
    crewMapper,
    discountMapper, shiftMapper, shiftPresetMapper,
} from "../mappers/mappers";
import { AgeGroup, IAgeGroup } from "../models/age-group";
import { Child, IChild } from "../models/child";
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
    readonly attendances: { readonly [ childId: string ]: IDetailedChildAttendance };
}

export interface ChildAttendancesByChildDoc {
    readonly attendances: { readonly [ shiftId: string ]: IDetailedChildAttendance };
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
    readonly attendances: { readonly [ childId: string ]: IDetailedCrewAttendance };
}

export interface CrewAttendancesByCrewDoc {
    readonly attendances: { readonly [ shiftId: string ]: IDetailedCrewAttendance };
}

export interface DiscountDoc {
    readonly discounts: ReadonlyArray<IDiscount>;
}

/**
 * Models Firestore contents with types
 */
export const store = {
    ageGroups: new MappingCollection<IAgeGroup, AgeGroup>("age-groups", ageGroupMapper),
    childAttendanceAdd: new TenantIndexedCollection<ChildAttendanceAddDoc>("child-attendance-add"),
    childAttendanceDelete: new TenantIndexedCollection<ChildAttendanceDeleteDoc>("child-attendance-delete"),
    childAttendancesByChild: new TenantIndexedCollection<ChildAttendancesByChildDoc>("child-attendances-by-child"),
    childAttendancesByShift: new TenantIndexedCollection<ChildAttendancesByShiftDoc>("child-attendances-by-shift"),
    children: new TenantIndexedMappingCollection<IChild, Child>("children", childMapper),
    contactPeople: new TenantIndexedMappingCollection<IContactPerson, ContactPerson>("contact-people", contactPersonMapper),
    crewAttendancesAdd: new TenantIndexedCollection<CrewAttendanceAddDoc>("crew-attendances-add"),
    crewAttendancesDelete: new TenantIndexedCollection<CrewAttendanceDeleteDoc>("crew-attendances-delete"),
    crewAttendancesByShift: new TenantIndexedCollection<CrewAttendancesByShiftDoc>("crew-attendances-by-shift"),
    crewAttendancesByCrew: new TenantIndexedCollection<CrewAttendancesByCrewDoc>("crew-attendances-by-crew"),
    crewMembers: new TenantIndexedMappingCollection<ICrew, Crew>("crew-members", crewMapper),
    discounts: new MappingCollection<DiscountDoc, ReadonlyArray<Discount>>("discounts", discountMapper),
    reports: new TenantIndexedCollection<IReport>("reports"), // TODO check if dates convert correctly (created and expires) for reports
    shiftPresets: new MappingCollection<
        { readonly presets: ReadonlyArray<IShiftPreset> },
        ReadonlyArray<Shift>
        >("shift-presets", shiftPresetMapper),
    shifts: new TenantIndexedMappingCollection<IShift, Shift>("shifts", shiftMapper),
    templates: new TenantIndexedCollection<ITemplate>("templates"),
    tenants: new TenantIndexedCollection<ITenant>("tenants"),
    users: new Collection<IUser>("users"),
};

/**
 * Collections that use a tenant name as the id for documents
 */
export const collectionsIndexedByTenant: ReadonlyArray<Collection> = [
    store.ageGroups,
    store.discounts,
    store.shiftPresets,
    store.tenants,
];
