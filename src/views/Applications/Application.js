import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import TopBar from "../../components/navigation/appbar";
import SideBar from "../../components/navigation/sidebar";
import { MDBDataTable } from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AppsIcon from "@mui/icons-material/Apps";
import { Button } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { getApps } from "./store";

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
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Alias",
      field: "alias",
      sort: "asc",
      width: 270,
    },
    {
      label: "Port",
      field: "port",
      sort: "asc",
      width: 200,
    },
    {
      label: "Date Created",
      field: "status",
      sort: "asc",
      width: 100,
    },
    {
      label: "Has Domain Name",
      field: "has_domain_name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Actions",
      field: "actions",
      sort: "asc",
      width: 100,
    },
  ],
  rows: [
    {
      name: <Link href="#">Tiger Nixon</Link>,
      applicatio: "System Architect",
      descriptio: "Edinburgh",
      statu: "61",
      created_by: "2011/04/25",
      actions: <MoreVertIcon />,
    }
  ],
};

export default function Application() {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.applications);

  React.useEffect(() => {
     dispatch(getApps(1))
  }, [])

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
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 15 }}>
                    <b>
                      <u>Project Alpha</u>
                    </b>
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>
                    Created By: John Doe
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>
                    Date Created: June 08 2022
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography sx={{ fontSize: 15 }}>
                      Status: Active
                    </Typography>
                    <Button
                      style={{
                        textTransform: "none",
                        height: 20,
                        marginTop: 3,
                        marginLeft: 8,
                        outline: "none",
                      }}
                      sx={{ border: 1, borderRadius: 2 }}
                    >
                      Disable
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={3} md={3} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 17 }}>Applications</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 40 }}>26</Typography>
                      <Typography sx={{ fontSize: 12 }}>Active</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 40 }}>35</Typography>
                      <Typography sx={{ fontSize: 12 }}>Disabled</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={2}>
                <Paper
                  sx={{
                    p: 2,
                    height: 160,
                    ":hover": {
                      boxShadow: 5,
                    },
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 17 }}>Resources</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 40 }}>43</Typography>
                      <Typography sx={{ fontSize: 12 }}>Active</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 40 }}>12</Typography>
                      <Typography sx={{ fontSize: 12 }}>Disabled</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={3} md={3} lg={5}>
                <Paper
                  sx={{
                    p: 2,
                    height: 200,
                    ":hover": {
                      boxShadow: 5,
                    },
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
                    Activity
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

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
                  <b>Applications</b>
                </Typography>
                <AppsIcon sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <MDBDataTable striped bordered small data={dat} />
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
                <MDBDataTable striped bordered small data={dat} />
              </CardContent>
            </Card>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
