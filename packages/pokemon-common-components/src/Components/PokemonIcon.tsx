import React from "react";

export const PokemonIcon = ({ index }: { index: number }): JSX.Element => {
  return (
    <img
      src={
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        index +
        ".png"
      }
    />
  );
};
