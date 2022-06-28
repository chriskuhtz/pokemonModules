// returns the urls of 4 random moves

export const pickRandomMoves = (
  moves: { move: { url: string } }[]
): string[] => {
  if (moves.length <= 4) {
    return moves.map((m: { move: { url: string } }) => {
      return m.move.url;
    });
  }
  const pickedMoves: string[] = [];
  let i = 0;
  while (i < 4) {
    const randomIndex = Math.round(Math.random() * (moves.length - 1));
    let nextMove = moves[randomIndex];

    if (!pickedMoves.includes(nextMove.move.url)) {
      pickedMoves.push(nextMove.move.url);
      i++;
    }
  }

  return pickedMoves;
};
