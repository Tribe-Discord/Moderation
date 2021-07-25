"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ban = void 0;
const Case_1 = require("./Case");
require("tribe_database");
class Ban {
    constructor(user, mod, reason) {
        this.case = new Case_1.Case();
        this.case.offender = user;
        this.case.moderator = mod;
        this.case.reason = reason;
    }
    /**
     * Writes the ban to the db
     */
    async save() {
    }
}
exports.Ban = Ban;
