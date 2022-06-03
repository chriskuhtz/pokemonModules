import { Typography } from "@mui/material";
import { useGetAbilityByIndexQuery } from "chriskuhtz-pokemon-api";
import SingularAbility from "./SingularAbility";

interface SinglePokemonAbilities {
  abilities: { ability: { url: string }; is_hidden: boolean }[];
}

const SinglePokemonAbilities = ({ abilities }: SinglePokemonAbilities) => {
  return (
    <>
      <Typography variant="h5">
        {abilities.length > 1 ? "Abilities" : "Ability"}
      </Typography>
      {abilities.map((a) => {
        const splitUrl = a.ability.url.split("/");
        const urlIndex = parseInt(splitUrl[splitUrl.length - 2]);

        return (
          <SingularAbility
            key={urlIndex}
            index={urlIndex}
            isHidden={a.is_hidden}
          />
        );
      })}
    </>
  );
};

export default SinglePokemonAbilities;
