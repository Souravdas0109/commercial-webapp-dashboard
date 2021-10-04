import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Sidepanel from "./Sidepanel";

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
  tabHead: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    paddingLeft: theme.spacing(2),
  },
}));
function SupplierPortal() {
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
        <Grid container className={classes.container}>
          <Grid item lg={2} md={2} sm={3} xs={6}>
            <Sidepanel />
          </Grid>
          <Grid item lg={10} md={10} sm={9} xs={6}>
            <Typography
              variant="body1"
              color="primary"
              className={classes.tabHead}
            >
              Tasklists {">"} Supplier Portal
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SupplierPortal;
