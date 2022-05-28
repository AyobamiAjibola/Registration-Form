import React, {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import { Switch, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";

const drawerWidth = 240;

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export default function Sidebar(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItem=[
    {
        path:"/dash",
        name:"Dashboard",
        icon:<DashboardIcon />
    },
    {
        path:"/users",
        name:"Users",
        icon:<AccountBoxIcon />
    },
    {
        path:"/students",
        name:"Students",
        icon:<PersonOutlineIcon />
    },
    {
        path:"/new",
        name:"New Student",
        icon:<PersonAddAltIcon />
    }
  ]

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      props.setAuth(false);
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{backgroundColor: 'white', color: '#51087E'}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
              <Typography component="div" variant="h6" sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}>
                REG
              </Typography>
              <Typography component="div" sx={{ display: { xs: "block", sm: "none" }, flexGrow: 1 }}>
                <DiamondIcon/>
              </Typography>
              <Icons>
              <Typography variant="span">John</Typography>
                <AccountCircleIcon
                  fontSize="large"
                />
              </Icons>
              <UserBox>
                <Typography variant="span">John</Typography>
              </UserBox>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List component="nav">
          {menuItem.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link} to={item.path}
                sx={{ '&:hover': {color: '#51087E', fontWeight: 5}, minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5}}>
              <ListItemIcon sx={{ '&:hover':{color: "#51087E"}, minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                <Typography variant='body2' component='span'>{item.name}</Typography>
              </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{ '&:hover': {color: '#51087E'}, minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5}}
                onClick={logout}
                >
              <ListItemIcon sx={{ '&:hover':{color: "#51087E"}, minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',}}>
                    <LogoutIcon sx={{color: 'red'}} />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}><Typography variant='body2' component='span'>Logout</Typography></ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem disablePadding sx={{ ml: 2 }}>
          <ListItemIcon>
            <ModeNightIcon />
          </ListItemIcon>
            <Switch onChange={e=>props.setMode(props.mode === "light" ? "dark" : "light")} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3}}>
        <DrawerHeader />
        <Box
          component="div"
          sx={{backgroundColor: 'rgba(191, 64, 191, 0.1)',
          borderRadius: 6,
          paddingBottom: 5,
          paddingTop: 5
        }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
