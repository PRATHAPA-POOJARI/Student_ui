import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, Divider, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logo1 from "../../images/Logo1.png";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for Popover
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickLogin = (event) => {
    setAnchorEl(event.currentTarget); // Open popover on button click
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close popover
  };

  const handleSelectOption = (role) => {
    if(role== 'admin'){
      navigate("/admin")
    }
    else {
      navigate(`/login/${role}`)
    }
  };

  const open = Boolean(anchorEl); // Check if popover is open
  const id = open ? "simple-popover" : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        color={"goldenrod"}
        sx={{ my: 2, cursor: "pointer" }}
        onClick={() => navigate("/home")}
      >
        <img src={Logo1} alt="logo" height={"40"} width="100" />
      </Typography>
      <Divider />
      <div className="mobile-navigation">
        <Button onClick={() => navigate("/home")} sx={{ my: 2, width: "100%" }}>
          Home
        </Button>
        <Button onClick={() => navigate("/menu")} sx={{ my: 2, width: "100%" }}>
          About
        </Button>
        <Button onClick={() => navigate("/contact")} sx={{ my: 2, width: "100%" }}>
          ಕನ್ನಡ ಕಲಿ
        </Button>
        <Button onClick={handleClickLogin} sx={{ my: 2, width: "100%" }}>
          Login
        </Button>
      </div>
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
            onClick={() => navigate("/home")}
          >
            <img src={Logo1} alt="logo" height={"50"} width="100" />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => navigate("/home")}
                sx={{ cursor: "pointer", color: "black", textTransform: "none" }}
              >
                Home
              </Button>
              <Button
                onClick={() => navigate("/menu")}
                sx={{ cursor: "pointer", color: "black", textTransform: "none" }}
              >
                About
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                sx={{ cursor: "pointer", color: "black", textTransform: "none" }}
              >
                ಕನ್ನಡ ಕಲಿ
              </Button>
              <Button
                onClick={handleClickLogin}
                sx={{
                  cursor: "pointer",
                  color: "black",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Popover for Login Options */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Button onClick={() => handleSelectOption("admin")} sx={{ width: "100%" }}>
            Admin
          </Button>
          <Button onClick={() => handleSelectOption("student")} sx={{ width: "100%" }}>
            Student
          </Button>
          <Button onClick={() => handleSelectOption("lecturer")} sx={{ width: "100%" }}>
            Lecturer
          </Button>
        </Box>
      </Popover>

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
