import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { Log } from "../../Store/logSlice";
import { RootState } from "../../Store/store";
import { useExecuteMove } from "../Moves/useExecuteMove";
import { decideOpponentMove } from "./decideOpponentMove";
import { useApplyEndOfTurnEffects } from "./useApplyEndOfTurnEffects";
import { useDetermineFirstUser } from "./useDetermineFirstMover";

export const useExecuteTurn = () => {
  const { executeMove } = useExecuteMove();
  const { determineFirstMover } = useDetermineFirstUser();
  const { applyEndOfTurnEffects } = useApplyEndOfTurnEffects();
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );
  const logs: Log[] = useSelector((state: RootState) => state.logs.value);

  const executeTurn = (move: Move) => {
    //decide opponent move
    const opponentMove: Move = decideOpponentMove(opponentPokemon.moves);

    //decide who goes first
    const first = determineFirstMover(move, opponentMove);
    //execute first move
    if (first === "active") {
      executeMove(move, "active");
    } else if (first === "opponent") {
      if (opponentMove) {
        executeMove(opponentMove, "opponent");
      }
    }

    //execute second move
    if (opponentMove && first === "active") {
      executeMove(opponentMove, "opponent");
    } else if (first === "opponent") {
      executeMove(move, "active");
    }

    //check for end of turn damage
    applyEndOfTurnEffects(opponentPokemon, "opponent");
    applyEndOfTurnEffects(activePokemon, "active");
  };

  return { executeTurn };
};
