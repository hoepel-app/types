export class IncorrectTenantError extends Error {
    constructor(
        readonly expectedTenant: string,
        readonly foundTenant: string,
        readonly collectionName: string,
        readonly documentId?: string,
    ) {
        super(
            `Unexpected tenant: expected tenant ${expectedTenant} but got tenant ${foundTenant} while ` +
            `requesting document ${documentId} in collection ${collectionName}`,
        );

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
