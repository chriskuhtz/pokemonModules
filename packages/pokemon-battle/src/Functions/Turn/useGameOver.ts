import { useDispatch } from "react-redux";
import { clearLogs, addLog, Log } from "../../Store/logSlice";

export const useGameOver = () => {
  const dispatch = useDispatch();

  const gameOverMessage = "game over, reload your page to play again";

  const gameOverLoop = () => {
    dispatch(
      addLog({ message: gameOverMessage, onDismissal: () => gameOverLoop() })
    );
  };
  const gameOver = (): { logs: Log[] } => {
    const logs: Log[] = [];
    logs.push({
      message: gameOverMessage,
      onDismissal: () => {
        dispatch(clearLogs());
        gameOverLoop();
      },
    });

    return { logs: logs };
  };

  return { gameOver };
};
