import { Case, CaseModerator, CaseOffender, CaseUser } from "./Case";

export class Ban {
     public case: Case;

     public constructor(user: CaseOffender, mod: CaseModerator, reason: string) {
          this.case = new Case();
          this.case.offender = user;
          this.case.moderator = mod;
          this.case.reason = reason;
     }

     /**
      * Writes the ban to the db
      */
     public save() {

     }
}