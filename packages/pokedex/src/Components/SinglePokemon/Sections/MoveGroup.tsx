import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MoveGroupProps } from "../Models/SinglePokemonModels";
import SingularMove from "./SingularMove";

const MoveGroup = ({
  moves,
  headline,
  isLvlGroup,
  id,
}: MoveGroupProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [moves]);

  let movesToDisplay = moves;
  if (isLvlGroup) {
    movesToDisplay.sort(
      (a, b) =>
        a.version_group_details[0].level_learned_at -
        b.version_group_details[0].level_learned_at
    );
  }
  return (
    <>
      <Typography variant="h6" onClick={() => setOpen(!open)}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {headline}
          {open ? <ExpandLess /> : <ExpandMore />}
        </Box>
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {moves.map((m) => {
            return (
              <SingularMove
                id={id}
                move={m}
                key={m?.move.name}
                isLvlUp={isLvlGroup}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
};

export default MoveGroup;
