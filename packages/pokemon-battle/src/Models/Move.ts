import { StatChange } from "./Stat";

export interface Move {
  name: string;
  damage?: number;
  statChange?: StatChange;
  type: string;
  powerPoints: { initial: number; current: number };
  moveType: "special" | "physical" | "status" | "stat";
  target: "opponent" | "self";
}
