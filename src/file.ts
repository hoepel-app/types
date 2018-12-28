export type FileType = "all-children"
    | "all-crew"
    | "children-with-comment"
    | "fiscal-certificates-list"
    | "crew-attendances"
    | "child-attendances"
    | "child-health-insurance-certificate"
    | "child-fiscal-certificate";

export interface FileRequestMetadata {
    format: "PDF" | "XLSX" | "DOCX";
    tenant: string;

    year?: number;
}
