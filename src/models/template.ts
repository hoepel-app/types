export interface ITemplate {
    readonly created: Date;
    readonly createdBy: string;
    readonly fileName: string;
    readonly displayName: string;
    readonly type: "child-fiscal-certificate" | "child-health-insurance-certificate" | "child-invoice";
}
