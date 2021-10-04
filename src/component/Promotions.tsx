import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import PromotionDetails from "./PromotionDetails";
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
}));
function Promotions() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container justifyContent={"center"}>
        <Grid item lg={12} sm={12} xl={12} md={12} xs={12}>
          <Typography variant="h6" color="primary" align="center">
            Morrisons Commercial Dashboard
          </Typography>
        </Grid>
        <Grid item lg={12} sm={12} xl={12} md={12} xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <div className={classes.value}>
        <Grid container className={classes.container}>
          <Grid item lg={2} md={2} sm={4} xs={5}>
            <Sidepanel />
          </Grid>
          <Grid item lg={10} md={10} sm={8} xs={7}>
            <PromotionDetails />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Promotions;
