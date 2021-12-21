import { makeStyles, Typography, Box, Dialog } from "@material-ui/core";
import React from "react";
// import SidepanelUser from "./SidepanelUser";
import { useEffect, useState } from "react";
import { userGroupDetails, userGroupTableHeaders } from "../Data/Data";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { teal } from "@material-ui/core/colors";
import axios from "axios";
import { Link } from "react-router-dom";
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
  const [userGroupsData, setUserGroupsData] = useState<any>();
  const [openProduct, setOpenProduct] = React.useState(false);
  const [productData, setProductData] = useState<any>();
  const [openLocation, setOpenLocation] = React.useState(false);
  const [locationData, setLocationData] = useState<any>();
  const [userGroupLoading, setUserGroupLoading] = React.useState(false);

  const handleNameClick = (e: any) => {
    console.log(e);
  };

  //start

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
      url: `https://dev-api.morrisons.com/commercial-user/v1/usergroups?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    })
      .then(res => {
        const groupValues = res.data.usergroups.map((group: any) => {
          if (group.productHierarchy[0] && group.locationHierarchy[0]) {
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: group.status,
              productHierarchy: group.productHierarchy,
              locationHierarchy: group.locationHierarchy,
            };
          } else if (group.locationHierarchy[0]) {
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: group.status,
              locationHierarchy: group.locationHierarchy,
            };
          } else if (group.productHierarchy[0]) {
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: group.status,
              productHierarchy: group.productHierarchy,
            };
          } else {
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: group.status,
            };
          }
        });
        setUserGroupsData(groupValues);
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      setUserGroupsData([]);
    };
  }, []);
  useEffect(() => {
    if (userGroupsData) {
      setUserGroupLoading(false);
    } else {
      setUserGroupLoading(true);
    }
  }, [userGroupsData]);

  const handleOpenProduct = (e: any) => {
    setProductData(e);
    setOpenProduct(true);
  };
  const handleCloseProduct = () => {
    setOpenProduct(false);
  };
  const handleOpenLocation = (e: any) => {
    setLocationData(e);
    setOpenLocation(true);
  };
  const handleCloseLocation = () => {
    setOpenLocation(false);
  };

  const locationTemplate = (rowData: any) => {
    return (
      <>
        {rowData.locationHierarchy ? (
          <button
            className={classes.exploreButton}
            onClick={() => handleOpenLocation(rowData.locationHierarchy[0])}
          >
            View
          </button>
        ) : (
          <button disabled>View</button>
        )}
      </>
    );
  };
  const productTemplate = (rowData: any) => {
    return (
      <>
        {rowData.productHierarchy ? (
          <button
            className={classes.exploreButton}
            onClick={() => handleOpenProduct(rowData.productHierarchy[0])}
          >
            View
          </button>
        ) : (
          <button disabled>View</button>
        )}
      </>
    );
  };
  const viewProductHierarchy = (
    <Dialog open={openProduct} onClose={handleCloseProduct}>
      <p>{productData && productData.hierarchyId && productData.hierarchyId}</p>
      <p>
        {productData &&
          productData.hierarchyLevel &&
          productData.hierarchyLevel}
      </p>
      <p>{productData && productData.startDate && productData.startDate}</p>
      <p>{productData && productData.endDate && productData.endDate}</p>
    </Dialog>
  );
  const viewLocationHierarchy = (
    <Dialog open={openLocation} onClose={handleCloseLocation}>
      <p>
        {locationData && locationData.hierarchyId && locationData.hierarchyId}
      </p>
      <p>
        {locationData &&
          locationData.hierarchyLevel &&
          locationData.hierarchyLevel}
      </p>
      <p>{locationData && locationData.startDate && locationData.startDate}</p>
      <p>{locationData && locationData.endDate && locationData.endDate}</p>
    </Dialog>
  );
  //integration changes stop
  const groupIDTemplate = (rowData: any) => {
    return <div className={classes.links}>{rowData.groupId}</div>;
  };

  //end

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
          value={userGroupsData}
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
          loading={userGroupLoading}
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
                  (column.field === "groupId" && groupIDTemplate) ||
                  (column.field === "productHierarchy" && productTemplate) ||
                  (column.field === "locationHierarchy" && locationTemplate)
                }
                sortable
              />
            );
          })}
        </DataTable>
      </Box>
      {viewProductHierarchy}
      {viewLocationHierarchy}
    </>
  );
}

export default ManageUserGroupSmall;
