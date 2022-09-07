import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { adjustDrawer } from './store';
import CustomizedMenu from './menu';
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom";
import { AlignVerticalBottomOutlined } from '@mui/icons-material';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const theme = createTheme();

function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies()
  const store = useSelector(state => state.navigation)
  const user = useSelector(state => state.auth)
  const [username, setUsername] = React.useState("")

  //** ComponentDidMount
  React.useEffect(() => {
     if (!cookies.get('cookie_data')) {
       navigate("/")
     }
  })

  const toggleDrawer = () => {
    dispatch(adjustDrawer({open: true}));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx = {{backgroundColor: '#008ac1'}} position="absolute" open={store.open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton 
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(store.open && { display: 'none' }),
              }}
            >
              <MenuIcon sx ={{color: "#fff"}} username = {username}/>
            </IconButton>
            
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, color: "#fff"}}
            >
              Crane Cloud
            </Typography>
            {cookies.get('cookie_data') ? <CustomizedMenu/> : " "}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default TopBar;
