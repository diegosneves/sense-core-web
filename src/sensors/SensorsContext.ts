import { createContext } from "react";
import type { Sensor } from "./SensorTypes";

export type SensorsContextType = {
  sensors: Sensor[];
  addSensor: (data: Omit<Sensor, "id">) => Sensor;
  removeSensor: (id: string) => void;
  resetSensors: () => void;
};

export const SensorsContext = createContext<SensorsContextType | undefined>(
  undefined
);
