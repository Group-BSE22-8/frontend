import React from "react";
import { styled, alpha } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
import { getUsers, userStatus } from "./store";
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


function UserMenu(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookies = new Cookies()
    const [open_more, setMoreOpen] = React.useState(false);
    const [open_activate, setActOpen] = React.useState(false);
    const [open_disable, setDisOpen] = React.useState(false);
    const [open_delete, setDelOpen] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl); 
  
    React.useEffect(() => {
      
    }, [anchorEl])
 
    const handleModalClose = (name) => {      
      if (name == "activate") {
        setActOpen(false);
        
      } else if (name == "disable") {
        setDisOpen(false);

      } else if(name == "delete") {
        setDelOpen(false);

      } else if(name == "more") {
        setMoreOpen(false);
      }

      setAnchorEl(null);
    }
    

    const handleModalOpen = (name) => {
      if (name == "activate") {
        setActOpen(true);

      } else if (name == "disable") {
        setDisOpen(true);

      } else if(name == "delete") {
        setDelOpen(true);

      } else if(name == "more") {
        setMoreOpen(true);
      }

    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    }
  
    const setsComment = (event) => {
      setComment(event.target.value)
    };
  
    const onKeyDown = (e) => {
      e.stopPropagation();
    }

    const usersStatus = (id, status) => {
      if (comment != "") {
        dispatch(
          userStatus({
            id: id,
            status: status,
            user_id: cookies.get('cookie_data').id,
            comment: comment
          })
        );
    
        setAnchorEl(null);

      } else {
        alert("Invalid comment.")

      }
    };


    const openProjects = (user_id) => {
      navigate("/projects", { state:{user_id: user_id}})
    }


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
          <div>
            <MenuItem onClick={()=>handleModalOpen("more")} disableRipple>
              <VisibilityIcon/>
              View more
            </MenuItem>
            <Modal
              open={open_more}
              onClose={() => handleModalClose("more")}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                More about user
                </Typography>
                <hr/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Name: {props.user.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Beta User: {props.user.is_beta_user ? "TRUE" : "FALSE"}             
                </Typography><Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Verified: {props.user.verified ? "TRUE" : "FALSE"}             
                </Typography>
                <Button variant = "outlined" sx={{mt:4}} onClick = {()=>{openProjects(props.user.id)}}>View Projects</Button>
              </Box>
            </Modal>
          </div>

          <div>
            <MenuItem onClick={() => handleModalOpen("activate")} disableRipple>
              <RestoreIcon/>
              Activate
            </MenuItem>
            <Modal
              open={open_activate}
              onClose={() => handleModalClose("activate")}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Activate user
                </Typography>
                <hr/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to activate this user?
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
                <Button variant = "outlined" sx={{mt:4}} onClick = {() => handleModalClose("activate")}>No</Button>
                <Button variant = "outlined" sx={{mt:4, ml: 4}} 
                  onClick = {() => {
                    usersStatus(props.user.id, 1)
                    handleModalClose("activate")
                }}>Yes</Button>
              </Box>
            </Modal>
          </div>

          <div>
            <MenuItem onClick={() => handleModalOpen("disable")} disableRipple>
              <UnpublishedIcon/>
              Disable
            </MenuItem>
            <Modal
              open={open_disable}
              onClose={() => handleModalClose("disable")}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Disable user
                </Typography>
                <hr/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to disable this user?
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
                    usersStatus(props.user.id, 0)
                    handleModalClose("disable")
                  }}>Yes</Button>
              </Box>
            </Modal>
          </div>

          <div>
            <MenuItem onClick={() => handleModalOpen("delete")} disableRipple>
              <DeleteIcon />
              Delete
            </MenuItem>
            <Modal
              open={open_delete}
              onClose={() => handleModalClose("delete")}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete user
                </Typography>
                <hr/>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to delete this user?
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
                <Button variant = "outlined" sx={{mt:4}} onClick = {() => handleModalClose("delete")}>No</Button>
                <Button variant = "outlined" sx={{mt:4, ml: 4}} 
                   onClick = {() => {
                    usersStatus(props.user.id, 5);
                    handleModalClose("delete")
                   }}>Yes</Button>
              </Box>
            </Modal>
          </div>
        </StyledMenu>
      </>
    );
}


  export default UserMenu;
  