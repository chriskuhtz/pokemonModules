import { Move } from "../../Models/Move";
import { Pokemon } from "../../Models/Pokemon";
import { useDetermineTypeFactor } from "./useDetermineTypeFactor";

export const useCalculateDamage = () => {
  const { determineTypeFactor, isStab } = useDetermineTypeFactor();
  const calculateDamage = (
    level: number,
    move: Move,
    attack: number,
    defense: number,
    attacker: Pokemon,
    defender: Pokemon
  ): { damage: number; message?: string } => {
    //https://bulbapedia.bulbagarden.net/wiki/Damage
    let message = undefined;

    const moveDamageFactor = move.damage ?? 0;
    const levelFactor = (2 * level) / 5 + 2;
    const statFactor = attack / defense;
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
        secondaryTypeFactor
    );

    if (typeFactor === 0 || secondaryTypeFactor === 0) {
      message = "It has no effect.";
    } else if (typeFactor * secondaryTypeFactor < 1) {
      message = "It is not very effective.";
    } else if (typeFactor * secondaryTypeFactor > 1) {
      message = "It is very effective.";
    } else {
      message = "";
    }

    return { damage: damage, message: message };
  };

  return { calculateDamage };
};
