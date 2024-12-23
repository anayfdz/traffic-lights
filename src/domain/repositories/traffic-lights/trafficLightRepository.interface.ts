//import { TrafficLightM } from "src/domain/model/traffic-lights/trafficLight";
import { TrafficLightM } from "../../model/traffic-lights/trafficLight";

export interface ITrafficLightRepository {
  create(trafficLight: TrafficLightM): Promise<TrafficLightM>;
  findById(id: number): Promise<TrafficLightM | undefined>;
  findNearby(latitude: number, longitude: number, radius: number): Promise<TrafficLightM[]>;
  //findTrafficLightById(id: number): Promise<TrafficLightM | undefined>;
  filterTraffic(department?: string, province?: string, district?: string): Promise<TrafficLightM[]>;
  update(trafficLight: TrafficLightM): Promise<TrafficLightM>;
  delete(id: number): Promise<void>;
  save(trafficLight: TrafficLightM): Promise<TrafficLightM>;
}