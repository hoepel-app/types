export type FileType = 'all-children'
    | 'all-crew'
    | 'children-with-comment'
    | 'fiscal-certificates-list'
    | 'crew-attendances';

export interface FileRequestMetadata {
    format: 'PDF' | 'XLSX';
    tenant: string;

    year?: number;
}
