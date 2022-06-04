import { Typography } from "@mui/material";
import SingularMove from "./SingularMove";

export interface Move {
  move: { name: string; url: string };
  version_group_details: VersionGroupDetail[];
}
interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: { name: string };
  version_group: { name: string };
}
interface SinglePokemonMoves {
  moves: Move[];
}

const SinglePokemonMoves = ({ moves }: SinglePokemonMoves) => {
  console.log(moves);
  const selectedVersionGroup = "sword-shield";

  const onlySelectedVersion = (move: Move) => {
    const filteredDetails = move.version_group_details.filter(
      (v) => v.version_group.name === selectedVersionGroup
    );
    if (filteredDetails.length > 0) {
      return { ...move, version_group_details: filteredDetails };
    } else return undefined;
  };

  const versionMoves = moves
    .map((m) => onlySelectedVersion(m))
    .filter((m) => m !== undefined);

  console.log(versionMoves);

  return (
    <>
      <Typography variant="h5">Moves:</Typography>
      {versionMoves.map((m) => (
        <SingularMove move={m} />
      ))}
    </>
  );
};

export default SinglePokemonMoves;
