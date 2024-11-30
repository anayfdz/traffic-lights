import { OtpM } from '../otps/otp';
import { ReportM } from '../reports/report';

export interface UserWithoutPassword {
  id: number;
  name: string;
  lastName: string;
  email: string;
  nickname: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  reports: ReportM[];
  otps: OtpM;
}

export class UserM {
  private _id: number;
  private _name: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _nickname: string;
  private _status: string;
  private _created_at: Date;
  private _updated_at: Date;
  private _reports: ReportM[];
  private _otps: OtpM[];

  constructor(
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    nickname: string,
    status: string = 'pending_validation',
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    reports: ReportM[] = [],
    otps: OtpM[] = [],
  ) {
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

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get lastName(): string {
    return this._lastName;
  }
  set lastName(value: string) {
    this._lastName = value;
  }
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    this._password = value;
  }
  get nickname(): string {
    return this._nickname;
  }
  set nickname(value: string) {
    this._nickname = value;
  }
  get status(): string {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }
  get createdAt(): Date {
    return this._created_at;
  }
  set createdAt(value: Date) {
    this._created_at = value;
  }
  get updatedAt(): Date {
    return this._updated_at;
  }
  set updatedAt(value: Date) {
    this._updated_at = value;
  }
  get reports(): ReportM[] {
    return this._reports;
  }
  set reports(value: ReportM[]) {
    this._reports = value;
  }
  get otps(): OtpM[] {
    return this._otps;
  }
  set otps(value: OtpM[]) {
    this._otps = value;
  }
}
