import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/login";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyle = makeStyles((theme) => ({
  logo: {
    flex: 1,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.login.isAuth);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Typography className={classes.logo}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>PI-THEIYW</Link>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button
              variant="contained"
              className={classes.button}
              component={Link}
              to={"/create"}
              color="secondary"
            >
              สร้างทัวร์
            </Button>
            {isAuth && (
              <Fragment>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  disableScrollLock={true}
                >
                  <MenuItem
                    component={Link}
                    to={"/profile"}
                    onClick={handleClose}
                  >
                    โปรไฟล์
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={"/mytour"}
                    onClick={handleClose}
                  >
                    ทัวร์ของฉัน
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={"/messages"}
                    onClick={handleClose}
                  >
                    ข้อความ
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={"/favorite"}
                    onClick={handleClose}
                  >
                    รายการโปรด
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={"/transcript"}
                    onClick={handleClose}
                  >
                    แจ้งโอนเงิน
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={"/"}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    ออกจากระบบ
                  </MenuItem>
                </Menu>
              </Fragment>
            )}
            {!isAuth && (
              <Fragment>
                <Button
                  component={Link}
                  className={classes.button}
                  to={"/register"}
                >
                  Signup
                </Button>
                <Button
                  component={Link}
                  className={classes.button}
                  to={"/login"}
                >
                  Login
                </Button>
              </Fragment>
            )}
          </div>
          <div className={classes.sectionMobile}></div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
