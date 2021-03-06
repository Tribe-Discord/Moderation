import { ModDb } from "tribe_database";

/**
 * The raw type recieved from the Database
 */
export interface CaseRaw {
     id: number;
     type: CaseType,
     details: {
          active: boolean;
          time: number;
          reason: string;
          reason_modified: boolean;
          // duration is set in seconds relative to the time
          duration: number;
          persist: boolean;
     };
     mod: CaseModerator;
     offender: CaseOffender;
}

export interface CaseUser {
     id: string;
     username: string;
};

export type CaseModerator = CaseUser & {
     role: string
};

export type CaseOffender = CaseUser & {
     persist: boolean;
}

export enum CaseType {
     Unknown = -1,
     Ban,
     Mute,
     Kick,
     Warn,
};

export class Case {
     #db_cache: CaseRaw;

     public constructor(cache?: CaseRaw) {
          if (!cache) {
               cache = {
                    // to do, calculate the id from db
                    id: 0,
                    type: CaseType.Unknown,
                    details: {
                         active: true,
                         time: Date.now(),
                         reason: "No reason provided",
                         reason_modified: false,
                         duration: -1,
                         persist: true
                    },
                    mod: {
                         username: "Clyde",
                         id: "0",
                         role: "Administrator"
                    },
                    offender: {
                         username: "Clyde",
                         id: "0",
                         persist: true
                    }
               }
          }
          this.#db_cache = cache as CaseRaw;
     }

     /**
      * The case ID
      */
     public get id(): number {
          return this.#db_cache.id || 0;
     }

     /**
      * The moderator that issued the punishment
      */
     public get moderator(): CaseModerator {
          return this.#db_cache.mod;
     }

     public set moderator(mod: CaseModerator) {
          this.#db_cache.mod = mod;
     }

     /**
      * The type of the case, Ban, Mute, Kick, Etc
      */
     public get type(): CaseType {
          return this.#db_cache.type;
     }

     public set type(type: CaseType) {
          this.#db_cache.type = type;
     }

     /**
      * The time this "action" or case occurred (a date.now()).
      */
     public get time(): Date {
          return new Date(this.#db_cache.details.time);
     }

     /**
      * The user that was banned, muted, or kicked
      */
     public get offender(): CaseOffender {
          return this.#db_cache.offender;
     }

     public set offender(offender: CaseOffender) {
          this.#db_cache.offender = offender;
     }

     /**
      * The reason for the punishment.
      */
     public get reason(): string {
          return this.#db_cache.details.reason;
     }

     public set reason(reason: string) {
          if (!this.#db_cache.details.reason_modified) {
               this.#db_cache.details.reason_modified = true;
          }
          this.#db_cache.details.reason = reason;
     }

     /**
      * The length of the moderation
      */
     public get duration(): number {
          return this.#db_cache.details.duration;
     }

     /**
      * Gets the raw data of the given case.
      */
     public get raw(): CaseRaw {
          return Object.assign({}, this.#db_cache);
     }

     /**
      * Archives the case, making
      */
     public archive(): Promise<boolean> {
          return new Promise((res, rej) => res(true)); // stfu TS for now
     }

     /**
      * Saves a case to the moderation database.
      * Creates it, if it doesn't exist.
      */
     public async save(): Promise<boolean> {
          try {
               // @ts-ignore
               if (!await ModDb.updateCase(this)) {
                    // @ts-ignore
                    return await ModDb.createCase(this);
               }
               return true;
          } catch {
               return false;
          }
     }
}