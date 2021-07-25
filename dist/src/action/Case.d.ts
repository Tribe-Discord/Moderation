/**
 * The raw type recieved from the Database
 */
export interface CaseRaw {
    id: number;
    type: CaseType;
    details: {
        active: boolean;
        time: number;
        reason: string;
        reason_modified: boolean;
        duration: number;
        persist: boolean;
    };
    mod: CaseModerator;
    offender: CaseOffender;
}
export interface CaseUser {
    id: string;
    username: string;
}
export declare type CaseModerator = CaseUser & {
    role: string;
};
export declare type CaseOffender = CaseUser & {
    persist: boolean;
};
export declare enum CaseType {
    Unknown = -1,
    Ban = 0,
    Mute = 1,
    Kick = 2,
    Warn = 3
}
export declare class Case {
    #private;
    constructor(cache?: CaseRaw);
    /**
     * The case ID
     */
    get id(): number;
    /**
     * The moderator that issued the punishment
     */
    get moderator(): CaseModerator;
    set moderator(mod: CaseModerator);
    /**
     * The time this "action" or case occurred.
     */
    get time(): Date;
    /**
     * The user that was banned, muted, or kicked
     */
    get offender(): CaseOffender;
    set offender(offender: CaseOffender);
    /**
     * The reason for the punishment.
     */
    get reason(): string;
    set reason(reason: string);
    /**
     * The length of the moderation
     */
    get duration(): number;
    /**
     * Archives the case, making
     */
    archive(): Promise<boolean>;
}
