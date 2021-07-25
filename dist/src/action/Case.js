"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _db_cache;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = exports.CaseType = void 0;
;
var CaseType;
(function (CaseType) {
    CaseType[CaseType["Unknown"] = -1] = "Unknown";
    CaseType[CaseType["Ban"] = 0] = "Ban";
    CaseType[CaseType["Mute"] = 1] = "Mute";
    CaseType[CaseType["Kick"] = 2] = "Kick";
    CaseType[CaseType["Warn"] = 3] = "Warn";
})(CaseType = exports.CaseType || (exports.CaseType = {}));
;
class Case {
    constructor(cache) {
        _db_cache.set(this, void 0);
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
                    duration: 10,
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
            };
        }
        __classPrivateFieldSet(this, _db_cache, cache);
    }
    /**
     * The case ID
     */
    get id() {
        return __classPrivateFieldGet(this, _db_cache).id || 0;
    }
    /**
     * The moderator that issued the punishment
     */
    get moderator() {
        return __classPrivateFieldGet(this, _db_cache).mod;
    }
    set moderator(mod) {
        __classPrivateFieldGet(this, _db_cache).mod = mod;
    }
    /**
     * The time this "action" or case occurred.
     */
    get time() {
        return new Date(__classPrivateFieldGet(this, _db_cache).details.time);
    }
    /**
     * The user that was banned, muted, or kicked
     */
    get offender() {
        return __classPrivateFieldGet(this, _db_cache).offender;
    }
    set offender(offender) {
        __classPrivateFieldGet(this, _db_cache).offender = offender;
    }
    /**
     * The reason for the punishment.
     */
    get reason() {
        return __classPrivateFieldGet(this, _db_cache).details.reason;
    }
    set reason(reason) {
        if (!__classPrivateFieldGet(this, _db_cache).details.reason_modified) {
            __classPrivateFieldGet(this, _db_cache).details.reason_modified = true;
        }
        __classPrivateFieldGet(this, _db_cache).details.reason = reason;
    }
    /**
     * The length of the moderation
     */
    get duration() {
        return __classPrivateFieldGet(this, _db_cache).details.duration;
    }
    /**
     * Archives the case, making
     */
    archive() {
        return new Promise((res, rej) => res(true)); // stfu TS for now
    }
}
exports.Case = Case;
_db_cache = new WeakMap();
