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
import {
  userGroupDetails,
  userGroupTableHeaders,
  viewHierarchy,
} from "../Data/Data";
import { teal } from "@material-ui/core/colors";
import axios from "axios";
const fieldWidth = window.innerWidth - 80;
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
  viewlogTable: {
    [theme.breakpoints.up("sm")]: {
      width: fieldWidth - 350,
    },
    [theme.breakpoints.down("sm")]: {
      width: fieldWidth - 20,
    },
  },
  closeViewLog: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    fontSize: "18px",
    "&:hover": {
      color: "yellow",
      backgroundColor: "green",
      cursor: "pointer",
    },
  },
  viewLogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    alignItems: "baseline",
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
  const width = useMediaQuery(theme.breakpoints.up("md"));
  const dialogwidth = width ? 600 : fieldWidth;
  const [userGroupsData, setUserGroupsData] = useState<any>();
  const [openProduct, setOpenProduct] = React.useState(false);
  const [productData, setProductData] = useState<any>();
  const [openLocation, setOpenLocation] = React.useState(false);
  const [locationData, setLocationData] = useState<any>([]);
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
        console.log(res.data);
        const groupValues = res.data.usergroups.map((group: any) => {
          if (group.status === "D")
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: "DELETED",
              productHierarchy: group.productHierarchy,
              locationHierarchy: group.locationHierarchy,
            };
          else if (group.status === "I")
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: "INACTIVE",
              productHierarchy: group.productHierarchy,
              locationHierarchy: group.locationHierarchy,
            };
          else
            return {
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: "ACTIVE",
              productHierarchy: group.productHierarchy,
              locationHierarchy: group.locationHierarchy,
            };
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
    console.log(userGroupsData);
  }, [userGroupsData]);
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
        {rowData.locationHierarchy.length > 0 ? (
          <button
            className={classes.exploreButton}
            onClick={() => handleOpenLocation(rowData.locationHierarchy)}
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
        {rowData.productHierarchy.length > 0 ? (
          <button
            className={classes.exploreButton}
            onClick={() => handleOpenProduct(rowData.productHierarchy)}
          >
            View
          </button>
        ) : (
          <button disabled>View</button>
        )}
      </>
    );
  };

  const viewProductHierarchyLog = (
    <Dialog open={openProduct} onClose={handleCloseProduct}>
      <Box
        sx={{
          width: dialogwidth,
          border: "3px solid green",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 30,
            flexDirection: "row",
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1">Product Hierarchy</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={handleCloseProduct}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 2,
          }}
        ></Box>
        <Box
          sx={{
            // justifyContent: "center",
            display: "flex",

            // textAlign: "center"
          }}
        >
          <DataTable
            value={productData}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={5}
            style={{
              fontSize: "12px",
              backgroundColor: "#f7f7f7",
              // width: fieldWidth,
            }}
            className={`p-datatable-sm ${classes.viewlogTable}`}
            scrollable
            scrollHeight="400px"
          >
            {viewHierarchy.map(column => {
              return (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.headerName}
                  bodyStyle={{
                    fontSize: "12px",
                    width: column.width,
                  }}
                  headerStyle={{
                    fontSize: "12px",
                    width: column.width,
                    backgroundColor: teal[900],
                    color: "white",
                  }}
                ></Column>
              );
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  );

  const viewLocationHierarchyLog = (
    <Dialog open={openLocation} onClose={handleCloseLocation}>
      <Box
        sx={{
          width: dialogwidth,
          border: "3px solid green",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 30,
            flexDirection: "row",
          }}
          className={classes.viewLogTitle}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle1">Location Hierarchy</Typography>
          </Box>
          <Box
            sx={{
              paddingRight: 2,
            }}
          >
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={handleCloseLocation}
            >
              <b>X</b>
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 2,
          }}
        ></Box>
        <Box
          sx={{
            // justifyContent: "center",
            display: "flex",

            // textAlign: "center"
          }}
        >
          <DataTable
            value={locationData}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={5}
            style={{
              fontSize: "12px",
              backgroundColor: "#f7f7f7",
              // width: fieldWidth,
            }}
            className={`p-datatable-sm ${classes.viewlogTable}`}
            scrollable
            scrollHeight="400px"
          >
            {viewHierarchy.map(column => {
              return (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.headerName}
                  bodyStyle={{
                    fontSize: "12px",
                    width: column.width,
                  }}
                  headerStyle={{
                    fontSize: "12px",
                    width: column.width,
                    backgroundColor: teal[900],
                    color: "white",
                  }}
                ></Column>
              );
            })}
          </DataTable>
        </Box>
      </Box>
    </Dialog>
  );

  //integration changes stop
  const groupIDTemplate = (rowData: any) => {
    return <div className={classes.links}>{rowData.groupId}</div>;
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
      {viewProductHierarchyLog}
      {viewLocationHierarchyLog}
      {/* Integration changes stop */}
    </>
  );
}

export default ManageUserGroup;
