import { Container, useMediaQuery } from "@material-ui/core";
import React from "react";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout";
import LayoutSmall from "./LayoutSmall";
import CommercialDashboard from "./CommercialDashboard";
import Promotions from "./Promotions";
import RetailPrice from "./RetailPrice";
import RangeAmend from "./RangeAmend";
import ProductPortal from "./ProductPortal";
import SupplierPortal from "./SupplierPortal";
import KpiAnalytics from "./KpiAnalytics";
import CommercialDashboardSmall from "./CommercialDashboardSmall";
import PromotionsSmall from "./PromotionsSmall";
import RetailPriceSmall from "./RetailPriceSmall";
import RangeAmendSmall from "./RangeAmendSmall";
import ProductPortalSmall from "./ProductPortalSmall";
import SupplierPortalSmall from "./SupplierPortalSmall";
import KpiAnalyticsSmall from "./KpiAnalyticsSmall";
import store from "../redux/store";
import { Provider } from "react-redux";
import Login from "./Login";
import AuthRoute from "./AuthRoute";
import UserInformation from "./UserInformationCreate";
import UserConfiguration from "./UserConfiguration";
import UserConfigurationSmall from "./UserConfigurationSmall";
import UserConfig from "./UserConfig";
import UserInformationDashboard from "./UserInformationDashboard";
import UserCreateDashboard from "./UserCreateDashboard";
import UserInformationCreate from "./UserInformationCreate";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004e37",
      light: "#99b8af",
      dark: "#004631",
      contrastText: "#f2f5f4",
    },
    secondary: {
      main: "#fcbc00",
      light: "#fde499",
      dark: "#e2a800",
      contrastText: "#fefbf2",
    },
  },
});

const useStyles = makeStyles({
  notfound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
// const PrivateRoute = ({ component: Component, ...rest }) =>
// (
//   <Route {...rest} render={props =>
//   (
//     sessionStorage.getItem('_Gresponse') ? <Component {...props} /> : <Redirect to={{pathname: '/login'}}/>
//   )}/>
// );

function App() {
  const classes = useStyles();
  const active = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <BrowserRouter>
            {!active ? (
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/login" />
                  </Route>
                  <Route exact path="/login" component={Login}></Route>
                  <AuthRoute
                    path="/Commercial/dashboard"
                    component={CommercialDashboard}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/dashboard"
                    component={CommercialDashboard}
                  ></Route>
                  <AuthRoute
                    path="/Commercial/promotions"
                    component={Promotions}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/promotions"
                    component={Promotions}
                  ></Route>
                  <AuthRoute
                    path="/Commercial/retail"
                    component={RetailPrice}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/retail"
                    component={RetailPrice}
                  />
                  <AuthRoute
                    path="/Commercial/range"
                    component={RangeAmend}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/range"
                    component={RangeAmend}
                  />
                  <AuthRoute
                    path="/Commercial/product"
                    component={ProductPortal}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/product"
                    component={ProductPortal}
                  />
                  <AuthRoute
                    path="/Commercial/supplier"
                    component={SupplierPortal}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/supplier"
                    component={SupplierPortal}
                  />
                  <AuthRoute
                    path="/Commercial/analytics"
                    component={KpiAnalytics}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/analytics"
                    component={KpiAnalytics}
                  />
                  <AuthRoute
                    path="/userconfig/userinfo"
                    component={UserInformationDashboard}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/userconfig/userinfo"
                    component={UserInformationDashboard}
                  />
                  <AuthRoute
                    path="/userconfig/usercreate"
                    component={UserCreateDashboard}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/userconfig/usercreate"
                    component={UserCreateDashboard}
                  />
                  <Route>
                    <div className={classes.notfound}>
                      Page still under development
                    </div>
                  </Route>
                </Switch>
              </Layout>
            ) : (
              <LayoutSmall>
                <Switch>
                  <AuthRoute
                    path="/Commercial/dashboard"
                    component={CommercialDashboardSmall}
                    isAuthorized={true}
                  />
                  <Route exact path="/">
                    <Redirect to="/login" />
                  </Route>
                  <Route exact path="/login" component={Login}></Route>
                  <AuthRoute
                    path="/Commercial/dashboard"
                    component={CommercialDashboardSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/dashboard"
                    component={CommercialDashboardSmall}
                  ></Route>
                  <AuthRoute
                    path="/Commercial/promotions"
                    component={PromotionsSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/promotions"
                    component={PromotionsSmall}
                  ></Route>
                  <AuthRoute
                    path="/Commercial/retail"
                    component={RetailPriceSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/retail"
                    component={RetailPriceSmall}
                  />
                  <AuthRoute
                    path="/Commercial/range"
                    component={RangeAmendSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/range"
                    component={RangeAmendSmall}
                  />
                  <AuthRoute
                    path="/Commercial/product"
                    component={ProductPortalSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/product"
                    component={ProductPortalSmall}
                  />
                  <AuthRoute
                    path="/Commercial/supplier"
                    component={SupplierPortalSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/supplier"
                    component={SupplierPortalSmall}
                  />
                  <AuthRoute
                    path="/Commercial/analytics"
                    component={KpiAnalyticsSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/Commercial/analytics"
                    component={KpiAnalyticsSmall}
                  />
                  <AuthRoute
                    path="/userconfig/userinfo"
                    component={UserConfigurationSmall}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/userconfig/userinfo"
                    component={UserConfigurationSmall}
                  />
                  <AuthRoute
                    path="/userconfig/usercreate"
                    component={UserInformationCreate}
                    isAuthorized={true}
                  />
                  <Route
                    exact
                    path="/userconfig/create"
                    component={UserInformationCreate}
                  />
                  <Route>
                    <div className={classes.notfound}>
                      Page still under development
                    </div>
                  </Route>
                </Switch>
              </LayoutSmall>
            )}
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
