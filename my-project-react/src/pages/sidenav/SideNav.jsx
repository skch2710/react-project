import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdLogOut, IoIosPeople } from "react-icons/io";
import { Grid, Tooltip, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Home from "../home/Home";
import Hostel from "../hostel/Hostel";
import { handleLogout } from "./helper";
import logo from "../../assets/logo.png";

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MainAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const nav = [
  {
    resourceId: 1,
    resourceName: "Home",
    icon: <IoHomeOutline />,
    resourcePath: "/home",
    displayOrder: 1,
    component: Home,
  },
  {
    resourceId: 2,
    resourceName: "Hostellers",
    icon: <IoIosPeople />,
    resourcePath: "/hostel",
    displayOrder: 2,
    component: Hostel,
  },
];

export default function SideNav() {
  const [open, setOpen] = useState(true);
  const [navigation, setNavigation] = useState(nav);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const fullName = user
    ? user?.user?.firstName + " " + user?.user?.lastName
    : "";

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleCollapseToggle = (index) => {
    const updatedNavigation = navigation.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          collapsed: !item.collapsed,
        };
      }
      return item;
    });
    setNavigation(updatedNavigation);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MainAppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{ marginLeft: "30px" }}
            src={logo}
            alt="Logo"
            width={160}
            height={50}
          />
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "10px" }}>{fullName}</Typography>
            <Tooltip title="Logout" arrow>
              <IconButton onClick={handleLogout}>
                <IoMdLogOut style={{ color: "black" }} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </MainAppBar>
      <MainDrawer variant="permanent" open={open}>
        <Divider />
        <List sx={{ display: "block", marginTop: 8 }}>
          {navigation.map((item, index) =>
            item.subNav ? (
              <React.Fragment key={index}>
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.resourceName}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {item.collapsed ? (
                      <ExpandMoreIcon sx={{ marginLeft: open ? 10 : 0 }} />
                    ) : (
                      <ExpandLessIcon sx={{ marginLeft: open ? 10 : 0 }} />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={!item.collapsed}
                  timeout="auto"
                  unmountOnExit
                  key={`collapse_${index}`}
                >
                  <List component="div" disablePadding>
                    {item.subNav.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex} // Use subIndex as key
                        disablePadding
                        sx={{ display: "block", marginLeft: 1 }}
                      >
                        <ListItemButton
                          component={Link}
                          to={subItem.resourcePath}
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={subItem.resourceName}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.resourcePath}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.resourceName}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </MainDrawer>
      <Grid container sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Outlet />
      </Grid>
    </Box>
  );
}
