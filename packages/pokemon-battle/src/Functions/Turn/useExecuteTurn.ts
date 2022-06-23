import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { Log } from "../../Store/logSlice";
import { RootState } from "../../Store/store";
import { useExecuteMove } from "../Moves/useExecuteMove";
import { useDetermineFirstUser } from "./useDetermineFirstMover";

export const useExecuteTurn = () => {
  const { executeMove } = useExecuteMove();
  const { firstMover } = useDetermineFirstUser();
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );
  const logs: Log[] = useSelector((state: RootState) => state.logs.value);

  const executeTurn = (move: Move) => {
    //decide opponent move
    const opponentMove: Move = opponentPokemon.moves.first;

    //decide who goes first
    const first = firstMover;
    //execute first move
    if (firstMover === "active") {
      executeMove(move, "active");
    } else if (firstMover === "opponent") {
      if (opponentMove) {
        executeMove(opponentMove, "opponent");
      }
    }

    //execute second move
    if (opponentMove && firstMover === "active") {
      executeMove(opponentMove, "opponent");
    } else if (firstMover === "opponent") {
      executeMove(move, "active");
    }
  };

  return { executeTurn };
};
