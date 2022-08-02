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
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import { getUsers, userStatus } from "./store";


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

const theme = createTheme();

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.users);
  const [users, setUsers] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const usersStatus = (id, status) => {
    dispatch(
       userStatus({
        id: id,
        status: status
       })
    );

    setAnchorEl(null);
  };


  React.useEffect(() => {
    dispatch(getUsers())

    addUsers();

  }, [store.users.length, anchorEl])
  

  const addUsers = () => {
    var users = [];
           
    for (var i = 0; i < store.users.length; i++) {
      var user = {};
      let id = store.users[i].id;

      user.name = <Link 
      href="/applications"
      onClick={() => {}}
      >{store.users[i].name}</Link>;
      user.email = store.users[i].email;
      user.date_created = store.users[i].date_created;
      user.role = store.users[i].roles[0].name;
      user.status = store.users[i].status == 1? <Chip label="active" color="success"/> : store.users[i].status == 0? <Chip label="inactive" /> : <Chip label="deleted" color="error"/>;;
      user.actions = <>
        <MoreVertIcon   
          onClick={handleClick}              
        />
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => usersStatus(id, 1)} disableRipple>
            <RestoreIcon/>
            Activate
          </MenuItem>
          <MenuItem onClick={() => usersStatus(id, 0)} disableRipple>
            <UnpublishedIcon/>
            Disable
          </MenuItem>
          <MenuItem onClick={() => usersStatus(id, 5)} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>
        </StyledMenu>
      </>;
      
      users.push(user);
    }

    setUsers(users);
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
            <Box sx={{mb: 2, mt: 2}}>
            <TextField
                id="date"
                label="Start"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date"
                label="End"
                type="date"
                defaultValue="2017-05-24"
                size="small"
                sx={{ width: 220, ml: 2, height: 20}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="outlined" sx={{ mt: 0.1, ml: 2 }} startIcon={<SearchIcon />}>Filter</Button>
              </Box>

              <MDBDataTable striped bordered small hover data={data} />
            </CardContent>
          </Card>
          <Copyright sx={{ pt: 4, mb: 4, position: "fixed", bottom:0, width:"100%", height:60}} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Users;