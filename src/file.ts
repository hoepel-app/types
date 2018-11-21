export type FileType = 'all-children'
    | 'all-crew'
    | 'children-with-comment'
    | 'fiscal-certificates-list'
    | 'crew-attendances';

export interface FileMetadata {
    format: 'PDF' | 'XLSX';
    tenant: string;
    createdBy: string;

    year?: string;
}
