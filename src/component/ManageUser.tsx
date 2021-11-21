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
import { userDetails, userTableHeaders } from "../Data/Data";
import { useHistory } from "react-router-dom";
import { set_empID } from "../redux/Actions/ManageUser";
import { connect } from "react-redux";

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
  const handleNameClick = (e: any) => {
    console.log(e.target.value);
    const selectedRow = rows.filter(row => row.empID == e.target.value);
    set_empID(selectedRow);
    history.push("/userconfig/userupdate");
  };
  const roleTemplate = () => {
    return (
      <Column
        selectionMode="multiple"
        headerStyle={{
          width: "40px",
        }}
      ></Column>
    );
  };
  const groupTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
  };
  const nameTemplate = (rowData: any) => {
    return (
      <button
        className={classes.links}
        value={rowData.empID}
        onClick={handleNameClick}
      >
        {rowData.firstName}
      </button>
    );
  };
  const emailTemplate = (rowData: any) => {
    return (
      <a href={`mailto:${rowData.email}`} className={classes.links}>
        {rowData.email}
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
                  value={rows}
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
                >
                  {userTableHeaders.map(column => {
                    return column.field === "role" ? (
                      <Column
                        key={column.field}
                        field={column.field}
                        header={column.headerName}
                        bodyStyle={{
                          fontSize: "14px",
                          width: column.width,
                        }}
                        selectionMode="multiple"
                        headerStyle={{ width: "3em" }}
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
                        body={
                          (column.field === "firstName" && nameTemplate) ||
                          (column.field === "email" && emailTemplate)
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
