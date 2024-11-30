"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserM = void 0;
class UserM {
    constructor(id, name, lastName, email, password, nickname, status = 'pending_validation', created_at = new Date(), updated_at = new Date(), reports = [], otps = []) {
        this._id = id;
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
        this._nickname = nickname;
        this._status = status;
        this._created_at = created_at;
        this._updated_at = updated_at;
        this._reports = reports;
        this._otps = otps;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get nickname() {
        return this._nickname;
    }
    set nickname(value) {
        this._nickname = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get createdAt() {
        return this._created_at;
    }
    set createdAt(value) {
        this._created_at = value;
    }
    get updatedAt() {
        return this._updated_at;
    }
    set updatedAt(value) {
        this._updated_at = value;
    }
    get reports() {
        return this._reports;
    }
    set reports(value) {
        this._reports = value;
    }
    get otps() {
        return this._otps;
    }
    set otps(value) {
        this._otps = value;
    }
}
exports.UserM = UserM;
//# sourceMappingURL=user.js.map