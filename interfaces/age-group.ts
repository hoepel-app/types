import { IDayDate } from './day-date';

export interface IAgeGroup {
    name: string;
    bornOnOrAfter: IDayDate;
    bornOnOrBefore: IDayDate;
}

export class AgeGroup implements IAgeGroup {
    public readonly name: string;
    public readonly bornOnOrAfter: IDayDate;
    public readonly bornOnOrBefore: IDayDate;

    constructor(ageGroup: IAgeGroup) {
        this.name = ageGroup.name;
        this.bornOnOrAfter = ageGroup.bornOnOrAfter;
        this.bornOnOrBefore = ageGroup.bornOnOrBefore;
    }
}
