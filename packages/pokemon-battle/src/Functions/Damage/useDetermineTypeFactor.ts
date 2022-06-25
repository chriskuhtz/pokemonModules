import { Pokemon } from "../../Models/Pokemon";
import { TypeEffectiveness, typeChart } from "../../Utils/Constants/typeChart";
import { hasKey } from "../../Utils/hasKey";

export const useDetermineTypeFactor = () => {
  const isStab = (moveType: string, attacker: Pokemon) => {
    if ([attacker.primaryType, attacker.secondaryType].includes(moveType)) {
      return true;
    } else return false;
  };

  const determineTypeFactor = (moveType: string, type: string) => {
    let typeFactor = 1;

    const typeEffectiveness: TypeEffectiveness | false =
      hasKey(typeChart, moveType) && typeChart[moveType];

    if (typeEffectiveness && typeEffectiveness.super.includes(type)) {
      typeFactor = 2;
    }
    if (typeEffectiveness && typeEffectiveness.notvery.includes(type)) {
      typeFactor = 0.5;
    }
    if (typeEffectiveness && typeEffectiveness.noEffect.includes(type)) {
      typeFactor = 0;
    }
    return typeFactor;
  };

  return { determineTypeFactor, isStab };
};
