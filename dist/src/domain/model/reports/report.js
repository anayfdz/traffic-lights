"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportM = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Funcionando"] = "funcionando";
    Status["Da\u00F1ado"] = "da\u00F1ado";
    Status["Intermitente"] = "intermitente";
})(Status = exports.Status || (exports.Status = {}));
class ReportM {
    constructor(id, user, trafficLight, description, status, comments, reported_at, created_at = new Date(), updated_at = new Date(), evidences = []) {
        this._id = id;
        this._user = user;
        this._trafficLight = trafficLight;
        this._description = description;
        this._status = status;
        this._comments = comments;
        this._reported_at = reported_at;
        this._created_at = created_at;
        this._updated_at = updated_at;
        this._evidences = evidences;
    }
    get id() {
        return this._id;
    }
    get user() {
        return this._user;
    }
    get trafficLight() {
        return this._trafficLight;
    }
    set id(value) {
        this._id = value;
    }
}
exports.ReportM = ReportM;
//# sourceMappingURL=report.js.map