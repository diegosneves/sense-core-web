import { useContext } from "react";
import { SensorsContext } from "./SensorsContext";

export function useSensors() {
  const ctx = useContext(SensorsContext);
  if (!ctx) throw new Error("useSensors must be used within SensorsProvider");
  return ctx;
}
