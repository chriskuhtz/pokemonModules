import { Typography } from "@mui/material";
import { useState } from "react";
import { Move, SinglePokemonMovesProps } from "../Models/SinglePokemonModels";
import MoveGroup from "./MoveGroup";

const SinglePokemonMoves = ({ moves, id }: SinglePokemonMovesProps) => {
  const [versionGroupIndex, setVersionGroupIndex] = useState<number>(0);
  const versionGroups = [
    "sword-shield",
    "lets-go-pikachu-lets-go-eevee",
    "ultra-sun-ultra-moon",
    "sun-moon",
    "omega-ruby-alpha-sapphire",
    "x-y",
    "black-2-white-2",
    "black-white",
    "heartgold-soulsilver",
    "platinum",
    "diamond-pearl",
  ];

  const onlySelectedVersion = (move: Move) => {
    const filteredDetails = move.version_group_details.filter(
      (v) => v.version_group.name === versionGroups[versionGroupIndex]
    );
    if (filteredDetails.length > 0) {
      return { ...move, version_group_details: filteredDetails };
    } else return undefined;
  };

  const versionMoves = moves
    .map((m) => onlySelectedVersion(m))
    .filter((m) => m !== undefined);

  if (
    versionMoves.length === 0 &&
    versionGroupIndex !== versionGroups.length - 1
  ) {
    setVersionGroupIndex(versionGroupIndex + 1);
  }

  const lvlUpMoves: Move[] = [];
  const eggMoves: Move[] = [];
  const machineMoves: Move[] = [];
  const otherMoves: Move[] = [];

  const sortMoves = versionMoves.forEach((m) => {
    const learnMethod = m?.version_group_details[0].move_learn_method.name;
    if (m && (learnMethod === "machine" || learnMethod === "tutor")) {
      machineMoves.push(m);
    } else if (m && learnMethod === "level-up") {
      lvlUpMoves.push(m);
    } else if (m && learnMethod === "egg") {
      eggMoves.push(m);
    } else if (m) otherMoves.push(m);
  });
  return (
    <>
      <Typography variant="h5">Moves:</Typography>
      {lvlUpMoves.length > 0 && (
        <MoveGroup
          id={id}
          isLvlGroup
          headline={"by Level Up:"}
          moves={lvlUpMoves}
        />
      )}
      {machineMoves.length > 0 && (
        <MoveGroup
          id={id}
          headline={"by Machine or Tutor:"}
          moves={machineMoves}
        />
      )}
      {eggMoves.length > 0 && (
        <MoveGroup id={id} headline={"by Breeding:"} moves={eggMoves} />
      )}
    </>
  );
};

export default SinglePokemonMoves;
