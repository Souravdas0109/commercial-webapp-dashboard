import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";

const AuthRoute = ({ component: Component, isAuthorized: isAuth, ...rest }) => {
  const authResponse = JSON.parse(localStorage.getItem("_Gresponse"));
  const idToken =
    authResponse && authResponse.tokenObj && authResponse.tokenObj.id_token;
  if (idToken && isAuth) {
    return <Route component={Component} {...rest} />;
  } else {
    return <Login />;
    //return <Route path="/login" component={Login} {...rest} />;
  }
};

export default AuthRoute;
