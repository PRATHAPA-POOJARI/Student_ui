import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
// import Logo from "../../images/Logo.jpg";
import Logo1 from "../../images/Logo1.jpg";
import "../../styles/HeaderStyles.css";
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();  // useNavigate hook to navigate programmatically

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    navigate("/register");  // Navigate to Login page when clicked
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" color={"goldenrod"} sx={{ my: 2 }}>
        <img src={Logo1} alt="logo" height={"40"} width="100" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/menu">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">ಕನ್ನಡ ಕಲಿ</NavLink>
        </li>
        <li>
          <Button onClick={handleLoginClick}>Login</Button>  {/* Button to trigger login page */}
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <AppBar component={"nav"} sx={{ bgcolor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
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
          {/* //   <img src={Logo} alt="logo" height={"50"} width="100" /> */}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="navigation-menu">
              <li>
                <NavLink to="/home" style={{ color: 'black' }}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/menu" style={{ color: 'black' }}>About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" style={{ color: 'black' }}>ಕನ್ನಡ ಕಲಿ</NavLink>
              </li>
              <li>
                <Button onClick={handleLoginClick}>Login</Button>  {/* Button to navigate to login */}
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
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
