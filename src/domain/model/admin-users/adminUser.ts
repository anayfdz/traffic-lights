export enum Roles {
  super_admin = 'super_admin',
  admin = 'admin',
}


export class AdminUserM {
  private _id: number;
  private _name: string;
  private _last_name: string;
  private _email: string;
  private _password: string;
  private _role: Roles;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(
    id: number,
    name: string,
    last_name: string,
    email: string,
    password: string,
    role: Roles,
    created_at: Date,
    updated_at: Date,
  ) {
    this._id = id;
    this._name = name;
    this._last_name = last_name;
    this._email = email;
    this._password = password;
    this._role = role;
    this._created_at = created_at || new Date();
    this._updated_at = updated_at || new Date();
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get last_name(): string {
    return this._last_name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
  // setters

  set role(value: Roles) {
    this._role = value;
  }

  set email(value: string) {
    this._email = value;
  }
}
