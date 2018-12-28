import { IDayDate } from "./day-date";

export interface IAgeGroup {
    readonly name: string;
    readonly bornOnOrAfter: IDayDate;
    readonly bornOnOrBefore: IDayDate;
}

export class AgeGroup implements IAgeGroup {
    readonly name: string;
    readonly bornOnOrAfter: IDayDate;
    readonly bornOnOrBefore: IDayDate;

    constructor(ageGroup: IAgeGroup) {
        this.name = ageGroup.name;
        this.bornOnOrAfter = ageGroup.bornOnOrAfter;
        this.bornOnOrBefore = ageGroup.bornOnOrBefore;
    }
}
