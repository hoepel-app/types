/**
 * A physical street address
 */
export interface IAddress {
    /**
     * The street component of the address, e.g. 'Baker Street'
     */
    street?: string;
    /**
     * The house number, e.g. '12A'
     */
    number?: string;
    /**
     * The zip code of the city, e.g. '1200'
     * @TJS-type integer
     */
    zipCode?: number;
    /**
     * The city, e.g. 'Brussels'
     */
    city?: string;
}
