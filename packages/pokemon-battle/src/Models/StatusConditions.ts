export interface StatusConditions {
  primaryCondition?: StatusConditionEnum;
}

export enum StatusConditionEnum {
  PARALYSIS = "paralysis",
  BURN = "burn",
}
