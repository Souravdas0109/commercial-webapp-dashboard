import { makeStyles, Typography, Box } from "@material-ui/core";
import React from "react";
// import SidepanelUser from "./SidepanelUser";
import { userGroupDetails, userGroupTableHeaders } from "../Data/Data";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { teal } from "@material-ui/core/colors";
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
  },
}));
function ManageUserGroupSmall(props: any) {
  const { set_empID } = props;
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = React.useState(userGroupDetails);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const handleNameClick = (e: any) => {
    console.log(e);
  };

  const groupIDTemplate = (rowData: any) => {
    return (
      <button
        className={classes.exploreButton}
        value={rowData.empID}
        onClick={handleNameClick}
      >
        {rowData.groupID}
      </button>
    );
  };
  const locationTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
  };
  const productTemplate = () => {
    return <button className={classes.exploreButton}>View</button>;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
          paddingBottom: 1,
          paddingTop: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              paddingRight: "10px",
            }}
          >
            <Typography variant="h5">Manage User Groups</Typography>
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
            display: "flex",
            justifySelf: "end",
          }}
        >
          <button
            className={classes.exploreButton}
            onClick={() => history.push("/userconfig/groupcreate")}
          >
            Create Group
          </button>
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
          rows={6}
          style={{
            fontSize: "10px",
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
          {userGroupTableHeaders.map(column => {
            return (
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
                  (column.field === "groupID" && groupIDTemplate) ||
                  (column.field === "productHierarchies" && productTemplate) ||
                  (column.field === "locationHierarchies" && locationTemplate)
                }
                sortable
              />
            );
          })}
        </DataTable>
      </Box>
    </>
  );
}

export default ManageUserGroupSmall;
