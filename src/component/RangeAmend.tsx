import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Sidepanel from "./Sidepanel";
import RangeCreate from "./RangeCreate";
import RangeCreateSmall from "./RangeCreateSmall";
import RangeCreateSmallOne from "./RangeCreateSmallOne";
import RangeCreateSmallTwo from "./RangeCreateSmallTwo";
import RangeCreateSmallThree from "./RangeCreateSmallThree";
import RangeCreateSmallfour from "./RangeCreateSmallfour";



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
function RangeAmend() {
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
          <Grid item lg={2} md={2} sm={4} xs={5}>
            <Sidepanel />
          </Grid>
          <Grid item lg={10} md={10} sm={8} xs={7}>
            {/* <Typography
              variant="body1"
              color="primary"
              className={classes.tabHead}
            >
              Tasklists {">"} Range Amendment
            </Typography> */}
            {/* <RangeCreate /> */}
            {/* <RangeCreateSmall/> */}
            {/* <RangeCreateSmallOne/> */}
            {/* <RangeCreateSmallThree/> */}
            {/* <RangeCreateSmallTwo/> */}
            <RangeCreateSmallfour/>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default RangeAmend;
