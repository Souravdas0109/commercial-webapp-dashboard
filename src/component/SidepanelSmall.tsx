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
import { commercialdash, commercialtask } from "../Data/Data";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
function SidepanelSmall(props: SidebarProps) {
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
            location.pathname === commercialdash[0].url
              ? `${classes.link} ${classes.active}`
              : classes.link
          }
          button
          onClick={() => {
            history.push(commercialdash[0].url);
            props.handleDrawerToggle();
          }}
        >
          <ListItemText
            primary={commercialdash[0].title}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem onClick={handleCollapse} button className={classes.link}>
          <ListItemText
            classes={{ primary: classes.text }}
            primary={commercialdash[1].title}
          />
          <ListItemIcon>
            {open ? <IconExpandLess /> : <IconExpandMore />}
          </ListItemIcon>
        </ListItem>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List>
          {commercialtask.map((task) => (
            <ListItem
              key={task.title}
              className={
                location.pathname === task.url
                  ? `${classes.pad} ${classes.active}`
                  : classes.pad
              }
              button
              onClick={() => {
                history.push(task.url);
                props.handleDrawerToggle();
              }}
            >
              <ListItemText classes={{ primary: classes.text }}>
                {task.title}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Divider />
      <List>
        <ListItem
          className={
            location.pathname === commercialdash[2].url
              ? `${classes.link} ${classes.active}`
              : classes.link
          }
          button
          onClick={() => {
            history.push(commercialdash[2].url);
            props.handleDrawerToggle();
          }}
        >
          <ListItemText
            primary={commercialdash[2].title}
            classes={{ primary: classes.text }}
          />
        </ListItem>
      </List>
      <Divider />
    </>
  );
}

export default SidepanelSmall;
