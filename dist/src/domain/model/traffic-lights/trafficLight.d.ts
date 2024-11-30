import { ReportM } from "../reports/report";
export declare class TrafficLightM {
    private _id;
    private _latitude;
    private _longitude;
    private _type;
    private _department;
    private _province;
    private _district;
    private _createdAt;
    private _updatedAt;
    private _reports;
    constructor(id: number, latitude: number, longitude: number, type: string, department: string, province: string, district: string, createdAt?: Date, updatedAt?: Date, reports?: ReportM[]);
    get id(): number;
    set id(value: number);
}
