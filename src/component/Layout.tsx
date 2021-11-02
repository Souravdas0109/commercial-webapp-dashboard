import React, { useState } from "react";
import Header from "./Header";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import stibo from "../assets/stibo.png";
import qlik from "../assets/qlik.jpeg";
import key from "../assets/key.jpg";
import morrisons from "../assets/morrisons.png";
import { useHistory, useLocation } from "react-router-dom";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const drawerWidth = 150;
const drawerWidthShift = 150;

const useStyles = makeStyles(theme => ({
  height: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.paper,
  },
  setup: {
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  small: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
  },
  logo: {
    width: 40,
    height: 40,
  },
  modwidth: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidthShift,
    height: "100vh",
  },
  fullwidth: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    height: "100vh",
  },
  listItemText: {
    fontWeight: "bold",
    fontSize: "0.7em",
  },
  hover: {
    color: theme.palette.primary.main,
  },
  active: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function Layout(props: LayoutProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleClick = (url: string) => {
    history.push(url);
    handleDrawerToggle();
  };
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "Commercial Dashboard",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/Commercial/dashboard",
    },
    {
      text: "User Management",
      icon: <img src={key} alt="" className={classes.logo} />,
      path: "/userconfig/usercreate",
    },
    {
      text: "Promotion & Funding",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/promofunding",
    },
    {
      text: "Retail Price Change",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/retailprice",
    },
    {
      text: "Range Amendment",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/rangeamend",
    },
    {
      text: "Supplier Portal",
      icon: <img src={stibo} alt="" className={classes.logo} />,
      path: "/supplierport",
    },
    {
      text: "Product Portal",
      icon: <img src={stibo} alt="" className={classes.logo} />,
      path: "/productport",
    },
    {
      text: "Analytics",
      icon: <img src={qlik} alt="" className={classes.logo} />,
      path: "/analytics",
    },
  ];

  return (
    <div>
      <Header
        toggledraw={handleDrawerToggle}
        open={open}
        drawWidth={drawerWidth}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
        onClose={handleDrawerToggle}
        onKeyDown={handleDrawerToggle}
      >
        <div className={`${classes.height} ${classes.setup}`}>
          <Typography variant="subtitle2" align="right">
            Menu Items
          </Typography>
          <IconButton onClick={handleDrawerToggle} edge="end">
            <ChevronLeft color="secondary" />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map(menu => (
            <ListItem
              key={menu.text}
              button
              onClick={() => handleClick(menu.path)}
              className={
                location.pathname === menu.path
                  ? `${classes.hover} ${classes.active}`
                  : classes.hover
              }
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText
                primary={menu.text}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.height} />
      <div className={open ? classes.modwidth : classes.fullwidth}>
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
