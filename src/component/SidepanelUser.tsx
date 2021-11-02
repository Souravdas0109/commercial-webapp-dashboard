import {
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import { userconfig } from "../Data/Data";
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
function SidepanelUser() {
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
              location.pathname === userconfig[0].url
                ? `${classes.link} ${classes.active}`
                : classes.link
            }
            button
            onClick={() => history.push(userconfig[0].url)}
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
            onClick={() => history.push(userconfig[1].url)}
          >
            <ListItemText
              primary={userconfig[1].title}
              classes={{ primary: classes.text }}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            className={
              location.pathname === userconfig[2].url
                ? `${classes.link} ${classes.active}`
                : classes.link
            }
            button
            onClick={() => history.push(userconfig[2].url)}
          >
            <ListItemText
              primary={userconfig[2].title}
              classes={{ primary: classes.text }}
            />
          </ListItem>
        </List>
      </Paper>
      <Divider />
    </>
  );
}

export default SidepanelUser;
