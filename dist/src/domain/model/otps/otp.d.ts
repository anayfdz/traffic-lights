export declare class OtpM {
    private _id;
    private _user_id;
    private _otp_code;
    private _expires_At;
    private _created_At;
    constructor(id: number, user_id: number, otp_code: string, expires_At: Date, created_At?: Date);
    get id(): number;
    get user_id(): number;
    get otp_code(): string;
    get expires_At(): Date;
    get created_At(): Date;
    set otp_code(value: string);
}
