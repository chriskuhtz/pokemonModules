import { useDispatch } from "react-redux";
import { clearLogs, addLog } from "../../Store/logSlice";

export const useGameOver = () => {
  const dispatch = useDispatch();

  const gameOver = () => {
    dispatch(clearLogs());
    dispatch(
      addLog({
        message: "game over",
        //temporary recursive loop, until an actual end of match is implemented
        onDismissal: () => gameOver(),
      })
    );
  };

  return { gameOver };
};
