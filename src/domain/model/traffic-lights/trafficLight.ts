import { ReportM } from "../reports/report";

export class TrafficLightM {
  private _id: number;
  private _latitude: number;
  private _longitude: number;
  private _type: string;
  private _department: string;
  private _province: string;
  private _district: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _reports: ReportM[];

  constructor(
    id: number,
    latitude: number,
    longitude: number,
    type: string,
    department: string,
    province: string,
    district: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    reports: ReportM[] = []
  ) {
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

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

}
