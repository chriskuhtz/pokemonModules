import { Box, Typography, Stack, Link } from "@mui/material";

const PokedexModulePost = () => {
  return (
    <Stack spacing={2}>
      <Box>
        {" "}
        <Typography variant="h4">The Pokedex Module</Typography>
        <Link href="https://pokemonmodules-pokedex.netlify.app/">
          Live Site
        </Link>
        <br />
        <Typography variant="caption">30.05.2022</Typography>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">Updated Architecture Diagram</Typography>
        <Link href="https://github.com/chriskuhtz/pokemonModules/tree/main/packages/pokedex">
          Architecture Diagram
        </Link>
      </Box>
      <Box>
        <Typography>
          The Architecture Diagram shows the current connections between the
          modules.
        </Typography>{" "}
        <Typography>
          I classify my modules as standalone or assistance. Standalone Modules
          can be released to end users, while Assistance Modules only provide
          functionality to Standalone Modules. This Pokedex Module is currently
          standalone, but will serve as assistance to bigger Modules in the
          future.
        </Typography>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">What does this Module do</Typography>
        <Link href="https://github.com/chriskuhtz/pokemonModules/tree/main/packages/pokedex">
          go to github
        </Link>
      </Box>
      <Box>
        <Typography>
          Currently, the module is very bare bones, but i want to release it as
          a first demonstration of the purpose of a monorepo architecture. This
          Module imports and uses the pokemon-api module to create an indexed
          directory of the different Pokemon. This Index can later be used in
          other Modules, in which the user might need information about certain
          Pokemon.
        </Typography>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">Whats Next for this Module</Typography>
      </Box>
      <Box>
        <Typography>
          As a next step, the content for each pokemon entry must be expanded.
          After that, i am planning to add extensive filtering and sorting
          options to the index.
        </Typography>
      </Box>
    </Stack>
  );
};

export default PokedexModulePost;
