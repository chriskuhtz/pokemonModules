export interface Move {
  name: string;
  damage?: number;
  statChange?: { stats: string[]; modifier: number };
  type: string;
  powerPoints: { initial: number; current: number };
  moveType: "special" | "physical" | "status" | "stat";
  target: "opponent" | "self";
}
