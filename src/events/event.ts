/**
 * Identifiers of objects an event relates to
 */
export interface IEventContext {
    readonly documentId?: string;

    readonly childId?: string;
    readonly crewId?: string;
    readonly shiftId?: string;
    readonly contactPersonId?: string;

    /**
     * User that caused or initiated this event
     */
    readonly uid?: string;

    readonly tenant: string | "global";
}

export type FirestoreAuthType = "ADMIN" | "USER" | "UNAUTHENTICATED";

export interface IEvent<T> {
    readonly name: string;

    /**
     * Milliseconds since the epoch
     */
    readonly timestamp: number;

    readonly type: "updated" | "created" | "deleted";

    readonly resource: "firestore" | "auth";

    readonly firestore?: {
        readonly collectionId: string,
        readonly documentId: string,
        readonly before?: T,
        readonly after?: T,
        readonly authType: FirestoreAuthType,
    };

    readonly context: IEventContext;
}
