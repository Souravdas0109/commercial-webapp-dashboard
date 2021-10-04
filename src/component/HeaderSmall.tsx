import {
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  Grid,
  Avatar,
  Dialog,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState, useRef } from "react";
import { LogoMin } from "./Logos";
import DropDrawerSmall from "./DropDrawerSmall";
import Notifications from "./Notifications";
import { toggleNotify } from "../redux/notify/action";
import { connect } from "react-redux";
import { avtarInfo } from "./AvtarInfo";

const useStyles = (drawWidth: number) =>
  makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(5),
    },
    menuIcon: {
      color: "white",
    },
    gridContainer: {
      alignItems: "center",
    },
    logo: {
      flex: 1,
    },
    avatar: {
      backgroundColor: theme.palette.secondary.dark,
    },
    modwidth: {
      flexGrow: 1,
      //padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: drawWidth,
    },
    fullwidth: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    modal: { overflow: "auto", position: "absolute", top: "0px", left: "0px" },
  }));

interface HeaderProps {
  toggledraw: () => void;
  open: boolean;
  drawWidth: number;
  toggleNotify: any;
  toggleDispatchNot: any;
}

function HeaderSmall(props: HeaderProps) {
  const classes = useStyles(props.drawWidth)();
  const [open, setOpen] = useState(false);
  //const [openMod, setOpenMod] = useState(false);
  const scroll = "paper";

  const handleClose = () => {
    setOpen(!open);
  };

  const toggleModal = () => {
    //setOpenMod(!openMod);
    props.toggleDispatchNot(props.toggleNotify);
  };

  const inputEl = useRef(null);
  const Avtarname=avtarInfo.getLoggedInAvtarName();

  return (
    <>
      <Dialog
        open={props.toggleNotify}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.modal}
      >
        <Notifications toggleModal={toggleModal} />
      </Dialog>
      <AppBar>
        <Toolbar>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={4}>
              <IconButton
                className={classes.menuButton}
                onClick={props.toggledraw}
              >
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
            </Grid>
            <Grid item className={classes.logo} xs={8}>
              <div
              //className={props.open ? classes.modwidth : classes.fullwidth}
              >
                <LogoMin />
              </div>
            </Grid>
            {/* <Grid item>
            <Typography variant="h6">Morrisons Commercial Dashboard</Typography>
          </Grid> */}
            <Grid item xs={2}>
              <IconButton color="inherit" onClick={handleClose} ref={inputEl}>
                <Avatar className={classes.avatar} sizes="small">
                  {Avtarname}
                </Avatar>
                <DropDrawerSmall
                  handleClose={handleClose}
                  toggleModal={toggleModal}
                  open={open}
                  refer={inputEl}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    toggleNotify: state.toggleReducerNotify.value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleDispatchNot: (value: any) => dispatch(toggleNotify(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSmall);
