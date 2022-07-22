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
import Graph from "./store/Graph";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { width } from "@mui/system";
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
        <Grid
          container
          item
          sx={{
            fontSize: 18,
            backgroundColor: "#008ac1",
            marginBottom: "0.5em",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              marginRight: 1,
              marginTop: "0.5em",
              marginLeft: "0.8em",
              backgroundColor: "#008ac1",
              color: "white",
              marginBottom: "0.5em",
            }}
          >
            <b>Cluster {cluster.id}</b>
          </Typography>
          <Divider component="h1" color="black" />
        </Grid>
        <Grid container item>
          {/*<Typography sx={{ fontSize: 15, marginLeft: 5, marginRight: 3 }}>
            <b>Nodes: </b>
            <em className="text-secondary" style={{ fontSize: 22 }}>
              <b>{cluster.node}</b>
            </em>
            {""}
          </Typography>*/}
          <Typography sx={{ fontSize: 15,  marginLeft: 5, marginRight: 3 }}>
            <b>Active Nodes: </b>
            <em className="text-primary" style={{ fontSize: 22 }}>
              {cluster.activeNode}{" "}
            </em>
          </Typography>
          <Typography sx={{ fontSize: 15, marginRight: 3 }}>
            <b>Inactive Nodes:</b>
            <em className="text-info" style={{ fontSize: 22 }}>
              {" "}
              <b>{cluster.node}</b>{" "}
            </em>
          </Typography>
          <Typography sx={{ fontSize: 15, marginRight: 3 }}>
            <b>Status:</b>
            {" "}
            <em className="text-danger" style={{ fontSize: 18 }}>
              <b>{cluster.status} </b>
            </em>
          </Typography>
        </Grid>
        <Grid container item>
          <Grid
            container
            item
            // xs={8}
            ml={2}
          >
            <Grid item mt={2} ml={2} mb={2} mr={2}>
              <Paper
                sx={{
                  height: 160,
                  width: 300,
                }}
              >
                <Graph data={data} title="Uptime" />
              </Paper>
            </Grid>
            <Grid item mt={2} ml={2} mb={2} mr={2}>
              <Paper
                sx={{
                  height: 160,
                  width: 300,
                }}
              >
                <Graph data={data1} title="Network Activity" />
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            item
            // xs={8}
            ml={2}
          >
            {" "}
            <Grid item mt={2} ml={2} mb={2} mr={2}>
              <Paper
                sx={{
                  height: 160,
                  width: 300,
                }}
              >
                <Graph data={data2} title="Load" />
              </Paper>
            </Grid>
            <Grid item mt={2} ml={2} mb={2} mr={2}>
              <Paper
                sx={{
                  height: 160,
                  width: 300,
                }}
              >
                <Graph data={data3} title="Memory" />
              </Paper>
            </Grid>
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
          <Container sx={{ mt: 2, mb: 4}}>
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
                //sx={{ height: 50}}
              >
                {/*<FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={c}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>*/}
                <List
                  sx={{
                    width: "90%",
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem
                    sx={{ backgroundColor: "#008ac1", color: "#fff", borderRadius: 5}}
                    key={`Clusters1`}
                  >
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