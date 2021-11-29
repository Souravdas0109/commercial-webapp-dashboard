import {
  makeStyles,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { userDetails, userTableHeaders } from "../Data/Data";
import { useHistory } from "react-router-dom";
import { set_empID } from "../redux/Actions/ManageUser";
import { connect } from "react-redux";
import { teal } from "@material-ui/core/colors";
import axios from "axios";

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

function ManageUser(props: any) {
  const { set_empID } = props;
  const theme = useTheme();
  const history = useHistory();
  const active = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [globalFilter, setGlobalFilter] = useState("");
  const [rows, setRows] = useState(userDetails);
  const [manageUserLoading, setManageUserLoading] = React.useState(false);
  //change start
  const [manageUserData, setManageUserData] = React.useState<any>();
  //change end
  const handleNameClick = (e: any) => {
    console.log(e.target.value);
    const selectedRow = rows.filter(row => row.empID == e.target.value);
    set_empID(selectedRow);
    history.push("/userconfig/userupdate");
  };
  //change start
  useEffect(() => {
    let accessToken;
    if (localStorage && localStorage.getItem("_GresponseV2")) {
      accessToken = JSON.parse(
        (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
      );
    }
    console.log(accessToken.access_token);
    axios({
      method: "GET",
      url: `https://dev-api.morrisons.com/commercial-user/v1/userdetails?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    })
      .then(res => {
        console.log(res.data.userdetails);
        const userValues = res.data.userdetails.map((user: any) => {
          if (user.user) {
            return {
              userId: user.user.userId,
              firstName: user.user.firstName,
              middleName: user.user.middleName,
              lastName: user.user.lastName,
              emailId: user.user.emailId,
              additionalInfo: user.user.additionalInfo,
              designation: user.user.designation,
              status: user.user.status,
              roles: user.roles,
              usergroups: user.usergroups,
            };
          }
        });
        console.log(userValues);
        setManageUserData(userValues);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      setManageUserData([]);
    };
  }, []);

  useEffect(() => {
    if (manageUserData) {
      setManageUserLoading(false);
    } else {
      setManageUserLoading(true);
    }
  }, [manageUserData]);

  const roleTemplate = (rowData: any) => {
    let roles = "";
    rowData.roles.map((role: any) => {
      if (roles) {
        roles = roles + ", " + role.roleId;
      } else {
        roles = roles + role.roleId;
      }
      return null;
    });
    // console.log(roles)
    return <button className={classes.exploreButton}>{roles}</button>;
  };
  const groupTemplate = (rowData: any) => {
    let groups = "";
    rowData.usergroups.map((group: any) => {
      if (groups) {
        groups = groups + ", " + group.groupId;
      } else {
        groups = groups + group.groupId;
      }
      return null;
    });
    return <button className={classes.exploreButton}>{groups}</button>;
  };
  const emailTemplate = (rowData: any) => {
    return (
      <a href={`mailto:${rowData.emailId}`} className={classes.links}>
        {rowData.emailId}
      </a>
    );
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.value}>
          <Grid container className={classes.container}>
            <Grid item lg={10} md={10} sm={8} xs={7}>
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
                  <Typography variant="h5">Manage Users</Typography>
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
              </Box>
              <Box
                sx={{
                  textAlign: "center",
                  p: 2,
                }}
              >
                <DataTable
                  value={manageUserData}
                  paginator
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  rows={10}
                  globalFilter={globalFilter}
                  emptyMessage="No Users found."
                  scrollable
                  scrollHeight="500px"
                  style={{
                    width: "1000px",
                  }}
                  showGridlines
                  loading={manageUserLoading}
                >
                  {userTableHeaders.map(column => {
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
                          (column.field === "usergroups" && groupTemplate) ||
                          (column.field === "emailId" && emailTemplate)
                        }
                        sortable
                      />
                    );
                  })}
                </DataTable>
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
    set_empID: (empid: any) => dispatch(set_empID(empid)),
  };
};

export default connect(null, matchDispatchToProps)(ManageUser);
