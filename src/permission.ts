import { flatMap, map } from 'lodash';

export interface IPermission {
    id: string;
    description: string;
}

export class Permission implements IPermission{
    public static readonly childRetrieve = { id: 'child:retrieve', description: 'Oplijsten van alle kinderen en individuele kinderen ophalen' };
    public static readonly childUpdate = { id: 'child:update', description:  'Gevegevens van kinderen aanpassen' };
    public static readonly childCreate = { id: 'child:create', description:  'Nieuwe kinderen aanmaken' };
    public static readonly childDelete = { id: 'child:delete', description:  'Kinderen verwijderen' };
    public static readonly childMerge = { id: 'child:merge', description:  'Kinderen samenvoegen' };

    public static readonly childAttendanceRetrieve = { id: 'child-attendance:retrieve', description: 'Oplijsten van aanwezigheden van kinderen' };
    public static readonly childAttendanceCreate = { id: 'child-attendance:create', description:  'Aanwezigheden van kinderen aanmaken' };
    public static readonly childAttendanceDelete = { id: 'child-attendance:delete', description: 'Aanwezigheden van kinderen verwijderen' };

    public static readonly crewAttendanceRetrieve = { id: 'crew-attendance:retrieve', description: 'Oplijsten van aanwezigheden van animatoren' };
    public static readonly crewAttendanceCreate = { id: 'crew-attendance:create', description: 'Aanwezigheden van animatoren aanmaken' };
    public static readonly crewAttendanceDelete = { id: 'crew-attendance:delete', description: 'Aanwezigheden van animatoren verwijderen' };

    public static readonly contactPersonRetrieve = { id: 'contactperson:retrieve', description: 'Oplijsten van alle contactpersonen en individuele contactpersonen ophalen' };
    public static readonly contactPersonUpdate = { id: 'contactperson:update', description:  'Gegevens van kinderen aanpassen' };
    public static readonly contactPersonCreate = { id: 'contactperson:create', description:  'Contactpersonen aanmaken' };
    public static readonly contactPersonDelete = { id: 'contactperson:delete', description:  'Contactpersonen verwijderen' };

    public static readonly crewRetrieve = { id: 'crew:retrieve', description: 'Oplijsten van alle animatoren en individuele animatoren ophalen' };
    public static readonly crewUpdate = { id: 'crew:update', description:  'Gevegevens van animatoren aanpassen' };
    public static readonly crewCreate = { id: 'crew:create', description:  'Animatoren aanmaken' };
    public static readonly crewDelete = { id: 'crew:delete', description:  'Animatoren verwijderen' };
    public static readonly crewMerge = { id: 'crew:merge', description:  'Animatoren samenvoegen' };

    public static readonly dayCreate = { id: 'day:create', description:  'Dagen aanmaken' };
    public static readonly dayRetrieve = { id: 'day:retrieve', description: 'Oplijsten van alle dagen en individuele dagen ophalen' };
    public static readonly dayUpdate = { id: 'day:update', description:  'Dagen aanpassen' };
    public static readonly dayDelete = { id: 'day:delete', description:  'Dagen verwijderen' };

    public static readonly exportChildren = { id: 'export:children', description:  'Een lijst exporteren van alle kinderen' };
    public static readonly exportCrew = { id: 'export:crew', description:  'Een lijst exporteren van alle animatoren' };
    public static readonly exportFiscalCert = { id: 'export:fiscalcert', description: 'Een lijst exporteren met data voor fiscale attesten' };
    public static readonly exportCrewCompensation = { id: 'export:crewpcomensation', description: 'Een lijst exporteren met wanneer animatoren aanwezig waren.' };
    public static readonly exportChildrenPerDay = { id: 'report:children-per-day', description: 'Een lijst exporteren met hoeveel kinderen er per dag aanwezig waren' };

    public static readonly listDatabases = { id: 'superuser:list-databases', description:  'Toon een lijst met alle databases' };

    public static readonly listTenants = { id: 'superuser:list-tenants', description:  'Toon alle organisaties' };
    public static readonly initTenantDbs = { id: 'superuser:init-dbs', description: 'Initialiseer de databases van een organisatie' };
    public static readonly syncTenantDb = { id: 'superuser:sync-db', description: 'Synchroniseer databases met een externe server' };
    public static readonly createTenant = { id: 'superuser:create-tenant', description:  'Nieuwe organisaties aanmaken' };

