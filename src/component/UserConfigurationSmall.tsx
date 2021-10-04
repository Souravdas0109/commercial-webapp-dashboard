import {
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  Divider,
  Box,
  Avatar,
  IconButton,
  Button 
} from "@material-ui/core";
import "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, Prompt } from "react-router-dom";
import { yellow } from "@material-ui/core/colors";
import { ColleagueInfo } from "./ColleagueInfo";
import { blue } from '@material-ui/core/colors';
import { pink } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import { avtarInfo } from "./AvtarInfo";
import { userInfo } from "./UserInfo";


const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2),
  },
  spacing: {
    margin: theme.spacing(2),
  },
  flex: {
    marginTop: theme.spacing(4),
    display: "flex",
  },
  flex1: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    display: "flex",
  },
  hidden: { visibility: "hidden" },
  button1: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(6),

  },
  space: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  activeTab: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  default: {
    backgroundColor: "lightgrey",
    color: "grey",
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
  avtar: {
        color:grey[50],
        backgroundColor:green[700],
        marginLeft: theme.spacing(25),
        fontSize:"40px"
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
  btnproducttype: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  tabHead: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
    
  },
  tabOther: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    color:blue[500],
  },
  tabButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    color:grey[50],
  },
  tabbox: {
    marginLeft: theme.spacing(27),
  },
  tabExtra: {
    marginLeft: theme.spacing(2),
    color:yellow[800],
  },
  tabAccount: {
    marginLeft: theme.spacing(2),
    color:grey[800],
  },
  tabOtherone: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    color:pink[300],
  },
  margin: {
    margin: theme.spacing(2),
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
  back: {
    marginLeft: theme.spacing(8),
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: theme.spacing(4),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  pt6: {
    paddingTop: theme.spacing(3),
  },
}));

function Dashboard() {
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const history = useHistory();
  const colleagueUserName=userInfo.getLoggedInUserName()
  const businessunitName=ColleagueInfo.getLoggedInColleagueBusineesunitName()
  const departmentName=ColleagueInfo.getLoggedInColleaguedepartmentName()
  const divisonName=ColleagueInfo.getLoggedInColleaguedivisionName()
  const groupName=ColleagueInfo.getLoggedInColleaguegroupName()
  const location=ColleagueInfo.getLoggedInColleaguelocationNameName()
  const region=ColleagueInfo.getLoggedInColleagueregionName()
  const empId=ColleagueInfo.getLoggedInColleagueemployeeId()
  const empStatus=ColleagueInfo.getLoggedInColleagueemployee_status()
  const hireDate=ColleagueInfo.getLoggedInColleaguehireDate()
  const grade=ColleagueInfo.getLoggedInColleaguegrade()
  const jobCode=ColleagueInfo.getLoggedInColleaguejobCode()
  const jobTitle=ColleagueInfo.getLoggedInColleaguejobTitle()
  const status=ColleagueInfo.getLoggedInColleaguestatus()
  const userName=avtarInfo.getLoggedInAvtarName();
  return (
    <>
      <Grid container className={classes.margin}>
        <Grid item lg={10} md={10} sm={8} xs={8}>
          <IconButton color="primary" disabled>
          <Avatar style={{ height: '70px', width: '70px' }} className={classes.avtar}>{userName}</Avatar>
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
      < Divider variant="fullWidth"/>
      <Typography
            variant="h5"
            color="primary"
            className={classes.tabAccount}
          >
           Account Informations
          </Typography>
          {/* <Box sx={{ width: 200,
          height: 200,
          bgcolor:grey[500],borderColor: '1px dashed red' }}  className={classes.tabbox}> */}
      <Typography
            variant="button"
            color="primary"
            className={classes.tabOther}
          >
           Job Code : {jobCode}
          </Typography>
          <Typography
            variant="button"
            color="primary"
            className={classes.tabOther}
          >
           Job Title : {jobTitle}
          </Typography>
          <Typography
            variant="button"
            color="primary"
            className={classes.tabOther}
          >
           Grade : {grade}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className={classes.tabOther}
          >
           Hire Date : {hireDate}
          </Typography>
          {/* <Typography
            variant="body1"
            color="primary"
            className={classes.tabOther}
          >
           Status : {status}
          </Typography> */}
          <Button variant='contained' color="primary" className={classes.tabButton}>
           {status}
          </Button>
        
        {/* </Box> */}
          <Typography
            variant="body1"
            color="primary"
            className={classes.tabOtherone}
          >
           Business Unit Name : {businessunitName}
          </Typography>
        <Typography
            variant="body1"
            color="inherit"
            className={classes.tabOtherone}
          >
           Department Name : {departmentName}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className={classes.tabOtherone}
          >
           Division Name : {divisonName}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className={classes.tabOtherone}
          >
           Group Name : {groupName}
          </Typography>
         <Typography
            variant="body1"
            color="primary"
            className={classes.tabOtherone}
          >
           Location :{location}
          </Typography>
          <Typography
            variant="button"
            color="primary"
            className={classes.tabExtra}
          >
           Region : {region}
          </Typography>
    </>
  );
}

export default Dashboard;