export interface StatusConditions {
  primaryCondition?: StatusConditionEnum;
  sleepCounter?: number;
}

export enum StatusConditionEnum {
  PARALYSIS = "paralysis",
  BURN = "burn",
  POISON = "poison",
  SLEEP = "sleep",
  FREEZE = "freeze",
}
