"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserM = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["super_admin"] = "super_admin";
    Roles["admin"] = "admin";
})(Roles = exports.Roles || (exports.Roles = {}));
class AdminUserM {
    constructor(id, name, last_name, email, password, role, created_at, updated_at) {
        this._id = id;
        this._name = name;
        this._last_name = last_name;
        this._email = email;
        this._password = password;
        this._role = role;
        this._created_at = created_at || new Date();
        this._updated_at = updated_at || new Date();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get last_name() {
        return this._last_name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    set role(value) {
        this._role = value;
    }
    set email(value) {
        this._email = value;
    }
}
exports.AdminUserM = AdminUserM;
//# sourceMappingURL=adminUser.js.map