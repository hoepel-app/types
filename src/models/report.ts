import { FileType } from "../value-objects/file";

export interface IReport {
    readonly refPath: string;
    readonly description: string;
    readonly expires: Date;
    readonly created: Date;
    readonly format: "XLSX" | "PDF" | "DOCX";
    readonly createdBy?: string;
    readonly createdByUid: string;
    readonly type: FileType;
    // TODO this type could store context, like child id, input data, ...
}
