import { EvidenceM } from '../evidences/evidence';
import { TrafficLightM } from '../traffic-lights/trafficLight';
import { UserM } from '../users/user';

export enum Status {
  Funcionando = 'funcionando',
  Dañado = 'dañado',
  Intermitente = 'intermitente',
  Pendiente = 'pendiente',
  Resuelto = 'resuelto',
}
export class ReportM {
  private _id: number;
  private _user: UserM;
  private _trafficLight: TrafficLightM | null;
  private _description: string | null;
  private _status: Status;
  private _comments: string | null;
  private _reported_at: Date;
  private _created_at: Date;
  private _updated_at: Date;
  private _evidences: EvidenceM[];

  constructor(
    id: number,
    user: UserM,
    trafficLight: TrafficLightM | null,
    description: string | null,
    status: Status,
    comments: string | null,
    reported_at: Date,
    created_at: Date = new Date(),
    updated_at: Date = new Date(),
    evidences: EvidenceM[] = [],
  ) {
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
  get id(): number {
    return this._id;
  }
  get user(): UserM {
    return this._user;
  }
  get trafficLight(): TrafficLightM | null {
    return this._trafficLight;
  }

  set id(value: number) {
    this._id = value;
  }

  get status(): Status {
    return this._status;
  }

  set status(value: Status) {
    this._status = value;
  }
  get comments(): string | null {
    return this._comments;
  }

  set comments(value: string | null) {
    this._comments = value;
  }
  get reported_at(): Date {
    return this._reported_at;
  }
  set reported_at(value: Date) {
    this._reported_at = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this.description = value;
  }
  get evidences(): EvidenceM[] {
    return this._evidences;
  }
  set evidences(value: EvidenceM[]) {
    this._evidences = value;
  }
  get updated_at(): Date {
    return this._updated_at;
  }
  set updated_at(value: Date) {
    this.updated_at = value;
  }
  set trafficLight(value: TrafficLightM | null) {
    this._trafficLight = value;
  }

  // Método para asignar un semáforo al reporte
  assignTrafficLight(trafficLight: TrafficLightM | null): void {
    this._trafficLight = trafficLight;
  }
}
