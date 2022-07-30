import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import TopBar from "../../components/navigation/appbar";
import SideBar from "../../components/navigation/sidebar";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MDBDataTable } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { Avatar } from "@mui/material";
import cluster from "../images/cluster.png";
import project from "../images/project.png";
import application from "../images/app.png";
import users from "../images/users.png";
import resource from "../images/resource.png";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { useSelector } from "react-redux";

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

const data = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dat = {
  columns: [
    {
      label: "Date Created",
      field: "date_create",
      sort: "asc",
      width: 150,
    },
    {
      label: "Action",
      field: "action",
      sort: "asc",
      width: 270,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 200,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 100,
    },
    {
      label: "User",
      field: "user",
      sort: "asc",
      width: 150,
    },
    {
      label: "Role",
      field: "role",
      sort: "asc",
      width: 100,
    },
  ],
  rows: [
    {
      name: "Tiger Nixon",
      position: "System Architect",
      office: "Edinburgh",
      age: "61",
      date: "2011/04/25",
      salary: "$320",
    },
  ],
};

function DashboardContent() {
  const store = useSelector((state) => state.dashboard);

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
            <Grid container spacing={3}>
              <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="clusters"
                      src={cluster}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Clusters:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.clusters}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="projects"
                      src={project}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Projects:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.projects}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="applications"
                      src={application}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Applications:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.applications}</Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="users"
                      src={users}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Users:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>{store.users}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    paddingTop: 5,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                      alt="Resources"
                      src={resource}
                    />
                  </Stack>

                  <Box
                    sx={{
                      pt: 2,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 18, marginRight: 1 }}>
                      Resources:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: 18 }}>56</Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
            </Grid>

            <Card sx={{ marginTop: 3 }}>
              <Box
                sx={{
                  fontSize: 10,
                  display: "flex",
                  backgroundColor: "#008ac1",
                  paddingLeft: 2,
                }}
              >
                <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
                  <b>System status</b>
                </Typography>
                <EqualizerIcon sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <LineChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                            top: 10,
                            right: 40,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#008ac1"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        System Activity
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <BarChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                            top: 10,
                            right: 40,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="pv" fill="#008ac1" />
                        </BarChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        Network Usage
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <PieChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                            top: 10,
                            right: 40,
                            left: 40,
                            bottom: 5,
                          }}
                        >
                          <Pie
                            data={data}
                            dataKey="pv"
                            outerRadius={75}
                            fill="#008ac1"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        Disk Usage
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} lg={3}>
                    <Paper
                      sx={{
                        height: 200,
                      }}
                    >
                      <ResponsiveContainer width="100%" height="85%">
                        <LineChart
                          width={500}
                          height={300}
                          data={data}
                          margin={{
                            top: 10,
                            right: 40,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#008ac1"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <Typography sx={{ textAlign: "center", fontSize: 15 }}>
                        Memory Usage
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ marginTop: 3 }}>
              <Box
                sx={{
                  fontSize: 10,
                  display: "flex",
                  backgroundColor: "#008ac1",
                  paddingLeft: 3,
                }}
              >
                <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
                  <b>Recent Activity</b>
                </Typography>
                <LocalActivityIcon sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <MDBDataTable striped bordered small hover data={dat} />
              </CardContent>
            </Card>
            <Copyright sx={{ pt: 4, mb: 4,  bottom:0, width:"100%", height:60}} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
