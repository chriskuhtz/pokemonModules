import React from "react";

export const PokemonIcon = ({ index }: { index: number }): JSX.Element => {
  return (
    <img
      height="96px"
      width="96px"
      alt="pokemon icon"
      src={
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        index +
        ".png"
      }
    />
  );
};
