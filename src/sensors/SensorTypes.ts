export type SensorType = "pressao" | "temperatura" | "vazao" | "umidade";
export type SensorLine = "Linha A" | "Linha B" | "Linha C" | "Linha D";

export type Sensor = {
  id: string;
  name: string;
  type: SensorType;
  line: SensorLine;
};
