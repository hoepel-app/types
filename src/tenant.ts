export interface Tenant {
    readonly id?: string;
    readonly name: string;

    /**
     * General email address for this tenant
     *
     * E.g. info@organisation.org
     */
    readonly email?: string;

    /**
     * Mail address for this organisation - not necessarily the address of the organisation itself
     */
    readonly address: {
        readonly streetAndNumber?: string;
        readonly zipCode?: string;
        readonly city?: string;
    };

    /**
     * The contact person for this organisation
     */
    readonly contactPerson: {
        readonly name?: string;
        readonly phone?: string;
        readonly email?: string;
    };

}
