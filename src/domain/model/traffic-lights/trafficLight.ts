import { ReportM } from "../reports/report";

export type Location = {
  latitude: number;
  longitude: number;
};

export class TrafficLightM {
  private _id: number;
  private _latitude: number;
  private _longitude: number;
  private _type: string;
  private _department: string;
  private _province: string;
  private _district: string;
  private _location: Location;
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
    location: Location,
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
    this._location = location;
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
  get latitude(): number {
    return this._latitude;
  }
  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }
  set longitude(value: number) {
    this._longitude = value;
  }
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  get department(): string {
    return this._department;
  }
  set department(value: string) {
    this._department = value;
  }
  get province(): string {
    return this._province;
  }
  set province(value: string) {
    this._province = value;
  }
  get district(): string {
    return this._district;
  }

  set district(value: string) {
    this._district = value;
  }

  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
  get reports(): ReportM[] {
    return this._reports;
  }
  set reports(value: ReportM[]) {
    this._reports = value;
  }
}
