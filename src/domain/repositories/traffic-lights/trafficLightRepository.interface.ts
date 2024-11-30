import { TrafficLightM } from "src/domain/model/traffic-lights/trafficLight";

export interface TodoRepository {
  insert(todo: TrafficLightM): Promise<TrafficLightM>;
  findAll(): Promise<TrafficLightM[]>;
  findById(id: number): Promise<TrafficLightM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}
