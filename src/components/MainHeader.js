import * as React from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signoutUser } from "../store/userSlice";
import { signoutAdmin } from "../store/adminSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../images/Mini Free Library.png";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isUser = useSelector((state) => state.user.isUser);
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    if (isUser) {
      dispatch(signoutUser());
    }

    if (isAdmin) {
      dispatch(signoutAdmin());
    }
  };

  useEffect(() => {
    if (!isUser && !isAdmin) {
      navigate("/", { replace: true });
    }
  }, [isUser, isAdmin, navigate]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={logo} alt="logo" className="logo-image" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="homepage" onClick={handleCloseNavMenu}>
                <Typography textAlign="center" className={classes.headerSmall}>
                  {isAdmin && <NavLink to="/myLibrary"> My Library</NavLink>}
                </Typography>
              </MenuItem>

              <MenuItem key="library" onClick={handleCloseNavMenu}>
                <Typography textAlign="center" className={classes.headerSmall}>
                  {isUser && <NavLink to="/library">All Libraries</NavLink>}
                  {isAdmin && <NavLink to="/newLibrary">Add Library</NavLink>}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img src={logo} alt="logo" className="logo-image" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="homepage"
              onClick={handleCloseNavMenu}
              className={classes.headerButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {isAdmin && <NavLink to="/myLibrary"> My Library</NavLink>}
            </Button>

            <Button
              key="library"
              onClick={handleCloseNavMenu}
              className={classes.headerButton}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {isUser && <NavLink to="/library">All Libraries</NavLink>}
              {isAdmin && <NavLink to="/newLibrary">Add Library</NavLink>}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={logoutHandler}>
                  {isUser || isAdmin ? "Logout" : "Login"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainHeader;
