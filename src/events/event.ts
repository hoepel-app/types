/**
 * Identifiers of objects an event relates to
 */
export interface IEventContext {
    readonly documentId?: string;

    readonly childId?: string;
    readonly crewId?: string;
    readonly shiftId?: string;

    /**
     * User that caused or initiated this event
     */
    readonly uid?: string;

    readonly tenant: string | "global";
}

export interface FirestoreTimes {
    /**
     * The time the document was created. Not set for documents that don't
     * exist. In ms since epoch.
     */
    readonly createTime?: number;

    /**
     * The time the document was last updated (at the time the snapshot was
     * generated). Not set for documents that don't exist.
     * In ms since epoch.
     */
    readonly updateTime?: number; // in ms since epoch

    /**
     * The time this snapshot was read in ms since epoch.
     */
    readonly readTime: number;
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
        readonly times: FirestoreTimes;
    };

    readonly context: IEventContext;
}
