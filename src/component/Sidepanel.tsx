import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { commercialdash, commercialtask } from "../Data/Data";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    height: "100%",
  },
  link: {
    marginTop: theme.spacing(2),
  },
  pad: {
    marginLeft: theme.spacing(2),
  },
  text: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    //wordWrap: "break-word",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: "0.9em",
    },
  },
  textList: {
    wordWrap: "break-word",
  },
  active: {
    backgroundColor: theme.palette.secondary.light,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));
function Sidepanel() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down("md"));

  const handleCollapse = () => {
    setOpen(!open);
  };
  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <List>
          <ListItem
            className={
              location.pathname === commercialdash[0].url
                ? `${classes.link} ${classes.active}`
                : classes.link
            }
            button
            onClick={() => history.push(commercialdash[0].url)}
          >
            <ListItemText
              primary={commercialdash[0].title}
              classes={{ primary: classes.text }}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          {active ? (
            <>
              <ListItem className={classes.link}>
                <ListItemText
                  classes={{ primary: classes.text }}
                  primary={commercialdash[1].title}
                />
              </ListItem>
              <ListItem onClick={handleCollapse} button>
                <ListItemIcon>
                  {open ? <IconExpandLess /> : <IconExpandMore />}
                </ListItemIcon>
              </ListItem>
            </>
          ) : (
            <ListItem onClick={handleCollapse} button className={classes.link}>
              <ListItemText
                classes={{ primary: classes.text }}
                primary={commercialdash[1].title}
              />
              <ListItemIcon>
                {open ? <IconExpandLess /> : <IconExpandMore />}
              </ListItemIcon>
            </ListItem>
          )}
        </List>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Divider />
          <List>
            {commercialtask.map(task => (
              <ListItem
                key={task.title}
                className={
                  location.pathname === task.url
                    ? `${classes.pad} ${classes.active}`
                    : classes.pad
                }
                button
                onClick={() => history.push(task.url)}
              >
                <ListItemText
                  classes={{ primary: `${classes.text} ${classes.textList}` }}
                >
                  {/* <Typography variant="caption" color="primary"> */}
                  {task.title}
                  {/* </Typography> */}
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
            onClick={() => history.push(commercialdash[2].url)}
          >
            <ListItemText
              primary={commercialdash[2].title}
              classes={{ primary: classes.text }}
            />
          </ListItem>
        </List>
      </Paper>
      <Divider />
    </>
  );
}

export default Sidepanel;
