import { List, ListItem, ListItemText, Divider } from "@mui/material";
import data from "../../Data/nextFeatures.json";

const NextFeaturesScreen = () => {
  const features = data.nextFeatures;

  return (
    <List>
      {features.map((f) => (
        <>
          <ListItem>
            <ListItemText primary={f} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default NextFeaturesScreen;
