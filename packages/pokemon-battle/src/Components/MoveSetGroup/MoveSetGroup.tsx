import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ActivePokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import MoveButton from "../MoveButton/MoveButton";

const MoveSetGroup = () => {
  const pokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const moves = pokemon.moves;
  return (
    <Grid container>
      <Grid item xs={6}>
        <MoveButton move={moves.first} />
      </Grid>
      {moves.second && (
        <Grid item xs={6}>
          <MoveButton move={moves.second} />
        </Grid>
      )}
      {moves.third && (
        <Grid item xs={6}>
          <MoveButton move={moves.third} />
        </Grid>
      )}
      {moves.fourth && (
        <Grid item xs={6}>
          <MoveButton move={moves.fourth} />
        </Grid>
      )}
    </Grid>
  );
};
export default MoveSetGroup;
