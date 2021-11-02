import {
  Grid,
  Typography,
  makeStyles,
  useTheme,
  Divider,
  Box,
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import "date-fns";
import React, { useEffect } from "react";
import { yellow } from "@material-ui/core/colors";
import { ColleagueInfo } from "./ColleagueInfo";
import { blue } from "@material-ui/core/colors";
import { pink } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
import { avtarInfo } from "./AvtarInfo";
import { userInfo } from "./UserInfo";
import { connect } from "react-redux";
import { getUserRequest } from "../redux/Actions/Login/Action";

const useStyles = makeStyles(theme => ({
  avtar: {
    color: grey[50],
    backgroundColor: green[700],
    marginLeft: theme.spacing(46),
    fontSize: "40px",
  },
  tabHead: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
  },
  tabOther: {
    marginLeft: theme.spacing(27),
    marginTop: theme.spacing(1),
    color: blue[500],
  },
  tabButton: {
    marginLeft: theme.spacing(27),
    marginTop: theme.spacing(1),
    color: grey[50],
  },
  tabbox: {
    marginLeft: theme.spacing(27),
  },
  tabExtra: {
    marginLeft: theme.spacing(27),
    color: yellow[800],
  },
  tabAccount: {
    marginLeft: theme.spacing(2),
    color: green[800],
  },
  tabOtherone: {
    marginLeft: theme.spacing(27),
    marginTop: theme.spacing(1),
    color: pink[300],
  },
  margin: {
    margin: theme.spacing(2),
  },
  tabspace: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  tabOption: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(0),
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  text: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
}));

function Dashboard(props: any) {
  const { userDetail, getUserRequest } = props;
  const theme = useTheme();
  const classes = useStyles();
  console.log(userDetail);
  const abc = userDetail.data.FirstName;
  const bcd = userDetail.data.colleagueLocationData.businessUnit;
  const colleagueUserName = userInfo.getLoggedInUserName();
  const businessunitName = ColleagueInfo.getLoggedInColleagueBusineesunitName();
  const departmentName = ColleagueInfo.getLoggedInColleaguedepartmentName();
  const divisonName = ColleagueInfo.getLoggedInColleaguedivisionName();
  const groupName = ColleagueInfo.getLoggedInColleaguegroupName();
  const location = ColleagueInfo.getLoggedInColleaguelocationNameName();
  const region = ColleagueInfo.getLoggedInColleagueregionName();
  const empId = ColleagueInfo.getLoggedInColleagueemployeeId();
  const empStatus = ColleagueInfo.getLoggedInColleagueemployee_status();
  const hireDate = ColleagueInfo.getLoggedInColleaguehireDate();
  const grade = ColleagueInfo.getLoggedInColleaguegrade();
  const jobCode = ColleagueInfo.getLoggedInColleaguejobCode();
  const jobTitle = ColleagueInfo.getLoggedInColleaguejobTitle();
  const status = ColleagueInfo.getLoggedInColleaguestatus();
  const userName = avtarInfo.getLoggedInAvtarName();
  return (
    <>
      <Grid container className={classes.margin}>
        <Grid item lg={10} md={10} sm={8} xs={8}>
          <IconButton color="primary" disabled>
            <Avatar
              style={{ height: "70px", width: "70px" }}
              className={classes.avtar}
            >
              {userName}
            </Avatar>
          </IconButton>
          <Typography
            variant="h4"
            color="primary"
            align="center"
            className={classes.tabHead}
          >
            WELCOME {colleagueUserName} ({empId})
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            align="center"
            className={classes.tabHead}
          >
            Employee's Status : {empStatus}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" />
      <Typography variant="h5" color="primary" className={classes.tabAccount}>
        Account Informations
      </Typography>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        <Box
          sx={{
            marginLeft: 80,
            flexDirection: "column",
            display: "flex",
            alignItems: "left",
            color: "#454e9e",
          }}
        >
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Job Code: <b>{jobCode}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Job Title: <b>{jobTitle}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Grade: <b>{grade}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Hire Date: <b>{hireDate}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Button variant="contained" color="primary" size="large">
              {status}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: 120,
            flexDirection: "column",
            display: "flex",
            alignItems: "left",
            color: "#b5179e",
          }}
        >
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Business Unit Name: <b>{businessunitName}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Department Name: <b>{departmentName}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Divsion Name: <b>{divisonName}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Group Name: <b>{groupName}</b>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: 120,
            flexDirection: "column",
            display: "flex",
            alignItems: "left",
            color: "#b5179e",
          }}
        >
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Location: <b>{location}</b>
            </Typography>
          </Box>
          <Box sx={{ p: 1, textAlign: "left" }}>
            <Typography variant="subtitle1">
              Region: <b>{region}</b>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    userDetail: state.loginReducer.userDetail,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserRequest: (data: any) => dispatch(getUserRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
