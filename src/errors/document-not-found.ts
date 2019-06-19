export class DocumentNotFoundError extends Error {
    constructor(
        readonly documentId: string,
        readonly collectionName: string,
    ) {
        super(`Document not found: id ${documentId} in collection ${collectionName}`);

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
