import {
  makeStyles,
  Grid,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { userGroupDetails, userGroupTableHeaders } from "../Data/Data";
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

  //integration changes started
  const [userGroupsData, setUserGroupsData] = useState<any>();
  const [openProduct, setOpenProduct] = React.useState(false);
  const [productData, setProductData] = useState<any>();
  const [openLocation, setOpenLocation] = React.useState(false);
  const [locationData, setLocationData] = useState<any>();
  const [userGroupLoading, setUserGroupLoading] = React.useState(false);

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
    return (
      <Link to="#" className={classes.links}>
        {rowData.groupId}
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
                  value={userGroupsData} //integraing change
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
                  loading={userGroupLoading}
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
                          backgroundColor: teal[900],
                          color: "white",
                        }}
                        body={
                          (column.field === "productHierarchy" &&
                            productTemplate) ||
                          (column.field === "locationHierarchy" &&
                            locationTemplate)
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
                          backgroundColor: teal[900],
                          color: "white",
                        }}
                        body={column.field === "groupId" && groupIDTemplate}
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
      {/* Integration changes start */}
      {viewProductHierarchy}
      {viewLocationHierarchy}
      {/* Integration changes stop */}
    </>
  );
}

export default ManageUserGroup;
