import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled, alpha } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
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
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import RestoreIcon from '@mui/icons-material/Restore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getLogs, userStatus } from "./store";
import Modal from '@mui/material/Modal';
import UserMenu from "./Menu";

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

const theme = createTheme();

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const [users, setUsers] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [status, setStatus] = React.useState(0);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get("date1") && data.get("date2")) {
      setStart(new Date(data.get("date1")).toLocaleDateString());
      setEnd(new Date(data.get("date2")).toLocaleDateString());
    } else {
      setStart("");
    }
  };


  const updateStatus = () => {
    setStatus(Math.random(10, 1000000))
  };

  
  React.useEffect(() => {
    dispatch(getLogs())
    dispatch(getUsers())

    addUsers();
    addLogs();

  }, [store.users.length, store.user_logs.length, status, start, end])
  

  const addUsers = () => {
    var users = [];

    for (var i = 0; i < store.users.length; i++) {
      var user = {};

      user.id = store.users[i].id;
      user.name = <Link 
      href="/applications"
      onClick={() => {}}
      >{store.users[i].name}</Link>;
      user.is_beta_user = store.users[i].is_beta_user;
      user.verified = store.users[i].name.verified;
      user.email = store.users[i].email;
      user.date_created = store.users[i].date_created;
      user.role = store.users[i].roles[0].name;
      user.status = store.users[i].status == 1? <Chip label="active" color="success"/> : store.users[i].status == 0? <Chip label="inactive" /> : <Chip label="deleted" color="error"/>;;
      user.actions = <UserMenu user = {user} updateStatus = {updateStatus}/>;
      
      users.push(user);
    }

    setUsers(users);
  }


  const addLogs = () => {
    var logs = [];
           
    for (var i = 0; i < store.user_logs.length; i++) {
      var date = new Date(store.user_logs[i].date_created).toLocaleDateString()
      if(!(date >= start && date <= end) && start != '' && end != '') {
        continue;
      }

      var log = {};

      log.performed_by = store.user_logs[i].user;
      log.user_name = store.user_logs[i].user;
      log.action = store.user_logs[i].action;
      log.date_created = store.user_logs[i].date_created;
      
      logs.push(log);
    }

    setLogs(logs);
  }


  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
  
      {
        label: "Email",
        field: "email",
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
        label: "Date Created",
        field: "date_created",
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
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 100,
      },
    ],
    rows: users
  };
  

  const user_logs = {
    columns: [
      {
        label: "Performed By",
        field: "performed_by",
        sort: "asc",
        width: 150,
      },
      {
        label: "User Name",
        field: "user_name",
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
                  sx={{ width: 220 }}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  name="date2"
                  label="End"
                  type="date"
                  //defaultValue="2017-05-24"
                  size="small"
                  sx={{ width: 220, ml: 2, height: 20}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button type="submit" variant="outlined" sx={{ mt: 0.1, ml: 2 }} startIcon={<SearchIcon />}>Filter</Button>
              </Box>

              <MDBDataTable striped bordered small hover data={data} />
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
                    name="date1"
                    label="Start"
                    type="date"
                    //defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    name="date2"
                    label="End"
                    type="date"
                    //defaultValue="2017-05-24"
                    size="small"
                    sx={{ width: 220, ml: 2, height: 20}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Button type="submit" variant="outlined" sx={{ mt: 0.1, ml: 2 }} startIcon={<SearchIcon />}>Filter</Button>
                </Box>
                <MDBDataTable striped bordered small  data = {user_logs}/>
              </CardContent>
            </Card>
          <Copyright sx={{ pt: 4, mb: 4, bottom:0, width:"100%", height:60}} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Users;