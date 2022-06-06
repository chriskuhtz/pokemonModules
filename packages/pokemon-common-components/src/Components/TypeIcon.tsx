import React from "react";

import bug from "../Assets/types/bug.png";
import dark from "../Assets/types/dark.png";
import dragon from "../Assets/types/dragon.png";
import electric from "../Assets/types/electric.png";
import fairy from "../Assets/types/fairy.png";
import fighting from "../Assets/types/fighting.png";
import fire from "../Assets/types/fire.png";
import flying from "../Assets/types/flying.png";
import ghost from "../Assets/types/ghost.png";
import grass from "../Assets/types/grass.png";
import ground from "../Assets/types/ground.png";
import ice from "../Assets/types/ice.png";
import normal from "../Assets/types/normal.png";
import poison from "../Assets/types/poison.png";
import psychic from "../Assets/types/psychic.png";
import rock from "../Assets/types/rock.png";
import steel from "../Assets/types/steel.png";
import water from "../Assets/types/water.png";

enum typeEnum {
  bug = "bug",
  dark = "dark",
  dragon = "dragon",
  electric = "electric",
  fairy = "fairy",
  fighting = "fighting",
  fire = "fire",
  flying = "flying",
  ghost = "ghost",
  grass = "grass",
  ground = "ground",
  ice = "ice",
  normal = "normal",
  poison = "poison",
  psychic = "psychic",
  rock = "rock",
  steel = "steel",
  water = "water",
}
export const TypeIcon = ({
  type,
  size,
}: {
  type: string;
  size?: number;
}): JSX.Element => {
  switch (type) {
    case typeEnum.bug: {
      return <img src={bug} alt={typeEnum.bug} height={size} width={size} />;
    }
    case typeEnum.dragon: {
      return (
        <img src={dragon} alt={typeEnum.dragon} height={size} width={size} />
      );
    }
    case typeEnum.dark: {
      return <img src={dark} alt={typeEnum.dark} height={size} width={size} />;
    }
    case typeEnum.electric: {
      return (
        <img
          src={electric}
          alt={typeEnum.electric}
          height={size}
          width={size}
        />
      );
    }
    case typeEnum.fairy: {
      return (
        <img src={fairy} alt={typeEnum.fairy} height={size} width={size} />
      );
    }
    case typeEnum.fighting: {
      return (
        <img
          src={fighting}
          alt={typeEnum.fighting}
          height={size}
          width={size}
        />
      );
    }
    case typeEnum.fire: {
      return <img src={fire} alt={typeEnum.fire} height={size} width={size} />;
    }
    case typeEnum.flying: {
      return (
        <img src={flying} alt={typeEnum.flying} height={size} width={size} />
      );
    }
    case typeEnum.ghost: {
      return (
        <img src={ghost} alt={typeEnum.ghost} height={size} width={size} />
      );
    }
    case typeEnum.grass: {
      return (
        <img src={grass} alt={typeEnum.grass} height={size} width={size} />
      );
    }
    case typeEnum.ground: {
      return (
        <img src={ground} alt={typeEnum.ground} height={size} width={size} />
      );
    }
    case typeEnum.ice: {
      return <img src={ice} alt={typeEnum.ice} height={size} width={size} />;
    }
    case typeEnum.normal: {
      return (
        <img src={normal} alt={typeEnum.normal} height={size} width={size} />
      );
    }
    case typeEnum.poison: {
      return (
        <img src={poison} alt={typeEnum.poison} height={size} width={size} />
      );
    }
    case typeEnum.psychic: {
      return (
        <img src={psychic} alt={typeEnum.psychic} height={size} width={size} />
      );
    }
    case typeEnum.rock: {
      return <img src={rock} alt={typeEnum.rock} height={size} width={size} />;
    }
    case typeEnum.steel: {
      return (
        <img src={steel} alt={typeEnum.steel} height={size} width={size} />
      );
    }
    case typeEnum.water: {
      return (
        <img src={water} alt={typeEnum.water} height={size} width={size} />
      );
    }
    default: {
      return (
        <img src={normal} alt={typeEnum.normal} height={size} width={size} />
      );
    }
  }
};
