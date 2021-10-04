import {
  Grid,
  Typography,
  makeStyles,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import React, { useRef, useState } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useHistory, Prompt } from "react-router-dom";
import { labels } from "./messages";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
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
  tabOption: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(0),
  },
  margin: {
    margin: theme.spacing(3),
  },
  tabspace: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  tabspaceone: {
    margin: theme.spacing(4),
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

function UserInformation() {
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [isPageModified, setIsPageModified] = useState(false);
  const [additionalinfo, setAdditionalinfo] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const formRef = useRef(null);
  const onFirstnameChange = (e: any) => {
    setFirstname(e.target.value);
    setIsPageModified(true);
  };
  const onMiddlenameChange = (e: any) => {
    setMiddlename(e.target.value);
    setIsPageModified(true);
  };
  const onLastnameChange = (e: any) => {
    setLastname(e.target.value);
    setIsPageModified(true);
  };
  const onAdditionalinfoChange = (e: any) => {
    setAdditionalinfo(e.target.value);
    setIsPageModified(true);
  };
  const onDesignationChange = (e: any) => {
    setDesignation(e.target.value);
    setIsPageModified(true);
  };
  const onStatusChange = (e: any) => {
    setStatus(e.target.value);
    setIsPageModified(true);
  };
  const handleSubmit = () => {
    console.log("Submit action triggered");
  };
  const handleClick = () => {
    history.goBack();
  };
  return (
    <>
      <Prompt when={isPageModified} message={labels.promptMessage} />
      <Grid container className={classes.margin}>
        <Grid item lg={10} md={10} sm={8} xs={8}>
          <Typography
            variant="body1"
            color="primary"
            className={classes.tabHead}
          >
            User Information
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.margin} direction="column">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {/* <div className="w-full p-6 pl-0 prodInput" data-cy="prod-input"> */}
          <ValidatorForm
            ref={formRef}
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
            className={classes.color90}
          >
            <Grid container spacing={2}>
              <Grid item className={classes.tabspace} sm={5} xs={11}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  First Name*
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onFirstnameChange}
                  fullWidth
                  name="firstname"
                  value={firstname}
                  placeholder="Enter First Name here"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                    // style:{fontSize:10},
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
              <Grid item className={classes.tabspace} sm={5} xs={11}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  Middle Name*
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onMiddlenameChange}
                  fullWidth
                  name="middlename"
                  value={middlename}
                  placeholder="Enter Middle Name here"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                    // style:{fontSize:10},
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item className={classes.tabspace} sm={5} xs={11}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  Last Name*
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onLastnameChange}
                  fullWidth
                  name="lastname"
                  value={lastname}
                  placeholder="Enter Last Name here"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                    // style:{fontSize:10},
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
              <Grid item className={classes.tabspace} sm={5} xs={11}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  E-mail ID*
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onLastnameChange}
                  fullWidth
                  name="lastname"
                  value={lastname}
                  placeholder="Enter Email here"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                    // style:{fontSize:10},
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item className={classes.tabspace} sm={5} xs={11}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  DESIGNATION
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onDesignationChange}
                  fullWidth
                  name="designation"
                  value={designation}
                  placeholder="Enter designation here"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                    // style:{fontSize:10},
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
              <Grid item className={classes.tabspace} sm={5} xs={11}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  STATUS
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onStatusChange}
                  fullWidth
                  name="status"
                  value={status}
                  placeholder="Enter status here"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                    // style:{fontSize:10},
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item className={classes.tabspace} sm={9} xs={10}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.tabOption}
                >
                  ADDITIONAL_INFO
                </Typography>
                <TextValidator
                  //disabled={true}
                  disabled={false}
                  onChange={onAdditionalinfoChange}
                  fullWidth
                  name="additionalinfo"
                  value={additionalinfo}
                  placeholder="If you have any additional info"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    classes: { input: classes.text },
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                />
              </Grid>
              <Grid item sm={2} xs={4}>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  color="primary"
                  size="small"
                  className={classes.tabspaceone}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </MuiPickersUtilsProvider>
      </Grid>
    </>
  );
}
export default UserInformation;