    public static readonly listAllConfig = { id: 'superuser:list-all-config', description:  'Alle configuratie oplijsten' };

    public static readonly initializeAllConfigDb = { id: 'superuser:init-config-db', description: 'De configuratiedatabase initialiseren' };

    public static readonly createConfig = { id: 'superuser:create-config', description: 'Nieuwe configuratiedocumenten voor gebruikers aanmaken en updaten' };

    public static readonly userRetrieve = { id: 'user:list', description:  'Alle gebruikers en hun gebruikersdata oplijsten' };

    public static readonly userPutTenantData = { id: 'users:put-data', description: 'Gebruikersdata voor de huidige organisatie aanmaken en aanpassen' };

    public static readonly userPutTenantDataAnyTenant = { id: 'users:put-data', description: 'Gebruikersdata voor een willekeurige organisatie aanmaken en aanpassen' };

    public static readonly auditLogAddEntry = { id: 'audit-log:add-entry', description: 'Data toevoegen aan het audit-logboek (wie wat heeft aangemaakt en opgevraagd};' };
    public static readonly auditLogRead = { id: 'audit-log:read', description: 'Data in het audit-logboek bekijken (wie wat heeft aangemaakt en opgevraagd};' };

    public static readonly ageGroupsRead = { id: 'age-groups:retrieve', description:  'Leeftijdsgroepen ophalen en bekijken' };
    public static readonly ageGroupsCreateAndUpdate = { id: 'age-groups:retrieve', description:  'Leeftijdsgroepen aanmaken en updaten' };

    public static readonly allByCategory: ReadonlyArray<{ category: string, permissions: ReadonlyArray<IPermission> }> = [
        {
            category: 'Kinderen',
            permissions: [ Permission.childRetrieve, Permission.childUpdate, Permission.childCreate, Permission.childDelete, Permission.childMerge, ],
        },
        {
            category: 'Aanwezigheden van kinderen',
            permissions: [ Permission.childAttendanceRetrieve, Permission.childAttendanceCreate, Permission.childAttendanceDelete, ],
        },
        {
            category: 'Aanwezigheden van animatoren',
            permissions: [ Permission.crewAttendanceRetrieve, Permission.crewAttendanceCreate, Permission.crewAttendanceDelete, ],
        },
        {
            category: 'Contactpersonen',
            permissions: [ Permission.contactPersonRetrieve, Permission.contactPersonUpdate, Permission.contactPersonCreate, Permission.contactPersonDelete, ],
        },
        {
            category: 'Animatoren',
            permissions: [ Permission.crewRetrieve, Permission.crewUpdate, Permission.crewCreate, Permission.crewDelete, Permission.crewMerge, ],
        },
        {
            category: 'Dagen',
            permissions: [ Permission.dayCreate, Permission.dayRetrieve, Permission.dayUpdate, Permission.dayDelete, ],
        },
        {
            category: 'Leeftijdsgroepen',
            permissions: [ Permission.ageGroupsRead, Permission.ageGroupsCreateAndUpdate, ],
        },
        {
            category: 'Exporteren van lijsten',
            permissions: [ Permission.exportChildren, Permission.exportCrew, Permission.exportFiscalCert, Permission.exportChildrenPerDay, Permission.exportCrewCompensation ],
        },
        {
            category: 'Platformbeheer',
            permissions: [ Permission.listDatabases, Permission.listTenants, Permission.initTenantDbs, Permission.syncTenantDb, Permission.createTenant,
                Permission.listAllConfig, Permission.initializeAllConfigDb, Permission.createConfig, Permission.userPutTenantDataAnyTenant ],
        },
        {
            category: 'Gebruikers',
            permissions: [ Permission.userRetrieve, Permission.userPutTenantData, ],
        },
        {
            category: 'Audit logboek',
            permissions: [ Permission.auditLogAddEntry, Permission.auditLogRead, ],
        },
    ];

    public static readonly all: ReadonlyArray<IPermission> = flatMap(map(Permission.allByCategory, x => x.permissions));

    constructor(
        public readonly id: string,
        public readonly description: string,
    ) {
    }
}
