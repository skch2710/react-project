import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { RiIncreaseDecreaseLine } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { Routes, Route } from 'react-router-dom';
import About from '../components/About';
import Home from '../components/Home';
import Counter from '../increment-test/Counter';
import NotFound from '../components/NotFound';
import LoginPage from '../login-page/LoginPage';
import { IoMdLogOut ,IoIosPeople } from "react-icons/io";
import Employees from '../employees/Employees';
import { Tooltip } from '@mui/material';
import Hostel from '../hostel/Hostel';

const drawerWidth = 180;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const MainAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const navigationItems = [
  { path: '/home', text: 'Home', icon: <IoHomeOutline />, component: Home },
  { path: '/about', text: 'About', icon: <BsInfoCircle />, component: About },
  { path: '/counter', text: 'Counter', icon: <RiIncreaseDecreaseLine />, component: Counter },
  { path: '/employees', text: 'Employees', icon: <FaPeopleGroup />, component: Employees },
  { path: '/hostel', text: 'Hostel', icon: <IoIosPeople />, component: Hostel },
];

export default function SideNav() {
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainAppBar position="fixed" sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <img style={{ marginLeft: '30px' }} src='/logo-one.png' width={160} height={50} />
          <Tooltip title="Logout" arrow>
            <IconButton
              onClick={handleDrawer}
              style={{
                marginLeft: 'auto',
                // cursor: 'pointer',
              }}>
              <IoMdLogOut />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </MainAppBar>
      <MainDrawer variant="permanent" open={open}>
        <Divider />
        <List sx={{ display: 'block', marginTop: 8, }}>
          {navigationItems.map((item, index) => (
            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link} to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </MainDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {navigationItems.map((item) => (
            <Route key={item.path} path={item.path} element={<item.component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}