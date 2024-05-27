import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Removed unused import statement

function Navbar({ page }) {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const settings = ["Profile", "Dashboard", "Logout"];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [isClosing, setIsClosing] = React.useState(false);
  const userData = useSelector((state) => state.userData.userInfo);

  const handleDrawerToggle = () => {
    // if (!isClosing) {
    setMobileOpen(!mobileOpen);
    // }
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `100%` },
        ml: { sm: `${drawerWidth}px` },
        background:
          "linear-gradient(90deg, rgba(252,176,69,1) 10%, rgba(253,29,29,1) 91%)"
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{ width: "40px", height: "40px", mr: 1 }}
            // alt="AppLogo"
            src="./images/sirviLogo.png"
          />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          SIRVIAPP
        </Typography>
        {page === "landingPage" && (
          <Box sx={{ flexGrow: 0, position: "absolute", right: "20px" }}>
            <Button
              color="inherit"
              sx={{ marginRight: 2 }}
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
        )}
        {page === "home" && (
          <Box sx={{ flexGrow: 0, position: "absolute", right: "20px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userData.profile_pic}
                  sx={{ bgcolor: "rgba(252,176,69,1)", color: "#fff" }}
                ></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
Navbar.propTypes = {
  page: PropTypes.string.isRequired // Adding prop types validation
};
export default Navbar;
