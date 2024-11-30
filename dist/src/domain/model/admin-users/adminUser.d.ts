export declare enum Roles {
    super_admin = "super_admin",
    admin = "admin"
}
export declare class AdminUserM {
    private _id;
    private _name;
    private _last_name;
    private _email;
    private _password;
    private _role;
    private _created_at;
    private _updated_at;
    constructor(id: number, name: string, last_name: string, email: string, password: string, role: Roles, created_at: Date, updated_at: Date);
    get id(): number;
    get name(): string;
    get last_name(): string;
    get email(): string;
    get password(): string;
    set role(value: Roles);
    set email(value: string);
}
