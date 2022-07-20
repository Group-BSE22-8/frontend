import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Divider from "@mui/material/Divider";

export default function List_view() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "90%", bgcolor: "background.paper" }}>
      <ListItem key={`Clusters1`}>
        <ListItemText primary={`Clusters`} />
      </ListItem>
      <Divider component="li" />
      {[0, 1, 2].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value}>
            <ListItemButton
            //   onClick={handleToggle(value)}
            >
              <ListItemText id={labelId} primary={`Cluster ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
