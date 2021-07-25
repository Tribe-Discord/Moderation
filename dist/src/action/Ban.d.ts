import { Case, CaseModerator, CaseOffender } from "./Case";
export declare class Ban {
    case: Case;
    constructor(user: CaseOffender, mod: CaseModerator, reason: string);
    /**
     * Writes the ban to the db
     */
    save(): Promise<void>;
}
