import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PokemonIcon } from "chriskuhtz-pokemon-common-components";
import { useSelector } from "react-redux";

import BattleScreen from "./Components/BattleScreen/BattleScreen";
import BugButton from "./Components/BugButton/BugButton";
import { useCreateTwoRandomPokemon } from "./Functions/Pokemon/useCreateTwoRandomPokemon";
import { Log } from "./Store/logSlice";
import { RootState } from "./Store/store";

const App = (): JSX.Element => {
  const theme = useTheme();
  const smOrUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { activePokemon, opponentPokemon } = useCreateTwoRandomPokemon();

  const archivedLogs: Log[] = useSelector(
    (state: RootState) => state.logs.value.archive
  );

  const logs: Log[] = useSelector((state: RootState) => state.logs.value.logs);

  if (smOrUp) {
    return (
      <>
        <BugButton
          condition={true}
          authToken={process.env.REACT_APP_GITHUB_AUTH_TOKEN ?? ""}
          url={process.env.REACT_APP_GITHUB_URL ?? ""}
          position={"top"}
          categories={["UI", "Effect Order", "Move"]}
          data={[
            {
              key: "unexecuted logs",
              value: JSON.stringify(logs, undefined, 2),
            },
            {
              key: "archived logs",
              value: JSON.stringify(archivedLogs, undefined, 2),
            },
            {
              key: "active",
              value: JSON.stringify(
                {
                  ...activePokemon,
                  spriteUrl: undefined,
                  frontUrl: undefined,
                },
                undefined,
                2
              ),
            },
            {
              key: "opponent",
              value: JSON.stringify(
                { ...opponentPokemon, spriteUrl: undefined },
                undefined,
                2
              ),
            },
          ]}
        />

        <BattleScreen
          activePokemon={activePokemon}
          opponentPokemon={opponentPokemon}
        />
      </>
    );
  } else {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <Stack alignItems={"center"}>
          <PokemonIcon index={25} />

          <Typography variant="h5">Please turn your phone sideways.</Typography>
        </Stack>
      </Box>
    );
  }
};

export default App;
