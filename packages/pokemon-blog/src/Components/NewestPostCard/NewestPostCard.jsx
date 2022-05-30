import {
  CardContent,
  Card,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";

import { Link } from "react-router-dom";
const NewestPostCard = () => {
  const theme = useTheme();
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,

        border: `solid 2px ${theme.palette.primary.main}`,
      }}
    >
      <CardContent>
        The newest post is about the <strong>Pokedex Module</strong>, which is
        the first Standalone Module that implements an Assistance Module.
      </CardContent>
      <CardActions>
        <Button variant="contained">
          <Link
            onClick={() => {
              setOpen(false);
            }}
            style={{ textDecoration: "none", color: "inherit" }}
            to="/pokedex-module"
          >
            Read more
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewestPostCard;
