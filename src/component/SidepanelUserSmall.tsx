import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { commercialdash, commercialtask, userconfig } from "../Data/Data";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
  },
  link: {
    marginLeft: theme.spacing(2),
  },
  pad: {
    marginLeft: theme.spacing(5),
  },
  text: {
    color: theme.palette.primary.main,
    fontSize: "0.7em",
    fontWeight: "bold",
  },
  active: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));
interface SidebarProps {
  handleDrawerToggle: () => void;
}
function SidepanelUserSmall(props: SidebarProps) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };
  return (
    <>
      <List>
        <ListItem
          className={
            location.pathname === userconfig[0].url
              ? `${classes.link} ${classes.active}`
              : classes.link
          }
          button
          onClick={() => {
            history.push(userconfig[0].url);
            props.handleDrawerToggle();
          }}
        >
          <ListItemText
            primary={userconfig[0].title}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          className={
            location.pathname === userconfig[1].url
              ? `${classes.link} ${classes.active}`
              : classes.link
          }
          button
          onClick={() => {
            history.push(userconfig[1].url);
            props.handleDrawerToggle();
          }}
        >
          <ListItemText
            primary={userconfig[1].title}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      </List>
      <Divider />
    </>
  );
}

export default SidepanelUserSmall;
