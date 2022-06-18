import { useDispatch } from "react-redux";
import { Move } from "../../Models/Move";
import { addLog } from "../../Store/logSlice";

export const useCalculateDamage = () => {
  const dispatch = useDispatch();

  const calculateDamage = (
    level: number,
    move: Move,
    attack: number,
    defense: number
  ) => {
    if (level === -1 || attack === -1 || defense === -1) {
      dispatch(
        addLog({
          message: "something went wrong, missing data",
        })
      );
      return 0;
    }
    //https://bulbapedia.bulbagarden.net/wiki/Damage
    const levelFactor = (2 * level) / 5 + 2;
    const statFactor = attack / defense;

    const damage = Math.floor(
      (levelFactor * move.damage * statFactor) / 50 + 2
    );

    return damage;
  };

  return { calculateDamage };
};
