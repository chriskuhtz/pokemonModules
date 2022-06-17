export interface Move {
  name: string;
  damage: number;
  type: string;
  powerPoints: { initial: number; current: number };
  moveType: "special" | "physical" | "status" | "stat";
}
