/**
 * Extra information about the logged action
 */
export interface IAuditLogData {
    readonly childId?: string,
    readonly childRetiredId?: string,
    readonly childAbsorbedIntoId?: string,
    readonly dayId?: string,    readonly contactPersonId?: string,
    readonly crewId?: string,
    readonly tenantName?: string,
    readonly year?: number,
    readonly userId?: string,
}

/**
 * An entry in the audit log. The audit log system helps to see which crew members took certain actions
 *
 * @param receivedTimestamp Time on which this entry was received by the backend. Seconds since epoch.
 * @param timestamp Time on which the event happened. Seconds since epoch.
 * @param triggeredBy Information about who triggered the event
 * @param eventId Id of the event (= permission id, e.g. "child:retrieve")
 * @param data Other data relevant to the event
 * @param loggedBy By which system the event was logged ("frontend", "backend", ...)
 */
export interface IAuditLogEntry {
    readonly receivedTimestamp: number,
    readonly timestamp: number,
    readonly triggeredBy: {
        name?: string, // first and last name of crew name
        id?: string, // id of the crew member
        tenantId: string, // organisation the crew member belongs to
        jwt: string, // JSON web token used to submit audit log entry
    },
    readonly eventId: string,
    readonly data: IAuditLogData,
    readonly loggedBy: string
}
