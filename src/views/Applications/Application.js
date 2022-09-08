import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled, alpha } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Modal from '@mui/material/Modal';
import Link from "@mui/material/Link";
import TextField from '@mui/material/TextField';
import Chip from "@mui/material/Chip";
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
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppMenu from "./Menu";

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
import { getApps, getLogs, getOwner, databaseCount, applicationStatus, appCount, getProjectActivity, disableProject } from "./store";
import Cookies from 'universal-cookie'
import { useNavigate,useLocation } from "react-router-dom";

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

const date = new Date();
const month = parseInt(date.getMonth() + 1) < 10 ? "-0" + parseInt(date.getMonth() + 1) : "-" + parseInt(date.getMonth() + 1);
const day = date.getDate()  < 10 ? "-0" + date.getDate()  : "-" + date.getDate();
const today = date.getFullYear() + month + day;

const theme = createTheme();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 100,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



export default function Application() {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const store = useSelector((state) => state.applications);
  const cookies = new Cookies()
  const [apps, setApps] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [log_start, setLogStart] = React.useState('');
  const [log_end, setLogEnd] = React.useState('');
  const [app_start, setAppStart] = React.useState('');
  const [app_end, setAppEnd] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [open_disable, setDisOpen] = React.useState(false);
  const [app_min_date, setAppMinDate] = React.useState('');
  const [log_min_date, setLogMinDate] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl); 
  

  const setAppDate = (event) => {
    setAppMinDate(event.target.value)
  };
  
  const setLogDate = (event) => {
    setLogMinDate(event.target.value)
  };


  const handleModalClose = () => {
    setDisOpen(false);
    setAnchorEl(null);
  }


  const handleModalOpen = () => {
      setDisOpen(true);
  };

  const setsComment = (event) => {
    setComment(event.target.value)
  };

  const onKeyDown = (e) => {
    e.stopPropagation();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("date1") && data.get("date2")) {
      setAppStart(new Date(data.get("date1")).toLocaleDateString());
      setAppEnd(new Date(data.get("date2")).toLocaleDateString());

    } else if (data.get("date3") && data.get("date4")) {
      setLogStart(new Date(data.get("date3")).toLocaleDateString());
      setLogEnd(new Date(data.get("date4")).toLocaleDateString());

    } else {
      setLogStart("");
      setAppStart("");

    }
  };


  React.useEffect(() => {
     if (!cookies.get('project_data')) {
        navigate("/projects")
     }

     dispatch(getOwner(cookies.get('project_data').owner_id))
     dispatch(appCount())
     dispatch(getLogs())
     dispatch(getApps(cookies.get('project_data').project_id))
     dispatch(databaseCount({project_id: cookies.get('project_data').project_id}))

     addApps();
     addLogs();

  }, [store.apps.length, store.app_logs.length, store.app_status, app_start, app_end, log_start, log_end, anchorEl])


  const projectStatus = (id, status) => {
    if (comment != "") {
    dispatch(
      disableProject({
        id: id,
        status: status,
        comment: comment,
        user_id: cookies.get('cookie_data').id
     })
    )

      setAnchorEl(null);
      alert("Project Disabled.")

      navigate("/projects")

    } else {
      alert("Invalid comment.")
    }
  };

  const addApps = () => {
    var apps = [];
           
    for (var i = 0; i < store.apps.length; i++) {
      var date = new Date(store.apps[i].date_created).toLocaleDateString()
      if(!(date >= app_start && date <= app_end) && app_start != '' && app_end != '') {
        continue;
      }

      var app = {};
      let id = store.apps[i].id;

      app.name = <Link
       onClick={() => {}}
       >{store.apps[i].name}</Link>;
      app.id = id;
      app.alias = store.apps[i].alias;
      app.port = store.apps[i].port;
      app.date_created = store.apps[i].date_created;
      app.has_custom_domain = store.apps[i].has_custom_domain ? "true" : "false";
      app.status = store.apps[i].status == 1? <Chip label="active" color="success"/> : store.apps[i].status == 0? <Chip label="inactive" /> : <Chip label="deleted" color="error"/>;
      app.actions = <AppMenu app = {app}/>;
      
      //console.log(project)

      apps.push(app);
    }

    setApps(apps);
  }



  const addLogs = () => {
    var logs = [];
           
    for (var i = 0; i < store.app_logs.length; i++) {
      var date = new Date(store.app_logs[i].date_created).toLocaleDateString()
      if(!(date >= log_start && date <= log_end) && log_start != '' && log_end != '') {
        continue;
      }

      var log = {};

      log.performed_by = store.app_logs[i].user;
      log.app_name = store.app_logs[i].app;
      log.action = store.app_logs[i].action;
      log.comment = store.app_logs[i].comment;
      log.date_created = store.app_logs[i].date_created;
      
      logs.push(log);
    }

    setLogs(logs);
  }


  const apps_data = {
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
        field: "date_created",
        sort: "asc",
        width: 100,
      },
      {
        label: "Has Custom Domain",
        field: "has_custom_domain",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
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
    rows: apps
  };


  const app_logs = {
    columns: [
      {
        label: "Performed By",
        field: "performed_by",
        sort: "asc",
        width: 150,
      },
      {
        label: "App Name",
        field: "app_name",
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
        label: "Comment",
        field: "comment",
        sort: "asc",
        width: 270,
      },
      {
        label: "Date Created",
        field: "date_created",
        sort: "asc",
        width: 100,
      }
    ],
    rows: logs
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
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} md={3} lg={4}>
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
                      <u>{cookies.get('project_data').name}</u>
                    </b>
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>
                    Created By: {store.owner}
                  </Typography>
                  <Typography sx={{ fontSize: 15 }}>
                    Date Created: {cookies.get('project_data').date_created}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      mt: 0.5
                    }}
                  >
                    <span sx ={{color: "black"}}>Status:</span>
                    <Typography sx={{ mt: 0.1, ml: 1, mr: 2, fontSize: 15, color : cookies.get('project_data').status ==1? "green" : cookies.get('project_data').status ==0 ? "gray" : "red"}}>
                       {cookies.get('project_data').status ==1? "Active" : cookies.get('project_data').status ==0 ? "Inactive" : "Deleted"}
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
                      onClick={() => handleModalOpen()}
                    >
                      Disable
                    </Button>
                  </Box>

                  <Modal
                    open={open_disable}
                    onClose={() => handleModalClose("disable")}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      Disable project.
                      </Typography>
                      <hr/>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to disable this project?
                      </Typography>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter comment"
                        name="comment"
                        autoFocus
                        onChange={setsComment}
                        onKeyDown = {onKeyDown}
                      />
                      <Button variant = "outlined" sx={{mt:4}} onClick = {() => handleModalClose("disable")}>No</Button>
                      <Button variant = "outlined" sx={{mt:4, ml: 4}}
                        onClick = {() => {
                          projectStatus(cookies.get('project_data').project_id, 0)
                          handleModalClose("disable")
                        }}>Yes</Button>
                    </Box>
                  </Modal>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={3} md={3} lg={4}>
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
                      <Typography sx={{ fontSize: 40 }}>{store.active_apps}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Active</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 40 }}>{store.inactive_apps}</Typography>
                      <Typography sx={{ fontSize: 12 }}>Disabled</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={3} md={3} lg={4}>
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
                    <Typography sx={{ fontSize: 17 }}>Databases</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                      <Typography sx={{ fontSize: 50 }}>{store.databases}</Typography>
                    </Box>
                  </Box>
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
                <Box 
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}              
                  sx={{mb: 2, mt: 2}}>
                  <TextField
                    name="date1"
                    label="Start"
                    type="date"
                    //defaultValue="2017-05-24"
                    onChange={setAppDate}
                    sx={{ width: 220 }}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}

                    inputProps={{
                      max: today
                    }}  
                  />
                  <TextField
                    name="date2"
                    label="End"
                    type="date"
                    //defaultValue="2017-05-24"
                    disabled = {app_min_date ? false : true}
                    size="small"
                    sx={{ width: 220, ml: 2, height: 20}}
                    InputLabelProps={{
                      shrink: true,
                    }}

                    inputProps={{
                      min: app_min_date,
                      max: today
                    }}
                  />
                  <Button type="submit" variant="outlined" sx={{ mt: 0.1, ml: 2 }} startIcon={<SearchIcon />}>Filter</Button>
                </Box>
                <MDBDataTable striped bordered small data={apps_data} />
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
                <Box 
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}              
                  sx={{mb: 2, mt: 2}}>
                  <TextField
                    name="date3"
                    label="Start"
                    type="date"
                    //defaultValue="2017-05-24"
                    onChange={setLogDate}
                    sx={{ width: 220 }}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}

                    inputProps={{
                      max: today
                    }}
                  />
                  <TextField
                    name="date4"
                    label="End"
                    type="date"
                    //defaultValue="2017-05-24"
                    disabled = {log_min_date ? false : true}
                    size="small"
                    sx={{ width: 220, ml: 2, height: 20}}
                    InputLabelProps={{
                      shrink: true,
                    }}

                    inputProps={{
                      min: log_min_date,
                      max: today
                    }}
                  />
                  <Button type="submit" variant="outlined" sx={{ mt: 0.1, ml: 2 }} startIcon={<SearchIcon />}>Filter</Button>
                </Box>
                <MDBDataTable striped bordered small  data = {app_logs}/>
              </CardContent>
            </Card>
            <Copyright sx={{ pt: 4, mb: 4, bottom:0, width:"100%", height:60}} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
