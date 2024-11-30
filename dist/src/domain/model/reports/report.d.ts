import { EvidenceM } from '../evidences/evidence';
import { TrafficLightM } from '../traffic-lights/trafficLight';
import { UserM } from '../users/user';
export declare enum Status {
    Funcionando = "funcionando",
    Dañado = "da\u00F1ado",
    Intermitente = "intermitente"
}
export declare class ReportM {
    private _id;
    private _user;
    private _trafficLight;
    private _description;
    private _status;
    private _comments;
    private _reported_at;
    private _created_at;
    private _updated_at;
    private _evidences;
    constructor(id: number, user: UserM, trafficLight: TrafficLightM | null, description: string | null, status: Status, comments: string | null, reported_at: Date, created_at?: Date, updated_at?: Date, evidences?: EvidenceM[]);
    get id(): number;
    get user(): UserM;
    get trafficLight(): TrafficLightM | null;
    set id(value: number);
}
