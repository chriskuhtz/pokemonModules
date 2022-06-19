import { useDispatch } from "react-redux";
import { clearLogs, addLog, Log } from "../../Store/logSlice";

export const useGameOver = () => {
  const dispatch = useDispatch();

  const gameOverLoop = () => {
    dispatch(
      addLog({ message: "game over", onDismissal: () => gameOverLoop() })
    );
  };
  const gameOver = (): { logs: Log[] } => {
    const logs: Log[] = [];
    logs.push({
      message: "game over",
      onDismissal: () => {
        dispatch(clearLogs());
        gameOverLoop();
      },
    });

    return { logs: logs };
  };

  return { gameOver };
};
