"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficLightM = void 0;
class TrafficLightM {
    constructor(id, latitude, longitude, type, department, province, district, createdAt = new Date(), updatedAt = new Date(), reports = []) {
        this._id = id;
        this._latitude = latitude;
        this._longitude = longitude;
        this._type = type;
        this._department = department;
        this._province = province;
        this._district = district;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._reports = reports;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
}
exports.TrafficLightM = TrafficLightM;
//# sourceMappingURL=trafficLight.js.map