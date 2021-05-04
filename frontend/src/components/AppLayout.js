import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleIcon from '@material-ui/icons/People';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  Link
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.3em',
      borderRadius: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.4)',
      outline: 'none'
    }
  },
  root: {
    display: 'flex',
    fontFamily: 'Poppins'
  },
  welcome: {
    marginBottom: theme.spacing(2),
    color: '#535353'
  },
  appBar: {
      backgroundColor: '#950004',
      zIndex: theme.zIndex.drawer + 1,
      '& div, h6': {
        flexGrow: 1
      }
  },
  primaryBtn: {
    backgroundColor: '#2F4858',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3c5783'
    }
  },
  bottomItem: {
    position: "fixed",
    bottom: 0,
    paddingBottom: 10,
    width: drawerWidth
  },
  nested: {
    paddingLeft: theme.spacing(10),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '& span': {
      fontSize: theme.spacing(1.75)
    }
  },
  propertiesList: {
    overflowY: 'scroll',
    maxHeight: 150,
    paddingRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600'
  },
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    display: 'block'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  navigation: {
    textDecoration: 'none',
    color: 'inherit'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#2F4858',
    color: '#fff'
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const AppLayout = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const page = "/"+window.location.href.split("/")[3];

  const handlePropertiesClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar elevation={1} className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            BrickBonds
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {[['Home', <HomeIcon/>, "/"],
            ['Properties', <LocationCityIcon/>, "/properties"],
            ['Investors', <PeopleIcon/>, "/investors"],
            ['Analytics', <TimelineIcon/>, '/analytics']].map((item, index) => (
              <Link
              key={item[0]}
              onClick={item[2]==="/properties" ? handlePropertiesClick : null}
              className={classes.navigation}
              to={item[2]==="/properties" ? "#" : item[2]}>
                <ListItem button selected={page===item[2]}>
                  <ListItemIcon>{item[1]}</ListItemIcon>
                  <ListItemText primary={item[0]} />
                  {open && item[2]==="/properties" ? <ExpandLess /> :
                  item[2]==="/properties" ? <ExpandMore /> : null}
                </ListItem>
                {item[2]==="/properties" ?
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link key={item[0]} className={classes.navigation} to={item[2]}>
                        <ListItem button className={classes.nested}>
                          <ListItemText primary="My Properties" />
                        </ListItem>
                      </Link>
                      <Link key={"browse"}
                      className={classes.navigation}
                      to={"/browse/properties"}>
                        <ListItem button className={classes.nested}>
                          <ListItemText primary="Browse Properties" />
                        </ListItem>
                      </Link>
                    </List>
                  </Collapse> : null
                }
              </Link>
            ))}
            <div className={classes.bottomItem}>
              <Divider />
              <Link className={classes.navigation} to="/settings">
                <ListItem button key={'settings'}>
                  <ListItemIcon>{<SettingsIcon/>}</ListItemIcon>
                  <ListItemText primary={'Settings'} />
                </ListItem>
              </Link>
            </div>
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default AppLayout;
