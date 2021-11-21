import {
  makeStyles,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { userGroupDetails, userGroupTableHeaders } from "../Data/Data";

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
  backButton: {
    border: 0,
    color: "blue",
    // backgroundColor: "white",
    cursor: "pointer",
    fontSize: "15px",
  },
  paper: { minWidth: "500px" },
}));

function ManageUserGroup() {
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [globalFilter, setGlobalFilter] = useState("");
  const roleTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
  };
  const groupTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
  };
  const groupIDTemplate = (rowData: any) => {
    return (
      <Link to="#" className={classes.links}>
        {rowData.groupID}
      </Link>
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
                  <Typography variant="h5">Manage Users Group</Typography>
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
                    paddingLeft: 20,
                  }}
                >
                  <Link
                    to="/userconfig/groupcreate"
                    className={classes.backButton}
                  >
                    Create Group
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
                  value={userGroupDetails}
                  paginator
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                  rows={7}
                  globalFilter={globalFilter}
                  emptyMessage="No Users found."
                  showGridlines
                  scrollable
                  scrollHeight="500px"
                  style={{
                    width: "1000px",
                  }}
                >
                  {userGroupTableHeaders.map(column => {
                    return column.field === "productHierarchy" ||
                      column.field === "locationHierarchy" ? (
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
                        }}
                        body={
                          (column.field === "productHierarchy" &&
                            roleTemplate) ||
                          (column.field === "locationHierarchy" &&
                            groupTemplate)
                        }
                      />
                    ) : (
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
                        }}
                        body={column.field === "groupID" && groupIDTemplate}
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

export default ManageUserGroup;
