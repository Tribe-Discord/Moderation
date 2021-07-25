import { Case, CaseModerator, CaseOffender, CaseUser } from "../mod";
import { ModDb } from 'tribe_database';
import { CaseType } from "./Case";

export class Ban {
     public case: Case;

     public constructor(user: CaseOffender, mod: CaseModerator, reason: string) {
          this.case = new Case();
          this.case.type = CaseType.Ban;
          this.case.offender = user;
          this.case.moderator = mod;
          this.case.reason = reason;
     }

     /**
      * Writes the ban to the db
      */
     public async save(): Promise<boolean> {
          return this.case.save();
     }

     public get reason(): string {
          return this.case.reason;
     }

     public set reason(reason: string) {
          this.case.reason = reason;
     }

     public get offender(): CaseOffender {
          return this.case.offender;
     }

     public set offender(user: CaseOffender) {
          this.case.offender = user;
     }

     public get moderator(): CaseModerator {
          return this.case.moderator;
     }

     public set moderator(user: CaseModerator) {
          this.case.moderator = user;
     }
}