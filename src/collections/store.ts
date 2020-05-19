import {
  childMapper,
  contactPersonMapper,
  crewMapper,
  shiftMapper,
} from "../mappers/mappers";
import { Child, IChild } from "../models/child";
import { ContactPerson, IContactPerson } from "../models/contact-person";
import { Crew, ICrew } from "../models/crew";
import {
  IDetailedChildAttendance,
  IDetailedCrewAttendance,
} from "../models/detailed-attendance";
import { IReport } from "../models/report";
import { IShift, Shift } from "../models/shift";
import { ITemplate } from "../models/template";
import { ITenant } from "../models/tenant";
import { IUser } from "../models/user";
import {
  Collection,
  MappingCollection,
  TenantIndexedCollection,
  TenantIndexedMappingCollection,
} from "./collection";

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
  readonly attendances: { readonly [crewId: string]: IDetailedCrewAttendance };
}

export interface CrewAttendancesByCrewDoc {
  readonly attendances: { readonly [shiftId: string]: IDetailedCrewAttendance };
}

/**
 * Models Firestore contents with types
 */
export const store = {
  childAttendanceAdd: new TenantIndexedCollection<ChildAttendanceAddDoc>(
    "child-attendances-add",
    "child-attendance-add",
  ),
  childAttendanceDelete: new TenantIndexedCollection<ChildAttendanceDeleteDoc>(
    "child-attendances-delete",
    "child-attendance-delete",
  ),
  childAttendancesByChild: new TenantIndexedCollection<
    ChildAttendancesByChildDoc
  >("child-attendances-by-child", "child-attendance-by-child"),
  childAttendancesByShift: new TenantIndexedCollection<
    ChildAttendancesByShiftDoc
  >("child-attendances-by-shift", "child-attendance-by-shift"),
  children: new TenantIndexedMappingCollection<IChild, Child>(
    "children",
    "child",
    childMapper,
  ),
  contactPeople: new TenantIndexedMappingCollection<
    IContactPerson,
    ContactPerson
  >("contact-people", "contact-person", contactPersonMapper),
  crewAttendancesAdd: new TenantIndexedCollection<CrewAttendanceAddDoc>(
    "crew-attendances-add",
    "crew-attendance-add",
  ),
  crewAttendancesDelete: new TenantIndexedCollection<CrewAttendanceDeleteDoc>(
    "crew-attendances-delete",
    "crew-attendance-delete",
  ),
  crewAttendancesByShift: new TenantIndexedCollection<
    CrewAttendancesByShiftDoc
  >("crew-attendances-by-shift", "crew-attendance-by-shift"),
  crewAttendancesByCrew: new TenantIndexedCollection<CrewAttendancesByCrewDoc>(
    "crew-attendances-by-crew",
    "crew-attendance-by-crew",
  ),
  crewMembers: new TenantIndexedMappingCollection<ICrew, Crew>(
    "crew-members",
    "crew-member",
    crewMapper,
  ),
  // TODO check if dates convert correctly (created and expires) for reports
  reports: new TenantIndexedCollection<IReport>("reports", "report"),
  shifts: new TenantIndexedMappingCollection<IShift, Shift>(
    "shifts",
    "shift",
    shiftMapper,
  ),
  templates: new TenantIndexedCollection<ITemplate>("templates", "template"),
  tenants: new TenantIndexedCollection<ITenant>("tenants", "tenant", true),
  users: new Collection<IUser>("users", "user"),
};
