import { values, flatMap, head } from 'lodash';
import { IPermission, Permission } from './permission';

export interface IRole {
    id: string;
    description: string;
    longerDescription: string;
    impliedPermissions: ReadonlyArray<IPermission>
}

export class Role implements IRole {
    public static readonly crewRole: IRole = {
        id: 'animator',
        description: 'Animator: Laat toe om de basis te doen',
        longerDescription: 'Nieuwe kinderen aanmaken en weergeven, contactpersonen beheren, kinderen, inschrijven...',
        impliedPermissions: [
            Permission.childRetrieve,
            Permission.childUpdate,
            Permission.childCreate,
            Permission.childDelete,
            Permission.childMerge,
            Permission.childAttendanceRetrieve,
            Permission.childAttendanceCreate,
            Permission.childAttendanceDelete,
            Permission.crewAttendanceRetrieve,
            Permission.crewAttendanceCreate,
            Permission.crewAttendanceDelete,
            Permission.contactPersonRetrieve,
            Permission.contactPersonUpdate,
            Permission.contactPersonCreate,
            Permission.contactPersonDelete,
            Permission.crewRetrieve,
            Permission.dayCreate,
            Permission.dayRetrieve,
            Permission.dayUpdate,
            Permission.dayDelete,
            Permission.ageGroupsRead,
            Permission.exportChildren,
            Permission.exportCrew,
            Permission.exportFiscalCert,
            Permission.exportChildrenPerDay,
            Permission.exportCrewCompensation,
            Permission.auditLogAddEntry,
            Permission.exportCrewAttandence,
            Permission.exportChildAttendance,
        ]
    };

    public static readonly leaderCrewRole: IRole = {
        id: 'hoofdanimator',
        description: 'Hoofdanimator/verantwoordelijk: Animator + Laat toe om animatoren te beheren',
        longerDescription: 'Naast wat een animator kan, kan een hoofdanimator ook nieuwe animatoren aanmaken en bewerken',
        impliedPermissions: [
            ...Role.crewRole.impliedPermissions,
            Permission.crewUpdate,
            Permission.crewCreate,
            Permission.crewDelete,
            Permission.crewMerge,
            Permission.ageGroupsCreateAndUpdate,
            Permission.auditLogRead,
        ]
    };

    public static readonly superuserRole: IRole = {
        id: 'superuser',
        description: 'Platformadministratie',
        longerDescription: 'Deze rol laat toe om nieuwe organisaties aan te maken en platformconfiguratie aan te maken',
        impliedPermissions: Permission.all
    };

    public static readonly all = {
        global: [ Role.superuserRole ],
        organisation: [ Role.crewRole, Role.leaderCrewRole ],
    };

    public static readonly allFlat = flatMap(values(Role.all));

    public static parseRoleName(roleId: string): IRole | null {
        return head(Role.allFlat.filter(role => role.id === roleId)) || null;
    }

    constructor(
        public readonly description: string,
        public readonly id: string,
        public readonly impliedPermissions: ReadonlyArray<IPermission>,
        public readonly longerDescription: string) {

    }
}
