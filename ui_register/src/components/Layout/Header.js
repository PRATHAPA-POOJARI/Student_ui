import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logo1 from "../../images/Logo1.jpg";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (path) => {
    navigate(path); // Reusable function for navigation
    setMobileOpen(false); // Close drawer after navigation
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" color={"goldenrod"} sx={{ my: 2, cursor: "pointer" }} onClick={() => handleNavigate("/home")}>
        <img src={Logo1} alt="logo" height={"40"} width="100" />
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li onClick={() => handleNavigate("/home")} style={{ cursor: "pointer" }}>
          Home
        </li>
        <li onClick={() => handleNavigate("/menu")} style={{ cursor: "pointer" }}>
          About
        </li>
        <li onClick={() => handleNavigate("/contact")} style={{ cursor: "pointer" }}>
          ಕನ್ನಡ ಕಲಿ
        </li>
        <li>
          <Button onClick={() => handleNavigate("/register")}>Login</Button>
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
            style={{ color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color={"goldenrod"}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => handleNavigate("/home")}
          >
            <img src={Logo1} alt="logo" height={"50"} width="100" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <ul className="navigation-menu">
              <li onClick={() => handleNavigate("/home")} style={{ cursor: "pointer", color: "black" }}>
                Home
              </li>
              <li onClick={() => handleNavigate("/menu")} style={{ cursor: "pointer", color: "black" }}>
                About
              </li>
              <li onClick={() => handleNavigate("/contact")} style={{ cursor: "pointer", color: "black" }}>
                ಕನ್ನಡ ಕಲಿ
              </li>
              <li>
                <Button onClick={() => handleNavigate("/register")}>Login</Button>
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
