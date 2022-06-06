import React from "react";
import { useSpring, animated, config } from "react-spring";

export const PokemonLoadingSpinner = ({
  index,
}: {
  index: number;
}): JSX.Element => {
  const props = useSpring({
    to: { transform: "rotate(0deg)" },
    from: { transform: "rotate(359deg)" },
    loop: true,
    config: config.gentle,
  });
  return (
    <animated.img
      style={props}
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
