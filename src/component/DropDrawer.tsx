import {
  Menu,
  MenuItem,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { logOutUserRequest } from "../redux/Actions/Login/Action";
import { userInfo } from "./UserInfo";
import { connect } from "react-redux";

interface DropDrawerProps {
  handleClose: () => void;
  open: boolean;
  refer: React.MutableRefObject<null>;
  logOutUserRequest: () => void;
}

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));
function DropDrawer(props: DropDrawerProps) {
  const classes = useStyles();
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("_Gresponse");
    localStorage.removeItem("_GresponseV2");
    localStorage.removeItem("_Colresponse");
    console.log("LogOut");
    props.logOutUserRequest();
    history.push("/login");
    console.log("Logout done");
  };
  const UserName = userInfo.getLoggedInUserName();
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.refer.current}
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      getContentAnchorEl={null}
    >
      <MenuItem onClick={props.handleClose} className={classes.text}>
        <Typography variant="body1">{UserName}</Typography>
      </MenuItem>
      <MenuItem onClick={props.handleClose} className={classes.text}>
        <Typography variant="body1">My Usage Logs</Typography>
      </MenuItem>
      <MenuItem onClick={props.handleClose} className={classes.text}>
        <Typography variant="body1">My Preference</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout} className={classes.text}>
        <Typography variant="body1">Sign Out</Typography>
      </MenuItem>
    </Menu>
  );
}
const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOutUserRequest: () => dispatch(logOutUserRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDrawer);
