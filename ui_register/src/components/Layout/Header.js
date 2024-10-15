// Header.js
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,TextField
} from "@mui/material";
import Logo from "../../images/Logo.jpg";
import Logo1 from "../../images/Logo1.jpg";

import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleLogout = () => {
  //   setOpenLogoutDialog(true);
  // };
  const handleLogout = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdLQ7LoYCjrAZaQRU0_7-ZEcL_xNfozvtKCBP3CUyNLI0naYA/viewform?usp=sf_link', '_blank');
  };

  const handleConfirmLogout = () => {
    setOpenLogoutDialog(false);
    navigate('/'); // Redirect to the root path, which renders the LoginPage
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{  textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
       
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <img src={Logo1} alt="logo" height={"40"} width="100" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/home"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/menu"}>About</NavLink>
        </li>

        <li>
          <NavLink to={"/contact"}>ಕನ್ನಡ ಕಲಿ</NavLink>
        </li>
        <li>
          <Button onClick={handleLogout}>Login</Button>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "white" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
              style={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={Logo} alt="logo" height={"50"} width="100" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink activeClassName="active" to={"/home"} style={{ color: 'black' }}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"} style={{ color: 'black' }}>About</NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"} style={{ color: 'black' }}>ಕನ್ನಡ ಕಲಿ</NavLink>
                </li>
                <li>
                  <Button onClick={handleLogout}> Login</Button>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>

      {/* <Dialog
  open={openLogoutDialog}
  onClose={handleCloseLogoutDialog}
  PaperProps={{
    style: {
      minWidth: '10px',
      minHeight: '10px', // Set the minimum height of the dialog box
    },
  }}
>
  <DialogTitle>Signup</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Name"
      type="text"
      fullWidth
    />
    <TextField
      margin="dense"
      id="phone"
      label="Phone Number"
      type="tel"
      fullWidth
    />
    <TextField
      margin="dense"
      id="email"
      label="Email Address"
      type="email"
      fullWidth
    />

<TextField
      margin="dense"
      id="password"
      label="Enter password"
      type="password"
      fullWidth
    />
    <TextField
      margin="dense"
      id="confirm-password"
      label="Enter confirm password"
      type="confirm-password"
      fullWidth
    />
    <TextField
      margin="dense"
      id="dob"
      label="Date of Birth"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      margin="dense"
      id="country"
      label="Country"
      type="text"
      fullWidth
    />
    
  </DialogContent>
  <DialogActions>
  <Button onClick={handleCloseLogoutDialog}>Login</Button>
    <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
    <Button onClick={handleConfirmLogout}>Submit</Button>
  </DialogActions>
</Dialog> */}
    </>
  );
};

export default Header;
