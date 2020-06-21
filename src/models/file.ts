export type FileType = "all-children"
    | "all-crew"
    | "children-with-comment"
    | "fiscal-certificates-list"
    | "crew-attendances"
    | "child-attendances"
    | "child-health-insurance-certificate"
    | "child-fiscal-certificate"
    | "child-invoice"
    | "children-per-day"
    | "bubble-assignments"
    | "child-attendance-intentions"
    | "day-overview";

export interface FileRequestMetadata {
    readonly format: "PDF" | "XLSX" | "DOCX";

    readonly year?: number;
}
