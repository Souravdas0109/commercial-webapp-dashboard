import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import UserInformationCreate from "./UserInformationCreate";
import SidepanelUser from "./SidepanelUser";
import UserCreate1 from "./UserCreate1";
import UserCreate from "./UserCreate";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  value: {
    flex: 1,
  },
  container: {
    height: "100%",
  },
}));
function UserCreateDashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.value}>
        <Grid container className={classes.container}>
          <Grid item lg={2} md={2} sm={4} xs={5}>
            <SidepanelUser />
          </Grid>
          <Grid item lg={10} md={10} sm={8} xs={7}>
            <UserCreate />
            {/* <UserCreate1 /> */}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserCreateDashboard;
