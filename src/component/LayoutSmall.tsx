import React, { useState } from "react";
import {
  Collapse,
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
import { commercialdash, userconfig } from "../Data/Data";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import SidepanelSmall from "./SidepanelSmall";
import HeaderSmall from "./HeaderSmall";
import SidepanelUserSmall from "./SidepanelUserSmall";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const drawerWidth = 250;
const drawerWidthShift = 250;

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
  text: {
    color: theme.palette.primary.main,
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
    fontSize: "0.7em",
    fontWeight: "bold",
    color: theme.palette.primary.main,
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

function LayoutSmall(props: LayoutProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openCol, setOpenCol] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
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
      more: commercialdash,
    },
    {
      text: "Promotion & Funding",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/promofunding",
      more: [],
    },
    {
      text: "Retail Price Change",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/retailprice",
      more: [],
    },
    {
      text: "Range Amendment",
      icon: <img src={morrisons} alt="" className={classes.logo} />,
      path: "/rangeamend",
      more: [],
    },
    {
      text: "Supplier Portal",
      icon: <img src={stibo} alt="" className={classes.logo} />,
      path: "/supplierport",
      more: [],
    },
    {
      text: "Product Portal",
      icon: <img src={stibo} alt="" className={classes.logo} />,
      path: "/productport",
      more: [],
    },
    {
      text: "Analytics",
      icon: <img src={qlik} alt="" className={classes.logo} />,
      path: "/analytics",
      more: [],
    },
    {
      text: "User Configuration",
      icon: <img src={key} alt="" className={classes.logo} />,
      path: "/userconfig/userinfo",
      more: userconfig,
    },
  ];

  return (
    <div>
      <HeaderSmall
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
          <Typography variant="subtitle2" align="center">
            Menu Items
          </Typography>
          <IconButton onClick={handleDrawerToggle} edge="end">
            <ChevronLeft color="secondary" />
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuItems.map((menu, index) => {
            if (menu.more.length === 0) {
              return (
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
              );
            }
            if (menu.text === "Commercial Dashboard") {
              return (
                <List key={menu.text}>
                  <ListItem
                    onClick={() => {
                      const arr = [...openCol];
                      arr[index] = !arr[index];
                      setOpenCol(arr);
                    }}
                    button /*className={classes.link}*/
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={menu.text}
                    />
                    <ListItemIcon>
                      {openCol[index] ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItemIcon>
                  </ListItem>
                  <Collapse in={openCol[index]} timeout="auto" unmountOnExit>
                    <Divider />
                    <SidepanelSmall handleDrawerToggle={handleDrawerToggle} />
                  </Collapse>
                </List>
              );
            }
            if (menu.text === "User Configuration") {
              return (
                <List key={menu.text}>
                  <ListItem
                    onClick={() => {
                      const arr = [...openCol];
                      arr[index] = !arr[index];
                      setOpenCol(arr);
                    }}
                    button /*className={classes.link}*/
                  >
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.listItemText }}
                      primary={menu.text}
                    />
                    <ListItemIcon>
                      {openCol[index] ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItemIcon>
                  </ListItem>
                  <Collapse in={openCol[index]} timeout="auto" unmountOnExit>
                    <Divider />
                    <SidepanelUserSmall
                      handleDrawerToggle={handleDrawerToggle}
                    />
                  </Collapse>
                </List>
              );
            }
          })}
        </List>
      </Drawer>
      <div className={classes.height} />
      <br />
      <div>{props.children}</div>
    </div>
  );
}

export default LayoutSmall;
