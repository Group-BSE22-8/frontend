import * as React from "react";
import { MDBDataTable } from "mdbreact";
import CardContent from "@mui/material/CardContent";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const data1 = {
  columns: [
    {
      label: "Id",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Date Created",
      field: "dateCreated",
      sort: "asc",
      width: 270,
    },
    {
      label: "Action",
      field: "action",
      sort: "asc",
      width: 200,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 100,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 150,
    },
    {
      label: "User",
      field: "user",
      sort: "asc",
      width: 100,
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
      id: 1,
      dateCreated: "May 12 202 18:05",
      action: "Create Project",
      description: "Created project",
      status: "Info",
      user: "Nakagwe Sharifah",
      role: "User",
    },
    {
      id: 2,
      dateCreated: "May 12 202 18:05",
      action: "Create Project",
      description: "Created project",
      status: "Anfo",
      user: "Nakagwe Sharifah",
      role: "User",
    },
    {
      id: 3,
      dateCreated: "May 12 202 18:05",
      action: "Create Project",
      description: "Created project",
      status: "Bnfo",
      user: "Nakagwe Sharifah",
      role: "User",
    },
    {
      id: 4,
      dateCreated: "May 12 202 18:05",
      action: "Create Project",
      description: "Created project",
      status: "Cnfo",
      user: "Nakagwe Sharifah",
      role: "User",
    },
    {
      id: 5,
      dateCreated: "May 12 202 18:05",
      action: "Create Project",
      description: "Created project",
      status: "Info",
      user: "Nakagwe Sharifah",
      role: "User",
    },
  ],
};

export default function Table() {
  return (
    <>
      {/* <Typography sx={{ flexGrow: 1, fontSize: 17, color: "#fff" }}>
        <b>Recent Activity</b>
      </Typography>
      <LocalActivityIcon sx={{ color: "#fff", marginRight: 2 }} /> */}
      <CardContent xs={12} component={Paper}>
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

        <MDBDataTable striped bordered small hover data={data1} />
      </CardContent>
    </>
  );
}
