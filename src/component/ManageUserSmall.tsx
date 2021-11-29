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
    cursor: "pointer",
    fontSize: "12px",
  },
}));
function ManageUserSmall(props: any) {
  const { set_empID } = props;
  const history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = React.useState(userDetails);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const handleNameClick = (e: any) => {
    console.log(e.target.value);
    const selectedRow = rows.filter(row => row.empID == e.target.value);
    set_empID(selectedRow);
    history.push("/userconfig/userupdate");
  };

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
  const emailTemplate = (rowData: any) => {
    return (
      <a href={`mailto:${rowData.email}`} className={classes.links}>
        {rowData.email}
      </a>
    );
  };
  const roleTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
  };
  const groupTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
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
                value={rows}
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
              >
                {userTableHeaders.map(column => {
                  return column.field === "role" || column.field === "group" ? (
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
                        (column.field === "role" && roleTemplate) ||
                        (column.field === "group" && groupTemplate)
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
  );
}

const matchDispatchToProps = (dispatch: any) => {
  return {
    set_empID: (empid: any) => dispatch(set_empID(empid)),
  };
};

export default connect(null, matchDispatchToProps)(ManageUserSmall);
