import { Divider, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Dashboard from "./Dashboard";

const useStyles = makeStyles((theme) => ({
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
function CommercialDashboardSmall() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h6" color="primary" align="center">
          Morrisons Commercial Dashboard
        </Typography>
        <Divider />
      </div>
      <div className={classes.value}>
        <Dashboard />
      </div>
    </div>
  );
}

export default CommercialDashboardSmall;
