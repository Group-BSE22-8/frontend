import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TopBar from "../../components/navigation/appbar";
import Table from "./store/datatable1";
import SideBar from "../../components/navigation/sidebar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import List_view from "../../components/navigation/listitems";
import Graph from "./store/Graph";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
// Sample data
const data = [
  { argument: "Monday", value: 30 },
  { argument: "Tuesday", value: 80 },
  { argument: "Wednesday", value: 10 },
  { argument: "Thursday", value: 50 },
  { argument: "Friday1", value: 20 },
  { argument: "Friday2", value: 90 },
  { argument: "Friday2", value: 40 },
];
// Sample data
const data1 = [
  { argument: "Monday", value: 60 },
  { argument: "Tuesday", value: 70 },
  { argument: "Wednesday", value: 20 },
  { argument: "Thursday", value: 50 },
  { argument: "Friday1", value: 80 },
  { argument: "Friday2", value: 90 },
  { argument: "Friday2", value: 40 },
];
// Sample data
const data2 = [
  { argument: "Monday", value: 60 },
  { argument: "Tuesday", value: 80 },
  { argument: "Wednesday", value: 30 },
  { argument: "Thursday", value: 70 },
  { argument: "Friday1", value: 50 },
  { argument: "Friday2", value: 90 },
  { argument: "Friday2", value: 45 },
];
// Sample data
const data3 = [
  { argument: "Monday", value: 20 },
  { argument: "Tuesday", value: 70 },
  { argument: "Wednesday", value: 35 },
  { argument: "Thursday", value: 90 },
  { argument: "Friday1", value: 30 },
  { argument: "Friday2", value: 100 },
  { argument: "Friday2", value: 60 },
];
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Crane Cloud
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Infrastructure(props) {
  const [cluster, setCluster] = React.useState({
    id: 1,
    node: 1,
    activeNode: 15,
    machine: 20,
    status: "online",
  });

  function Cluster() {
    return (
      <Grid
        container
        xs={8}
        mb={3}
        mt={4}
        ml={2}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        component={Paper}
      >
        <Typography sx={{ fontSize: 18, marginRight: 1 }}>
          <b>Cluster {cluster.id}</b>
        </Typography>
        <Divider component="h1" />
        <Grid container item>
          <Typography sx={{ fontSize: 15, marginLeft: 5, marginRight: 3 }}>
            <b>Nodes: </b>
            {cluster.node}
            {""}
          </Typography>
          <Typography sx={{ fontSize: 15, marginRight: 3 }}>
            <b>Active Nodes: </b>
            {cluster.activeNode}{" "}
          </Typography>
          <Typography sx={{ fontSize: 15, marginRight: 3 }}>
            <b>Virtual Machines:</b>
            {cluster.machine}{" "}
          </Typography>
          <Typography sx={{ fontSize: 15, marginRight: 3 }}>
            <b>Status:</b>
            {cluster.status}{" "}
          </Typography>
        </Grid>
        <Grid container item>
          <Grid
            item
            // xs={8}
            ml={10}
          >
            <Graph data={data} title="Uptime" />
            <Graph data={data1} title="Network Activity" />
          </Grid>
          <Grid
            item
            // xs={8}
            ml={10}
          >
            <Graph data={data2} title="Load" />
            <Graph data={data3} title="Memory" />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  const handleClick = (value) => () => {
    if (value === 0) {
      setCluster({
        id: 1,
        node: 15,
        activeNode: 15,
        machine: 20,
        status: "online",
      });
    } else if (value === 1) {
      setCluster({
        id: 2,
        node: 12,
        activeNode: 16,
        machine: 20,
        status: "online",
      });
    } else if (value == 2) {
      setCluster({
        id: 3,
        node: 15,
        activeNode: 20,
        machine: 20,
        status: "offline",
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar />
        <SideBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={3}
                mb={3}
                mt={4}
                ml={2}
                mr={4}
                component={Paper}
                elevation={4}
              >
                <List sx={{ width: "90%", bgcolor: "background.paper" }}>
                  <ListItem key={`Clusters1`}>
                    <ListItemText primary={`Clusters`} />
                  </ListItem>
                  <Divider component="li" />
                  {[0, 1, 2].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem key={value}>
                        <ListItemButton onClick={handleClick(value)}>
                          <ListItemText
                            id={labelId}
                            primary={`Cluster ${value + 1}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>

              <Cluster />
            </Grid>

            <Table />

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Infrastructure;
