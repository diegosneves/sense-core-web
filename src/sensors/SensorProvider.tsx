import React, { useMemo, useState } from "react";
import { SensorsContext } from "./SensorsContext";
import type { Sensor } from "./SensorTypes";

export function SensorsProvider({ children }: { children: React.ReactNode }) {
  const [sensors, setSensors] = useState<Sensor[]>([
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
