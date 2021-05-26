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
import { styles } from './AppLayout.Style';
import {
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';

const useStyles = makeStyles(styles);

const AppLayout = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  // const page = "/"+window.location.href.split("/")[3];
  const page = useSelector((state) => state.setPage.currentPage);

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
              item[2] !=="/properties" ?
              <Link
              key={item[0]}
              className={classes.navigation}
              to={item[2]}>
                <ListItem selected={page===item[2]}>
                  <ListItemIcon>{item[1]}</ListItemIcon>
                  <ListItemText primary={item[0]} />
                </ListItem>
              </Link> :
              <div
              key={item[0]}
              onClick={handlePropertiesClick}
              className={classes.navigation}
              to={"#"}>
                <ListItem selected={page===item[2]}>
                  <ListItemIcon>{item[1]}</ListItemIcon>
                  <ListItemText primary={item[0]} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
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
                </Collapse>
              </div>
            ))}
            <div className={classes.bottomItem}>
              <Divider />
              <Link className={classes.navigation} to="/settings">
                <ListItem button selected={page==='/settings'} key={'settings'}>
                  <ListItemIcon>{<SettingsIcon/>}</ListItemIcon>
                  <ListItemText primary={'Account Settings'} />
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
