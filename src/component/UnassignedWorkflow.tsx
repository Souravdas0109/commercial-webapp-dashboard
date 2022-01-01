import {
  makeStyles,
  Grid,
  Typography,
  Box,
  useTheme,
  Button,
  useMediaQuery,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  pendingActionDetails,
  pendingActionTableHeaders,
  userDetails,
  userTableHeaders,
} from "../Data/Data";
import { useHistory } from "react-router-dom";
import { set_empID } from "../redux/Actions/ManageUser";
import { connect } from "react-redux";
import { teal } from "@material-ui/core/colors";
import axios from "axios";
import { set_pendingAction } from "../redux/Actions/PendingAction";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  container: {
    height: "100%",
    // padding:"16px"
  },
  exploreButton: {
    color: "blue",
    //cursor: "pointer",
  },
  backButton: {
    border: 0,
    color: "blue",
    // backgroundColor: "white",
    cursor: "pointer",
    fontSize: "15px",
  },
  exploreButtonforid: {
    color: "blue",
    cursor: "pointer",
  },
  value: {
    flex: 1,
  },
  links: {
    color: "blue",
  },

  paper: { minWidth: "500px" },
}));

function Unassignedworkflow(props: any) {
  const { set_pendingAction } = props;
  const theme = useTheme();
  const history = useHistory();
  const active = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [manageUserLoading, setManageUserLoading] = React.useState(false);
  //change start
  const [manageUserData, setManageUserData] = React.useState<any>();
  //change end
  const handleNameClick = (e: any) => {
    console.log(e.target.value);
    const selectedRow = pendingActionDetails.filter(
      (row: any) => row.requestedId == e.target.value
    );
    set_pendingAction(selectedRow);
    console.log(selectedRow);
    history.push("/pendingactions/update");
  };
  //change start
  // useEffect(() => {
  //   let accessToken;
  //   if (localStorage && localStorage.getItem("_GresponseV2")) {
  //     accessToken = JSON.parse(
  //       (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
  //     );
  //   }
  //   console.log(accessToken.access_token);
  //   axios({
  //     method: "GET",
  //     url: `https://dev-api.morrisons.com/commercial-user/v1/userdetails?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: `Bearer ${accessToken.access_token}`,
  //     },
  //   })
  //     .then(res => {
  //       console.log(res.data.userdetails);
  //       const userValues = res.data.userdetails.map((user: any) => {
  //         if (user.user) {
  //           return {
  //             userId: user.user.userId,
  //             firstName: user.user.firstName,
  //             middleName: user.user.middleName,
  //             lastName: user.user.lastName,
  //             emailId: user.user.emailId,
  //             additionalInfo: user.user.additionalInfo,
  //             designation: user.user.designation,
  //             status: user.user.status,
  //             roles: user.roles,
  //             usergroups: user.usergroups,
  //           };
  //         }
  //       });
  //       console.log(userValues);
  //       setManageUserData(userValues);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   return () => {
  //     setManageUserData([]);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (manageUserData) {
  //     setManageUserLoading(false);
  //   } else {
  //     setManageUserLoading(true);
  //   }
  // }, [manageUserData]);

  const roleTemplate = (rowData: any) => {
    let roles = "";
    rowData.roles.map((role: any) => {
      if (roles) {
        roles = roles + ",\n" + role.roleId;
      } else {
        roles = role.roleId;
      }
      return null;
    });
    // console.log(roles)
    return <div className={classes.exploreButton}>{roles}</div>;
  };
  // const groupTemplate = (rowData: any) => {
  //   let groups = "";
  //   rowData.usergroups.map((group: any) => {
  //     if (groups) {
  //       groups = groups + ",\n" + group.groupId;
  //     } else {
  //       groups = group.groupId;
  //     }
  //     return null;
  //   });
  //   return <div className={classes.exploreButton}>{groups}</div>;
  // };
  // const emailTemplate = (rowData: any) => {
  //   return (
  //     <a href={`mailto:${rowData.emailId}`} className={classes.links}>
  //       {rowData.emailId}
  //     </a>
  //   );
  // };

  const requestIdTemplate = (rowData: any) => {
    return (
      <button
        className={classes.exploreButtonforid}
        value={rowData.requestedId}
        onClick={handleNameClick}
      >
        {rowData.requestedId}
      </button>
    );
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.value}>
          <Grid container className={classes.container}>
            <Grid item lg={12} md={10} sm={8} xs={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: 3,
                  paddingBottom: 1,
                  paddingTop: "32px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h5">Unassigned Workflows</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <input
                    type="text"
                    value={globalFilter}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder={" Search User details "}
                    style={{
                      width: "300px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    paddingLeft: 40,
                  }}
                >
                  <Link
                    to="/userconfig/usercreate"
                    className={classes.backButton}
                  >
                    Back
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                }}
              >
                <DataTable
                  value={pendingActionDetails}
                  paginator
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  rows={10}
                  globalFilter={globalFilter}
                  emptyMessage="No Users found."
                  scrollable
                  selection={selectedProduct}
                  onSelectionChange={e => setSelectedProduct(e.value)}
                  scrollHeight="500px"
                  style={{
                    width: "1200px",
                  }}
                  showGridlines
                  //loading={manageUserLoading}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3em" }}
                  ></Column>
                  {pendingActionTableHeaders.map(column => {
                    return (
                      <Column
                        key={column.field}
                        field={column.field}
                        header={column.headerName}
                        bodyStyle={{
                          fontSize: "14px",
                          width: column.width,
                        }}
                        headerStyle={{
                          fontSize: "14px",
                          width: column.width,
                          backgroundColor: teal[900],
                          color: "white",
                        }}
                        body={
                          (column.field === "roles" && roleTemplate) ||
                          (column.field === "requestedId" && requestIdTemplate)
                        }
                        sortable
                      />
                    );
                  })}
                </DataTable>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  p: 3,

                  paddingBottom: 1,
                  paddingLeft: "1000px",
                  paddingTop: "32px",
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Assign to Me
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
const matchDispatchToProps = (dispatch: any) => {
  return {
    set_pendingAction: (pendingAction: any) =>
      dispatch(set_pendingAction(pendingAction)),
  };
};

export default connect(null, matchDispatchToProps)(Unassignedworkflow);