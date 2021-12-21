import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { userDetails, userTableHeaders } from "../Data/Data";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Search } from "@material-ui/icons";
import "primereact/resources/primereact.css";
import { connect } from "react-redux";
import { set_empID } from "../redux/Actions/ManageUser";
import { teal } from "@material-ui/core/colors";
import axios from "axios";
import { useEffect } from "react";
const searchIcon = <Search />;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
  },
  value: {
    flex: 1,
  },
  container: {
    height: "100%",

    // padding:"16px"
  },
  links: {
    color: "blue",
  },
  exploreButton: {
    color: "blue",
    // cursor: "pointer",
    fontSize: "12px",
  },
  exploreButtonforid: {
    color: "blue",
    cursor: "pointer",
  },
}));
function ManageUserSmall(props: any) {
  const { set_empID } = props;
  const history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = React.useState(userDetails);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [manageUserData, setManageUserData] = React.useState<any>();
  const [manageUserLoading, setManageUserLoading] = React.useState(false);

  const handleNameClick = (e: any) => {
    console.log(e.target.value);
    const selectedRow = manageUserData.filter(
      (row: any) => row.userId == e.target.value
    );
    set_empID(selectedRow);
    console.log(selectedRow);
    history.push("/userconfig/userupdate");
  };

  //

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
        roles = roles + ",\n" + role.roleId;
      } else {
        roles = role.roleId;
      }
      return null;
    });
    // console.log(roles)
    return <div className={classes.exploreButton}>{roles}</div>;
  };
  const groupTemplate = (rowData: any) => {
    let groups = "";
    rowData.usergroups.map((group: any) => {
      if (groups) {
        groups = groups + ",\n" + group.groupId;
      } else {
        groups = group.groupId;
      }
      return null;
    });
    return <div className={classes.exploreButton}>{groups}</div>;
  };
  const emailTemplate = (rowData: any) => {
    return (
      <a href={`mailto:${rowData.emailId}`} className={classes.links}>
        {rowData.emailId}
      </a>
    );
  };
  const userIdTemplate = (rowData: any) => {
    return (
      <button
        className={classes.exploreButtonforid}
        value={rowData.userId}
        onClick={handleNameClick}
      >
        {rowData.userId}
      </button>
    );
  };

  //end

  const nameTemplate = (rowData: any) => {
    return (
      <button
        className={classes.exploreButton}
        value={rowData.empID}
        onClick={handleNameClick}
      >
        {rowData.firstName}
      </button>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.value}>
        <Grid container className={classes.container}>
          <Grid item sm={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                p: 2,
                width: "100%",
                flexWrap: "wrap",
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
                    width: "200px",
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
                style={{
                  fontSize: "16px",
                  backgroundColor: "#f7f7f7",
                  width: "100%",
                }}
                scrollable
                scrollHeight="300px"
                className="p-datatable-sm"
                globalFilter={globalFilter}
                emptyMessage="No customers found."
                showGridlines
                loading={manageUserLoading}
              >
                {userTableHeaders.map(column => {
                  return column.field === "roles" ||
                    column.field === "usergroups" ? (
                    <Column
                      key={column.field}
                      field={column.field}
                      header={column.headerName}
                      bodyStyle={{
                        fontSize: "10px",
                        width: column.width,
                      }}
                      headerStyle={{
                        fontSize: "10px",
                        width: column.width,
                        backgroundColor: teal[900],
                        color: "white",
                      }}
                      body={
                        (column.field === "roles" && roleTemplate) ||
                        (column.field === "usergroups" && groupTemplate)
                      }
                    />
                  ) : (
                    <Column
                      key={column.field}
                      field={column.field}
                      header={column.headerName}
                      bodyStyle={{
                        fontSize: "10px",
                        width: column.width,
                      }}
                      headerStyle={{
                        fontSize: "10px",
                        width: column.width,
                        backgroundColor: teal[900],
                        color: "white",
                      }}
                      body={column.field === "userId" && userIdTemplate}
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
  );
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    set_empID: (empid: any) => dispatch(set_empID(empid)),
  };
};

export default connect(null, matchDispatchToProps)(ManageUserSmall);
