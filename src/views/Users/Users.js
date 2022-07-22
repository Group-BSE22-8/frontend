import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TopBar from "../../components/navigation/appbar";
import SideBar from "../../components/navigation/sidebar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { MDBDataTable } from "mdbreact";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import People from "@mui/icons-material/People";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

const data = {
  columns: [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 150,
    },

    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
    },

    {
      label: "Role",
      field: "role",
      sort: "asc",
      width: 200,
    },
    {
      label: "Status",
      field: "Staus",
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
      id: "U01",
      name: "Edina",
      role: "System Architect",
      status: "Active",
      actions: <MoreVertIcon />,
    },
    /*{
      id: "U02",
      name: "System Architect",
      role: "Shanice",
      status: "Active1",
    },
    {
      id: "U04",
      name: "System Architect",
      role: "Sharifah",
      status: "Active",
    },
    {
      id: "U05",
      name: "System Architect",
      role: "Ehjik",
      status: "Active",
    },
    {
      id: "U06",
      name: "System Architect",
      role: "Edinburgh",
      status: "Active",
    },
    {
      id: "U07",
      name: "System Architect",
      role: "Edinburgh",
      status: "Active",
    },*/
  ],
};

const theme = createTheme();
function Users() {
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
          <Card>
              <Box
                sx={{
                  fontSize: 10,
                  display: "flex",
                  backgroundColor: "#008ac1",
                  paddingLeft: 2,
                }}
              >
                <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
                  <b>Users</b>
                </Typography>
                <People sx={{ color: "#fff", marginRight: 2 }} />
              </Box>

            <CardContent xs={12} component={Paper}>
              <MDBDataTable striped bordered small hover data={data} />
            </CardContent>
          </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Users;