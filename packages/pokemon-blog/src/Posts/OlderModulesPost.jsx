import { Box, Typography, Stack, Link } from "@mui/material";

const OlderModulesPost = () => {
  return (
    <Stack spacing={2}>
      <Box>
        {" "}
        <Typography variant="h4">My Older Modules</Typography>
        <Typography variant="caption">09.05.2022</Typography>
      </Box>

      <Box>
        <Typography>
          I have been using Pokemon as my example data since i started my
          journey as a frontend developer.
        </Typography>
        <Typography>
          Since then, i have produced two standalone sites that i am proud
          enough of to keep live. Their code, however, is not up to my standards
          anymore and will be continuously refactored into the new monorepo.
        </Typography>
        <Typography>
          For now, they serve as an example of what i am trying to build with
          this monorepo.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">Pokemon Battle Module </Typography>
        <Link href="https://pokemonbattlemodule.netlify.app/">
          go to the site
        </Link>
      </Box>
      <Box>
        <Typography>
          This standalone module allows the user to have a randomized pokemon
          battle against a computer controlled opponent.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">Pokemon Map Maker</Typography>
        <Link href="https://pokemonmapmodule.netlify.app/">go to the site</Link>
      </Box>

      <Box>
        <Typography>
          The user can create classic pokemon game maps and
          interactions(trainers, items) as JSON files.
        </Typography>
      </Box>
    </Stack>
  );
};

export default OlderModulesPost;
