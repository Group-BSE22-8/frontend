import React from "react";
import { styled, alpha } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from '@mui/icons-material/Delete';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import RestoreIcon from '@mui/icons-material/Restore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { applicationStatus } from "./store";
import Cookies from 'universal-cookie'

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


function AppMenu(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl); 
      
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
      
    const appStatus = (id, status) => {      
      dispatch(
         applicationStatus({
            id: id,
            status: status,
            user_id: cookies.get('cookie_data').id
         })
      );
  
      setAnchorEl(null);
      //props.updateStatus();
    };


    return (
       <>
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
          <MenuItem onClick={() => appStatus(props.app.id, 1)} disableRipple>
            <RestoreIcon/>
            Activate
          </MenuItem>
          <MenuItem onClick={() => appStatus(props.app.id, 0)} disableRipple>
            <UnpublishedIcon/>
            Disable
          </MenuItem>
          <MenuItem onClick={() => appStatus(props.app.id, 5)} disableRipple>
            <DeleteIcon />
            Delete
          </MenuItem>
        </StyledMenu>
      </>
    );
}


  export default AppMenu;
  