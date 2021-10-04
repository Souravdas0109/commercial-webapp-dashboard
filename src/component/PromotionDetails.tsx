import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Button,
  Grid,
  Typography,
  ButtonGroup,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { promotions } from "../Data/Data";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FilterListIcon from "@material-ui/icons/FilterList";
import FilterPop from "./FilterPop";
import ApprovePage from "./ApprovePage";
import { toggle } from "../redux/formodal/action";
import { connect } from "react-redux";
import { toggleApp } from "../redux/approve/action";
import FilterPopSmall from "./FilterPopSmall";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
    color: theme.palette.primary.main,
  },
  tab: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  tabHead: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(2),
    },
  },
  space: {
    marginRight: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //overflow: "scroll",
    overflow: "auto",
    position: "absolute",
    top: "0px",
    left: "0px",
    // maxWidth: `calc(100% - 80px)`,
    // maxHeight: `calc(100% - 80px)`,
    //width: "80%",
  },
  spacing: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  paper: { minWidth: "500px" },
}));

function PromotionDetails(props: any) {
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  // const [openMod, setOpenMod] = useState(false);
  // const [open, setOpen] = useState(false);
  const toggleModal = () => {
    //setOpenMod(!openMod);
    props.toggleIt(props.toggle);
  };
  const toggleDialog = () => {
    //setOpen(!open);
    props.toggleItApp(props.toggleapp);
  };

  return (
    <>
      <Dialog
        open={props.toggle}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={`${classes.modal} ${classes.spacing}`}
      >
        {!active ? (
          <FilterPop toggleModal={toggleModal} />
        ) : (
          <FilterPopSmall toggleModal={toggleModal} />
        )}
      </Dialog>
      <Dialog
        open={props.toggleapp}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
      >
        <ApprovePage toggleModal={toggleDialog} />
      </Dialog>
      <Grid container>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <Typography
            variant="body1"
            color="primary"
            className={classes.header}
          >
            Tasklist {">"} Promotions & Funding
          </Typography>
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <ButtonGroup>
            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              color="primary"
              className={classes.space}
              size="small"
            >
              <Typography variant="caption">Order By</Typography>
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              color="primary"
              className={classes.space}
              size="small"
            >
              <Typography variant="caption">Saved Searches</Typography>
            </Button>

            <Button
              variant="contained"
              endIcon={<FilterListIcon />}
              color="primary"
              onClick={toggleModal}
              className={classes.space}
              size="small"
            >
              <Typography variant="caption">Change Filter</Typography>
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box style={{ overflow: "auto" }}>
        <Grid container justifyContent={"flex-start"}>
          <Grid item xs={12} md={12}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tabHead}>W/F ID</TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Sub Process
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    W/F Description
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Created on
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Last Updated on
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Status
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Detailed Logs
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Attachment
                  </TableCell>
                  <TableCell align="right" className={classes.tabHead}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotions.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tab}
                    >
                      <Link href="#" to="#">
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      {row.subprocess}
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      {row.decription}
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      {row.createdate}
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      {row.lastupdatedate}
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      {row.status}
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                      >
                        {row.logs}
                      </Button>
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      {row.attachments === "" ? null : row.attachments}
                    </TableCell>
                    <TableCell align="right" className={classes.tab}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={toggleDialog}
                        className={classes.button}
                      >
                        {row.action}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    toggle: state.toggleReducer.value,
    toggleapp: state.toggleReducerApp.value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleIt: (val: boolean) => dispatch(toggle(val)),
    toggleItApp: (val: boolean) => dispatch(toggleApp(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotionDetails);
