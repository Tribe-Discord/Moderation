export interface TimeMap {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    years: number;
    weeks: number;
}
export declare class ActionTime {
    #private;
    /**
     * @param length - The length of time, either a string resolvable or a number which represents minutes.
     */
    constructor(length: string | number);
    private fromString;
    private fromSeconds;
    /**
     * Converts a crazy map to a good calculated map
     * eg: "90 seconds" would be converted to: "1 minute 30 seconds"
     */
    private sanitize;
    /**
     * Converts a timemap to all seconds values
     */
    private messy;
    get readableString(): string;
}
