export interface ICrewCertificates {
    /**
     * Has certificate "Animator in het jeugdwerk"
     */
    readonly hasPlayworkerCertificate: boolean;

    /**
     * Has certificate "Hoofdanimator in het jeugdwerk"
     */
    readonly hasTeamleaderCertificate: boolean;

    /**
     * Has certificate "Instructeur in het jeugdwerk"
     */
    readonly hasTrainerCertificate: boolean;
}

export class CrewCertificates implements ICrewCertificates {
    readonly hasPlayworkerCertificate: boolean;
    readonly hasTeamleaderCertificate: boolean;
    readonly hasTrainerCertificate: boolean;

    constructor(obj: ICrewCertificates) {
        this.hasPlayworkerCertificate = obj.hasPlayworkerCertificate || false;
        this.hasTeamleaderCertificate = obj.hasTeamleaderCertificate || false;
        this.hasTrainerCertificate = obj.hasTrainerCertificate || false;
    }
}
