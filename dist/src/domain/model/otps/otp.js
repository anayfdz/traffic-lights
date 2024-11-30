"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpM = void 0;
class OtpM {
    constructor(id, user_id, otp_code, expires_At, created_At) {
        this._id = id;
        this._user_id = user_id;
        this._otp_code = otp_code;
        this._expires_At = expires_At;
        this._created_At = created_At || new Date();
    }
    get id() {
        return this._id;
    }
    get user_id() {
        return this._user_id;
    }
    get otp_code() {
        return this._otp_code;
    }
    get expires_At() {
        return this._expires_At;
    }
    get created_At() {
        return this._created_At;
    }
    set otp_code(value) {
        this._otp_code = value;
    }
}
exports.OtpM = OtpM;
//# sourceMappingURL=otp.js.map