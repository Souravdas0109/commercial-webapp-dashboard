import { AppBar, Grid, makeStyles, Snackbar, Toolbar } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
import { LogoMin } from "./Logos";
import { userV2Login } from "./fetch";
import { loginUser } from "../redux/Actions/Login";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { Toast } from "primereact/toast";
import { ServiceResponse } from "./Message";
import LoadingComponent from "./LoadingComponent";

const useStyles = makeStyles(theme => ({
  menuIcon: {
    color: "white",
  },
  gridContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark,
  },
  error: {
    color: "red",
  },
  modwidth: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

function Login(props: any) {
  const { loginUser, error, user, userdata, isLoading, errorMessage } = props;
  const classes = useStyles();
  let history = useHistory();
  const toast = useRef<any>(null);
  const [status, setStatus] = useState("");
  const responseGoogle = useCallback(
    (response: any) => {
      console.log("starting response");
      if ("tokenId" in response) {
        if (response && response.tokenId) {
          localStorage.setItem("_Gresponse", JSON.stringify(response));
          const idToken =
            response && response.tokenObj && response.tokenObj.id_token;
          console.log(idToken);
          loginUser(idToken);
        }
      }
    },
    [loginUser]
  );

  useEffect(() => {
    if (user && !userdata) {
      history.push("/login");
    } else if (userdata) {
      if (user && userdata.userdetails[0].user.status === "A") {
        history.push("/Commercial/dashboard");
      } else if (user && userdata.userdetails[0].user.status !== "A") {
        history.push("/login");
        setStatus("NULl");
      }
    }
  }, [user, userdata, history]);

  const responseGoogleerror = (error: any) => {
    console.log(error);
    history.push("/login");
  };
  // useEffect(() => {
  //   if (errorMessage) {
  //     let errorCode = ServiceResponse.getMessage("login", "serviceUnavailable");
  //     history.push("/login");
  //     if (errorMessage === errorCode) {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "",
  //         detail: "Login failed. Service is not available.",
  //         life: 6000,
  //       });
  //     } else {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "",
  //         detail: "Login failed. Employee does not exist.",
  //         life: 6000,
  //       });
  //     }
  //   }
  // }, [errorMessage, history]);

  // useEffect(() => {
  //   if (error) {
  //     let Errorcode;
  //     if (localStorage && localStorage.getItem("errorCode")) {
  //       Errorcode = localStorage && localStorage.getItem("_GresponseV2");
  //     }
  //     if (Errorcode === "500") {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "",
  //         detail: "Service Unavailable",
  //         life: 6000,
  //       });
  //     }
  //     if (
  //       Errorcode === "400" ||
  //       Errorcode === "404" ||
  //       Errorcode === "403" ||
  //       Errorcode === "401"
  //     ) {
  //       toast.current.show({
  //         severity: "error",
  //         summary: "",
  //         detail: "Login failed. Employee does not exist.",
  //         life: 6000,
  //       });
  //     }
  //   }
  // }, [error]);

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <div style={{ flexGrow: 1 }}>
        <AppBar
          elevation={0}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Toolbar style={{ alignItems: "center", justifyContent: "center" }}>
            <Grid container className={classes.gridContainer}>
              <Grid
                item
                className={classes.logo}
                justifyContent="center"
                xs={4}
                xl={4}
                md={4}
                lg={4}
              >
                <LogoMin />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 10,
          }}
        >
          <h1>Sign in with Google</h1>
          <GoogleLogin
            clientId="171849099600-gb5qs9al4mvmk93j3nuam7mgqvv0pmct.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogleerror}
            cookiePolicy={"single_host_origin"}
            style={{ flex: 1 }}
            autoLoad={false}
          />
        </div>
        <div
          className={classes.error}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: 10,
          }}
        >
          {errorMessage}
        </div>
        {status.toUpperCase() === "NULL" ? (
          <div
            className={classes.error}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 10,
            }}
          >
            Login Failed. Employee status is not Active
          </div>
        ) : (
          <div
            className={classes.error}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 10,
            }}
          ></div>
        )}
        {/* <ProgressLoader showLoader={isLoading} /> */}
        <LoadingComponent showLoader={isLoading} />
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.loginReducer.user,
    userdata: state.loginReducer.userdata,
    error: state.loginReducer.error,
    errorMessage: state.loginReducer.errorMessage,
    isLoading: state.loginReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loginUser: (idToken: any) => dispatch(loginUser(idToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
