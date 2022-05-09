import { Box, Typography, Stack, Link } from "@mui/material";

const IntroPost = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">The Pokemon Monorepo</Typography>
      <Typography variant="h5">What is this about?</Typography>
      <Box>
        <Typography>
          As a self taught developer, it is important to me to demonstrate my
          abilities, improve my skills and document my learnings.
        </Typography>
        <Typography>
          Since I am not a beginner anymore, and because I am more focused on
          software architecture than UI Design, i want to continuously work on
          one big example project.
        </Typography>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">Why Monorepo?</Typography>
        <Link href="https://github.com/chriskuhtz/pokemonModules">github</Link>
      </Box>
      <Box>
        {" "}
        <Typography>
          Monorepos are a popular solution for projects that include multiple
          standalone applications or sites, which still share aspects of their
          code.
        </Typography>
        <Typography>
          For example, my current employer uses a monorepo architecture to share
          the Material UI Themes, general Layouts and API communication modules
          between our main web application and an external
          consultation/registration site.
        </Typography>
        <Typography>
          My pokemon modules project will eventually have even more
          cross-utilization between modules, with separately deployed modules
          that are also combined into more complex web-apps.
        </Typography>
      </Box>

      <Typography variant="h5">Why Pokemon?</Typography>
      <Box>
        <Typography>
          I could use any other topic for my example project, including some
          more "serious" topics, like personal finance.
        </Typography>
        <Typography>
          But Pokemon offers a complexity of data structures and interactions
          that is hard to find in other topics.
        </Typography>
        <Typography>
          There is also a multitude of existing open source projects using
          Pokemon, allowing me access to data and graphical assets through
          API's.
        </Typography>
      </Box>
    </Stack>
  );
};

export default IntroPost;
