import {
  makeStyles,
  Button,
  IconButton,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: "1px solid #000",
    //boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
    //width: "50%",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  activeTab: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  default: {
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    borderColor: theme.palette.primary.main,
    minWidth: 180,
  },
  font: {
    color: theme.palette.primary.main,
    fontSize: "1rem",
  },
  selectRoot: {
    backgroundColor: "white",
  },
  space: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "0.7em",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "0.6em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.5em",
    },
  },
  table: {
    width: "100%",
    color: theme.palette.primary.main,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
interface ApprovePageProps {
  toggleModal: () => void;
}

const ApprovePage = React.forwardRef((props: ApprovePageProps, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <IconButton onClick={props.toggleModal} edge="end">
        <CloseIcon />
      </IconButton>
      <Typography variant="body1" color="primary">
        Action
      </Typography>
      <Grid container>
        <Grid item>
          <Button
            variant="contained"
            endIcon={<ArrowDropDownIcon />}
            color="primary"
            className={classes.space}
            size="small"
          >
            Approve
          </Button>

          <Button
            variant="contained"
            color="primary"
            className={classes.space}
            size="small"
          >
            Submit
          </Button>
          <IconButton size="small">
            <AttachFileIcon />
          </IconButton>
        </Grid>
      </Grid>
      <br />
      <Typography variant="body1" color="primary">
        Remarks
      </Typography>
      <TextField
        id="outlined-basic"
        label="Remarks"
        variant="outlined"
        fullWidth
        maxRows={50}
        className={classes.space}
      />
    </div>
  );
});

export default ApprovePage;
