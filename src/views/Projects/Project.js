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
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./store";


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


const data = {
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
      label: "Description",
      field: "description",
      sort: "asc",
      width: 200,
    },
    {
      label: "Created By",
      field: "created_by",
      sort: "asc",
      width: 150,
    },
    {
      label: "Date Created",
      field: "date_created",
      sort: "asc",
      width: 150,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 100,
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
      name: <Link href="/applications">Tiger Nixon</Link>,
      applicatio: "System Architect",
      descriptio: "Edinburgh",
      statu: "61",
      created_b: "2011/04/25",
      actions: <MoreVertIcon />,
    },
  ],
};

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.projects);

  React.useEffect(() => {
     dispatch(getProjects())
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
              <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
              <Grid item xs={12} sm={2} md={2} lg={4}>
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
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 20 }}>Projects</Typography>
                    <Typography sx={{ fontSize: 30 }}>38</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 16, flexGrow: 1, color: "green" }}
                    >
                      Active: <span>26</span>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 16, float: "right", color: "red" }}
                    >
                      Disabled: <span>35</span>
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={2} md={2} lg={4}>
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
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: 20 }}>Applications</Typography>
                    <Typography sx={{ fontSize: 30 }}>54</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 16, flexGrow: 1, color: "green" }}
                    >
                      Active: <span>26</span>
                    </Typography>
                    <Typography
                      align="right"
                      sx={{ fontSize: 16, color: "red" }}
                    >
                      Disabled: <span>35</span>
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
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
                  <b>Projects</b>
                </Typography>
                <FolderIcon sx={{ color: "#fff", marginRight: 2 }} />
              </Box>
              <CardContent>
                <MDBDataTable striped bordered small data={data} />
              </CardContent>
            </Card>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
