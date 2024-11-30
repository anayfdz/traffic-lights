export class OtpM {
  private _id: number;
  private _user_id: number;
  private _otp_code: string;
  private _expires_At: Date;
  private _created_At: Date;

  constructor(id: number, user_id: number, otp_code: string, expires_At: Date, created_At?: Date) {
    this._id = id;
    this._user_id = user_id;
    this._otp_code = otp_code;
    this._expires_At = expires_At;
    this._created_At = created_At || new Date();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get user_id(): number {
    return this._user_id;
  }

  get otp_code(): string {
    return this._otp_code;
  }

  get expires_At(): Date {
    return this._expires_At;
  }

  get created_At(): Date {
    return this._created_At;
  }
  // setters
  set otp_code(value: string) {
    this._otp_code = value;
  }
}
