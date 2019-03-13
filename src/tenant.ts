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

    /**
     * A short, public-facing description of the playground
     */
    readonly description: string;

    /**
     * Url of the logo of the playground. Suggested 300x300 px or bigger
     */
    readonly logoUrl?: string;

    /**
     * Url of a smaller version of the logo of the playground. 70x70 px.
     */
    readonly logoSmallUrl?: string;

    /**
     * A link to the privacy policy of the playground
     */
    readonly privacyPolicyUrl?: string;
}
