import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  IconButton,
  Divider,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { dashboard } from "../Data/Data";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  spacing: {
    margin: theme.spacing(2),
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  bold: {
    fontWeight: "bold",
  },
  color90: {
    color: theme.palette.primary.main,
  },
  color80: {
    color: "#FFBF00",
  },
  color60: {
    color: "red",
  },
  tool: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  tabHead: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
  },
}));
function Dashboard() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="body1" color="primary" className={classes.tabHead}>
        Dashboard
      </Typography>
      <Grid container>
        {dashboard.map((dash, index) => (
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={index}>
            <Card className={classes.card}>
              <CardHeader
                title={dash.title}
                action={
                  <Tooltip
                    title="Visit Application"
                    arrow
                    classes={{ tooltip: classes.tool }}
                  >
                    <IconButton size="small">{dash.icon}</IconButton>
                  </Tooltip>
                }
                className={classes.header}
                titleTypographyProps={{ variant: "body1" }}
              />
              <CardContent>
                <Grid container>
                  <Grid item>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <Typography variant="body2" color="primary">
                              {dash.statuscomplete}
                            </Typography>
                          </td>
                          <td>
                            <Typography
                              variant="body2"
                              color="primary"
                              className={
                                dash.statuscompleteval >= "90%"
                                  ? `${classes.bold} ${classes.color90}`
                                  : dash.statuscompleteval >= "60%"
                                  ? `${classes.bold} ${classes.color80}`
                                  : `${classes.bold} ${classes.color60}`
                              }
                            >
                              {dash.statuscompleteval[0] === "0"
                                ? dash.statuscompleteval.substring(1)
                                : dash.statuscompleteval}
                            </Typography>
                          </td>
                          <td />
                          <td />
                          <td align="right">
                            <Typography variant="body2" color="primary">
                              {dash.reworkcomplete}
                            </Typography>
                          </td>
                          <td align="right">
                            <Typography
                              variant="body2"
                              color="primary"
                              className={
                                dash.reworkcompleteval <= "10%"
                                  ? `${classes.bold} ${classes.color90}`
                                  : dash.reworkcompleteval <= "20%"
                                  ? `${classes.bold} ${classes.color80}`
                                  : `${classes.bold} ${classes.color60}`
                              }
                            >
                              {dash.reworkcompleteval[0] === "0"
                                ? dash.reworkcompleteval.substring(1)
                                : dash.reworkcompleteval}
                            </Typography>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardContent>
                <table width="100%">
                  <tbody>
                    {dash.data.map((dashdata, index) => (
                      <tr key={index}>
                        <td>
                          <Typography variant="body2" color="primary">
                            {dashdata.data}
                          </Typography>
                        </td>
                        <td align="right">
                          <Typography variant="body2" color="primary">
                            <Link href="#" to="#">
                              {dashdata.value}
                            </Link>
                          </Typography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Dashboard;
