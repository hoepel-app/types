export interface IAppMetadata {
    tenants: ReadonlyArray<{
        name: string,
        roles: ReadonlyArray<string>,
        permissions: ReadonlyArray<string>,
    }>;
}
