import { Grid } from "@mui/material";
import { PokemonMoveSet } from "../../Models/Pokemon";
import MoveButton from "../MoveButton/MoveButton";

const MoveSetGroup = ({ moves }: { moves: PokemonMoveSet }) => {
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
