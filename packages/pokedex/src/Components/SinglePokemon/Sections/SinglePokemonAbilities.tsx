import { Typography } from "@mui/material";
import { SinglePokemonAbilitiesProps } from "../Models/SinglePokemonModels";
import SingularAbility from "./SingularAbility";

const SinglePokemonAbilities = ({
  abilities,
  id,
}: SinglePokemonAbilitiesProps) => {
  return (
    <>
      <Typography variant="h5">
        {abilities.length > 1 ? "Abilities" : "Ability"}
      </Typography>
      {abilities.map((a) => {
        return (
          <SingularAbility
            key={a.ability.url}
            url={a.ability.url}
            isHidden={a.is_hidden}
            id={id}
          />
        );
      })}
    </>
  );
};

export default SinglePokemonAbilities;
