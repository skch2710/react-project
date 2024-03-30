import React, { useState } from 'react';
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
import { IoMdLogOut, IoIosPeople } from "react-icons/io";
import Employees from '../employees/Employees';
import { Tooltip, Typography } from '@mui/material';
import Hostel from '../hostel-redux/Hostel';
import YearlyReports from '../components/YearlyReports';
import MonthlyReports from '../components/MonthlyReports';
import FullReports from '../components/FullReports';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';

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

const nav = [
  {
    "resourceId": 1,
    "resourceName": "Home",
    "icon": <IoHomeOutline />,
    "resourcePath": "/home",
    "displayOrder": 1,
    "component": Home
  },
  {
    "resourceName": "Reports",
    "icon": <BarChartIcon />,
    "displayOrder": 2,
    "collapsed": true, // Initially collapsed
    "subNav": [
      {
        "resourceId": 2,
        "resourceName": "Full Reports",
        "icon": <RiIncreaseDecreaseLine />,
        "resourcePath": "/reports/full-reports",
        "displayOrder": 2,
        "component": FullReports
      },
      {
        "resourceId": 3,
        "resourceName": "Monthly",
        "icon": <CalendarMonthIcon sx={{ fontSize: 16 }} />,
        "resourcePath": "/reports/monthly",
        "displayOrder": 2,
        "component": MonthlyReports
      },
      {
        "resourceId": 4,
        "resourceName": "Yearly",
        "icon": <ShowChartIcon sx={{ fontSize: 16 }} />,
        "resourcePath": "/reports/yearly",
        "displayOrder": 2,
        "component": YearlyReports
      }
    ]
  },
  {
    "resourceId": 5,
    "resourceName": "Hostellers",
    "icon": <IoIosPeople />,
    "resourcePath": "/hostellers",
    "displayOrder": 3,
    "component": Hostel
  },
];

export default function SideNav() {
  const [open, setOpen] = useState(true);
  const [navigation, setNavigation] = useState(nav);

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
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: '10px' }}>
              Sathish Kumar Ch
            </Typography>
            <Tooltip title="Logout" arrow>
              <IconButton
                onClick={handleDrawer}
              >
                <IoMdLogOut style={{ color: 'red' }} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </MainAppBar>
      <MainDrawer variant="permanent" open={open}>
        <Divider />
        <List sx={{ display: 'block', marginTop: 8 }}>
          {navigation.map((item, index) => (
            item.subNav ? (
              <React.Fragment key={index}>
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleCollapseToggle(index)}
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
                    <ListItemText primary={item.resourceName} sx={{ opacity: open ? 1 : 0 }} />
                    {item.collapsed ? <ExpandMoreIcon sx={{ marginLeft: open ? 10 : 0 }} /> :
                      <ExpandLessIcon sx={{ marginLeft: open ? 10 : 0 }} />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={!item.collapsed} timeout="auto" unmountOnExit key={`collapse_${index}`}>
                  <List component="div" disablePadding>
                    {item.subNav.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex} // Use subIndex as key
                        disablePadding
                        sx={{ display: 'block', marginLeft: 1 }}
                      >
                        <ListItemButton
                          component={Link} to={subItem.resourcePath}
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
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.resourceName} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link} to={item.resourcePath}
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
                  <ListItemText primary={item.resourceName} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          ))}
        </List>
      </MainDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 8 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {nav.map((itemRout, index) => (
            itemRout.subNav ?
              itemRout.subNav.map((subItem, subIndex) => (
                <Route key={subIndex} path={subItem.resourcePath} element={<subItem.component />} />
              ))
              :
              <Route key={index} path={itemRout.resourcePath} element={<itemRout.component />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}
