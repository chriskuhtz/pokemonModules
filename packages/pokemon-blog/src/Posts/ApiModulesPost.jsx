import { Box, Typography, Stack, Link } from "@mui/material";

const ApiModulesPost = () => {
  return (
    <Stack spacing={2}>
      <Box>
        {" "}
        <Typography variant="h4">The API Module</Typography>
        <Typography variant="caption">09.05.2022</Typography>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">PokeApi.co</Typography>
        <Link href="https://pokeapi.co/">pokeApi website</Link>
      </Box>
      <Box>
        <Typography>
          PokeApi.co is an incredible resource that provides access to all the
          pokemon game related information that you could ever need, through a
          REST or GraphQL API.
        </Typography>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">Redux Toolkit Query</Typography>
        <Link href="https://redux-toolkit.js.org/rtk-query/overview">
          rtk query website
        </Link>
      </Box>
      <Box>
        <Typography>
          Redux Toolkit has long been the state of the art solution for
          application state management in React. Their new tool, RTK Query,
          allows developers to quickly and consistently create react hooks for
          API calls and to connect the request data and the redux store.
        </Typography>
        <Typography>
          These hooks are a great way to accurately handle loading states,
          optimize request frequency and keep a clean API communication
          structure throughout your application, or in this case throughout
          multiple applications.
        </Typography>
      </Box>{" "}
      <Box>
        {" "}
        <Typography variant="h5">My pokemon-api module</Typography>
        <Link href="https://github.com/chriskuhtz/pokemonModules/tree/main/packages/pokemon-api">
          go to github
        </Link>
      </Box>
      <Box>
        <Typography>
          This Module contains the RTK hooks that handle the GET requests from
          the pokeAPI. In the future, there will be multiple modules like this,
          which will be responsible for communication with my own backend and
          possibly other external API's.
        </Typography>
        <Typography></Typography>
      </Box>
    </Stack>
  );
};

export default ApiModulesPost;
