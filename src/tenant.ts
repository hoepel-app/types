export interface Tenant {
    id?: string;
    name: string;

    /**
     * General email address for this tenant
     *
     * E.g. info@organisation.org
     */
    email?: string;

    /**
     * Mail address for this organisation - not necessarily the address of the organisation itself
     */
    address: {
        streetAndNumber?: string;
        zipCode?: string;
        city?: string;
    };

    /**
     * The contact person for this organisation
     */
    contactPerson: {
        name?: string;
        phone?: string;
        email?: string;
    }

}
