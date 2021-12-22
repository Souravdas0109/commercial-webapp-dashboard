import {
  makeStyles,
  Typography,
  Box,
  Dialog,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React from "react";
// import SidepanelUser from "./SidepanelUser";
import { useEffect, useState } from "react";
import {
  userGroupDetails,
  userGroupTableHeaders,
  viewHierarchy,
} from "../Data/Data";
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

function ManageUserGroupSmall(props: any) {
  const { set_empID } = props;
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const width = useMediaQuery(theme.breakpoints.up("md"));
  const dialogwidth = width ? 600 : fieldWidth;
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
          return {
            groupId: group.groupId,
            groupName: group.groupName,
            groupDesc: group.groupDesc,
            status: group.status,
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
      {viewProductHierarchyLog}
      {viewLocationHierarchyLog}
    </>
  );
}

export default ManageUserGroupSmall;
