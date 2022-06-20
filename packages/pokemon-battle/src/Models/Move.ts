import { StatChange } from "./Stat";

export interface Move {
  name: string;
  power: number;
  statChange?: StatChange;
  type: string;
  powerPoints: { initial: number; current: number };
  damage_class: string;
  target: TargetEnum;
  priority: -1 | 0 | 1 | 2;
  accuracy: number;
  meta: Meta;
}

export interface LoadedMove {
  damage_class: { name: string };
  meta: Meta;
  type: { name: string };
  accuracy: number;
  effect_entries: { effect: string }[];
  target: { name: string };
  power: number;
  pp: number;
  priority: PriorityEnum;
  stat_changes: { change: number; stat: { name: string } }[];
  effect_chance: number;
  name: string;
}

export interface Meta {
  max_hits: number | null;
  min_hits: number | null;
  max_turns: number | null;
  min_turns: number | null;
  ailment: { name: string };
  ailment_chance: number | null;
  crit_rate: number | null;
  flinch_chance: number | null;
  drain: number | null;
  healing: number | null;
  stat_chance: number;
}

export enum TargetEnum {
  USER = "user",
  OPPONENT = "opponent",
}
export enum PriorityEnum {
  STANDARD = 0,
  FIRST = 1,
  LAST = -1,
  NONATTACK = 2,
}
