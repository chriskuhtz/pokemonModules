import { Move } from "../../Models/Move";
import { Pokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import { Log } from "../../Store/logSlice";
import { calculateModifiedStat } from "../Stats/calculateModifiedStat";
import { useDetermineTypeFactor } from "./useDetermineTypeFactor";

export const useCalculateDamage = () => {
  const { determineTypeFactor, isStab } = useDetermineTypeFactor();

  const calculateDamage = (
    level: number,
    move: Move,
    attacker: Pokemon,
    defender: Pokemon
  ): { damage: number; logs: Log[] } => {
    //https://bulbapedia.bulbagarden.net/wiki/Damage
    let logs: Log[] = [];

    const isCriticalHit = (1 + (move.meta.crit_rate ?? 0)) / 16 > Math.random();

    if (isCriticalHit) {
      logs.push({ message: "Critical Hit!" });
    }
    const moveDamageFactor = move.power ?? 0;
    const criticalFactor = isCriticalHit ? 1.5 : 1;
    const burnFactor =
      move.damage_class === "physical" &&
      attacker.statusConditions.primaryCondition === StatusConditionEnum.BURN &&
      !isCriticalHit
        ? 0.5
        : 1;
    const levelFactor = (2 * level) / 5 + 2;
    const attackStat =
      move.damage_class === "physical"
        ? attacker.stats.attack
        : attacker.stats.specialAttack;
    const defenseStat =
      move.damage_class === "physical"
        ? defender.stats.defense
        : defender.stats.specialDefense;
    const modifiedAttackStat = calculateModifiedStat(attackStat);
    const modifiedDefenseStat = calculateModifiedStat(defenseStat);

    const criticalModifiedAttackStat =
      modifiedAttackStat > attackStat.initial
        ? modifiedAttackStat
        : attackStat.initial;
    const criticalModifiedDefenseStat =
      modifiedDefenseStat > defenseStat.initial
        ? defenseStat.initial
        : modifiedDefenseStat;
    const statFactor = criticalModifiedAttackStat / criticalModifiedDefenseStat;

    const typeFactor = determineTypeFactor(move.type, defender.primaryType);
    const secondaryTypeFactor =
      defender.secondaryType && typeFactor !== 0
        ? determineTypeFactor(move.type, defender.secondaryType)
        : 1;
    const stabFactor = isStab(move.type, attacker) ? 1.5 : 1;
    const randomFactor = 0.85 + Math.random() * 0.15;

    const damage = Math.floor(
      ((levelFactor * moveDamageFactor * statFactor) / 50 + 2) *
        stabFactor *
        randomFactor *
        typeFactor *
        secondaryTypeFactor *
        criticalFactor *
        burnFactor
    );

    if (typeFactor === 0 || secondaryTypeFactor === 0) {
      logs.push({ message: "It has no effect." });
    } else if (typeFactor * secondaryTypeFactor < 1) {
      logs.push({ message: "It is not very effective." });
    } else if (typeFactor * secondaryTypeFactor > 1) {
      logs.push({ message: "It is very effective." });
    }

    return { damage: damage, logs: logs };
  };

  return { calculateDamage };
};
