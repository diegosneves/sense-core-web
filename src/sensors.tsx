import React, { createContext, useContext, useMemo, useState } from "react";

export type SensorType = "pressao" | "temperatura" | "vazao" | "umidade";
export type SensorLine = "Linha A" | "Linha B" | "Linha C" | "Linha D";

export type Sensor = {
  id: string;
  name: string;
  type: SensorType;
  line: SensorLine;
};

type SensorsContextType = {
  sensors: Sensor[];
  addSensor: (data: Omit<Sensor, "id">) => Sensor;
  removeSensor: (id: string) => void;
  resetSensors: () => void;
};

const SensorsContext = createContext<SensorsContextType | undefined>(undefined);

export function SensorsProvider({ children }: { children: React.ReactNode }) {
  const [sensors, setSensors] = useState<Sensor[]>([
    // Mock inicial opcional
    {
      id: "s1",
      name: "Sensor de Pressão (Linha A)",
      type: "pressao",
      line: "Linha A",
    },
    {
      id: "s2",
      name: "Sensor de Pressão (Linha B)",
      type: "pressao",
      line: "Linha B",
    },
  ]);

  const addSensor = (data: Omit<Sensor, "id">) => {
    const sensor: Sensor = { id: crypto.randomUUID(), ...data };
    setSensors((prev) => [sensor, ...prev]);
    return sensor;
  };

  const removeSensor = (id: string) => {
    setSensors((prev) => prev.filter((s) => s.id !== id));
  };

  const resetSensors = () => setSensors([]);

  const value = useMemo(
    () => ({ sensors, addSensor, removeSensor, resetSensors }),
    [sensors]
  );

  return (
    <SensorsContext.Provider value={value}>{children}</SensorsContext.Provider>
  );
}

export function useSensors() {
  const ctx = useContext(SensorsContext);
  if (!ctx) throw new Error("useSensors must be used within SensorsProvider");
  return ctx;
}
