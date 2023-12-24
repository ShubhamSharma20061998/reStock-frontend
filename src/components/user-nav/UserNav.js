import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styles from "./UserNav.module.css";
import logo from "../../assets/logo-no-background.png";
import user from "../../assets/undraw_profile_data_re_v81r.svg";
import { handleLogOut } from "../../utils/projectUtils";
import { startCartItemsListing } from "../../actions/cart-actions";

const UserNav = props => {
  const dispatch = useDispatch();
  const [userID, setUserID] = useState("");

  const pages = [
    { title: "Home", path: "/landingPage" },
    { title: "Orders", path: `/orders/${userID}` },
    { title: "Profile", path: `/user-profile/${userID}` },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const res = localStorage.getItem("userID");
    setUserID(res);
    dispatch(startCartItemsListing());
  }, []);

  const settings = [{ title: "Logout", path: "/" }];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (title, path) => {
    if (title == "Home") {
      navigate(path);
    } else if (title == "Profile") {
      navigate(path);
    } else if (title == "Orders") {
      navigate(path);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (title, path) => {
    if (title === "Logout") {
      handleLogOut();
      navigate(path);
    }
    setAnchorElUser(null);
  };
  const cartData = useSelector(state => {
    return state.cart.selectedItems;
  });

  const handleLogoClick = () => {
    navigate("/landingPage");
  };
  return (
    <AppBar position="static" className={styles.navMainContainer}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src={logo}
            alt="logo"
            className={`${styles.logo_desktop} cursorPointer`}
            onClick={handleLogoClick}
          />

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
              {pages.map(({ title, path }) => (
                <MenuItem
                  key={title}
                  onClick={e => {
                    handleCloseNavMenu(title, path);
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img
            src={logo}
            alt="logo"
            className={`${styles.logo_mobile} cursorPointer`}
            onClick={handleLogoClick}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ title, path }) => (
              <Button
                key={title}
                onClick={e => {
                  handleCloseNavMenu(title, path);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className={styles.sideNavMenu}>
            <Badge
              badgeContent={cartData?.length}
              color="secondary"
              className={`${styles.cartBadge} cursorPointer`}
            >
              <ShoppingCartOutlinedIcon onClick={() => navigate(`/cart`)} />
            </Badge>
            <Tooltip title="Logout">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user} />
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
              {settings.map(({ title, path }) => (
                <MenuItem
                  key={title}
                  onClick={e => {
                    handleCloseUserMenu(title, path);
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserNav;
