import {
  makeStyles,
  Button,
  Divider,
  ListItem,
  List,
  ListItemIcon,
  IconButton,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { notifications, notifications2 } from "../Data/Data";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  activeTab: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  default: {
    backgroundColor: theme.palette.background.paper,
  },
  space: {
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "0.7em",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "0.6em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
}));
interface NotificationProps {
  toggleModal: () => void;
}

function Notifications(props: NotificationProps) {
  const classes = useStyles();
  const [option, setOption] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setOption(newValue);
  };

  return (
    <div>
      <div className={classes.paper}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <IconButton onClick={props.toggleModal} edge="end">
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              endIcon={<KeyboardArrowDownIcon />}
              className={classes.space}
            >
              All Applications{" "}
            </Button>
          </div>
        </div>
        <br />
        <Tabs value={option} onChange={handleChange} indicatorColor="secondary">
          <Tab
            label="My Alerts"
            value={0}
            className={
              option === 0
                ? `${classes.activeTab} ${classes.space}`
                : `${classes.default} ${classes.space}`
            }
          />
          <Tab
            label="Group Alerts"
            value={1}
            className={
              option === 1
                ? `${classes.activeTab} ${classes.space}`
                : `${classes.default} ${classes.space}`
            }
          />
        </Tabs>
        <Divider />
        {option === 0 ? (
          <List>
            {notifications.map((notify, index) => (
              <ListItem key={index}>
                <ListItemIcon>{notify.icon}</ListItemIcon>
                <Typography className={classes.space} color="primary">
                  <strong style={{ fontWeight: "bold" }}>{notify.title}</strong>{" "}
                  {notify.description}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {notifications2.map((notify, index) => (
              <ListItem key={index}>
                <ListItemIcon>{notify.icon}</ListItemIcon>
                <Typography className={classes.space} color="primary">
                  <strong style={{ fontWeight: "bold" }}>{notify.title}</strong>{" "}
                  {notify.description}
                </Typography>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}

export default Notifications;
