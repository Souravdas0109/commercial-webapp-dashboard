import {
  makeStyles,
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  Popover,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { components } from "react-select";
import CloseIcon from "@material-ui/icons/Close";
import { TextareaAutosize } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import axios from "axios";
import { Toast } from "primereact/toast";
import {
  statuses,
  groupTypes,
  locationTypes,
  producthierarchyTypes,
  ProducthierarchyTypes,
  LocationhierarchyTypes,
} from "../Data/Data";

const useStyles = makeStyles(theme => ({
  table: {
    width: "100%",
    color: theme.palette.primary.main,
  },
  tab: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  tabHead: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  multiSelect: {
    "&:hover": {
      borderColor: "green",
    },
  },
  button: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  whiteButton: {
    borderColor: theme.palette.primary.main,
    border: "2px solid",
    backgroundColor: "white",
    color: theme.palette.primary.main,
    "&:hover": {
      color: "white",
    },
  },
  viewLogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    alignItems: "baseline",
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(2),
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
  space: {
    marginRight: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    position: "absolute",
    top: "0px",
    left: "0px",
  },
  spacing: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  backButton: {
    border: 0,
    color: "blue",
    // backgroundColor: "white",
    cursor: "pointer",
    fontSize: "15px",
  },
  eachRow: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "20px",
    alignItems: "baseline",
  },
  inputLabel: {
    width: 250,
  },
  inputFieldBox: {
    width: 400,
  },
  textArea: {
    width: 400,
    border: "1px solid black",
  },
  inputFields: {
    width: 392,
    height: 32,
  },
  selectField: {
    width: "100%",
    height: 38,
    color: teal[900],
  },
  selectOptions: {
    "&:hover": {
      background: teal[900],
    },
  },
  underlineRemove: {
    textDecoration: "none",
    color: "#0000ff",
  },
  submitButton: {
    marginTop: "20px",
    marginLeft: "300px",
    width: 100,
    height: 40,
    fontSize: "bi",
    color: teal[900],
    borderColor: teal[900],
    display: "inline",
    "&:hover": {
      fontSize: "large",
    },
  },
  buttons: {
    marginTop: "20px",
    marginLeft: "150px",
    width: 100,
    height: 40,
    "&:hover": {
      fontSize: "large",
    },
  },
  paper: { minWidth: "500px" },
}));

function CreateGroup() {
  const theme = useTheme();
  const classes = useStyles();
  const [groupId, setGroupId] = useState("");
  const [groupname, setGroupname] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [productNames, setproductNames] = useState([]);
  const [viewProductEl, setViewProductEl] = useState(null);
  const [locationNames, setLocationNames] = useState([]);
  const [viewLocationEl, setViewLocationEl] = useState(null);
  const toast = useRef<any>(null);
  const productCustomStyles: StylesConfig<ProducthierarchyTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : "white",
      color: state.isSelected ? "white" : teal[900],
    }),
  };
  const locationCustomStyles: StylesConfig<LocationhierarchyTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : "white",
      color: state.isSelected ? "white" : teal[900],
    }),
  };

  const viewProductOpen = Boolean(viewProductEl);
  const handleProductChange = (selected: any) => {
    setproductNames(selected);
  };
  const viewLocationOpen = Boolean(viewLocationEl);
  const handleLocationChange = (selected: any) => {
    setLocationNames(selected);
  };
  const handleReset = () => {
    setproductNames([]);
    setLocationNames([]);
  };
  const Option = (props: any) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const productSelect = (
    <>
      <Select
        options={producthierarchyTypes}
        isMulti
        onChange={handleProductChange}
        components={{
          Option,
        }}
        value={productNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={productCustomStyles}
      />
    </>
  );
  const locationSelect = (
    <>
      <Select
        options={locationTypes}
        isMulti
        onChange={handleLocationChange}
        components={{
          Option,
        }}
        value={locationNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={locationCustomStyles}
      />
    </>
  );
  const ongroupIDChange = (e: any) => {
    setGroupId(e.target.value);
  };
  const ongroupnameChange = (e: any) => {
    setGroupname(e.target.value);
  };
  const ondescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  const onstatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  const handleOpenViewProduct = (e: any) => {
    setViewProductEl(e.currentTarget);
  };
  const handleCloseViewProduct = () => {
    setViewProductEl(null);
  };
  const handleOpenViewLocation = (e: any) => {
    setViewLocationEl(e.currentTarget);
  };
  const handleCloseViewLocation = () => {
    setViewLocationEl(null);
  };
  const viewProduct = (
    <Popover
      id="basic-menu"
      anchorEl={viewProductEl}
      open={viewProductOpen}
      onClose={handleCloseViewProduct}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: window.innerHeight / 5,
        left: window.innerWidth / 2,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      elevation={0}
    >
      <Box
        sx={{
          width: 700,
          height: 500,
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
            <Typography variant="subtitle1">
              View Product Hierarchies
            </Typography>
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
              onClick={handleCloseViewProduct}
            >
              <CloseIcon />
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 2,
          }}
        >
          <Typography variant="body2">
            <b>Added Product Hierarchies</b>
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <Box className={classes.inputFieldBox}>{productSelect}</Box>
        </Box>
      </Box>
    </Popover>
  );
  const viewLocation = (
    <Popover
      id="basic-menu"
      anchorEl={viewLocationEl}
      open={viewLocationOpen}
      onClose={handleCloseViewLocation}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: window.innerHeight / 5,
        left: window.innerWidth / 2,
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      elevation={0}
    >
      <Box
        sx={{
          width: 700,
          height: 500,
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
            <Typography variant="subtitle1">
              View Location Hierarchies
            </Typography>
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
              onClick={handleCloseViewLocation}
            >
              <CloseIcon />
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 2,
          }}
        >
          <Typography variant="body2">
            <b>Added Location Hierarchies</b>
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <Box className={classes.inputFieldBox}>{locationSelect}</Box>
        </Box>
      </Box>
    </Popover>
  );

  const handleCreateGroup = (e: any) => {
    e.preventDefault();

    const formData = {
      groupName: groupname,
      groupDesc: description,
      status: status,
      //locationHierarchy: "",
      // productHierarchy: [
      //   {
      //     hierarchyLevel: "GROUP1",
      //     hierarchyId: "Core",
      //     startDate: "2021-11-09T10:57:56.884359",
      //     endDate: "2099-12-31T00:00:00",
      //   },
      // ],
    };
    let accessToken;
    if (localStorage && localStorage.getItem("_GresponseV2")) {
      accessToken = JSON.parse(
        (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
      );
    }

    axios
      .put(
        `https://dev-api.morrisons.com/commercial-user/v1/usergroups/${groupId}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
        formData,
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${accessToken.access_token}`,
          },
        }
      )
      .then(res => {
        console.log(res);
        let statusCode = res.status;
        //console.log(res.data.message);
        if (statusCode === 200) {
          toast.current.show({
            severity: "success",
            summary: "",
            detail: res.data.message,
            life: 6000,
          });
        }
      })
      .catch(err => {
        console.log(err);
        let statusCode = err.response.data.error;
        console.log(statusCode);
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail: err.response.data.error,
          life: 6000,
        });
      });
  };

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      <Box sx={{ flexGrow: 1, p: 1, display: "flex" }}>
        <Grid container spacing={1}>
          <Grid container item xs={10}>
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                p: 2,
                paddingLeft: 40,
                paddingRight: 30,
                textAlign: "left",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "20px",
                  paddingTop: "10px",
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h5">Create Group</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: 5,
                    }}
                  >
                    <Link
                      to="/userconfig/usergroup"
                      className={classes.backButton}
                    >
                      Back
                    </Link>
                  </Box>
                </Box>
              </Box>
              <form onSubmit={handleCreateGroup}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">Group ID</Typography>
                  </Box>
                  <Box className={classes.inputFieldBox}>
                    <Typography variant="subtitle2">
                      <input
                        type="text"
                        name="groupId"
                        id="groupId"
                        placeholder="eg. 012345"
                        className={classes.inputFields}
                        onChange={ongroupIDChange}
                        value={groupId}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.eachRow}>
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">Group Name</Typography>
                  </Box>
                  <Box className={classes.inputFieldBox}>
                    <Typography variant="subtitle2">
                      <input
                        type="text"
                        name="groupname"
                        id="groupname"
                        placeholder="eg. group name 1"
                        className={classes.inputFields}
                        onChange={ongroupnameChange}
                        value={groupname}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "20px",
                  }}
                >
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">Description</Typography>
                  </Box>
                  <Box className={classes.inputFieldBox}>
                    <Typography variant="subtitle2">
                      <TextareaAutosize
                        name="description"
                        id="description"
                        className={classes.textArea}
                        onChange={ondescriptionChange}
                        value={description}
                        rows="5"
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.eachRow}>
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">Status</Typography>
                  </Box>
                  <Box className={classes.inputFieldBox}>
                    <Typography variant="subtitle2">
                      <select
                        name="status"
                        id="status"
                        className={classes.selectField}
                        defaultValue=""
                        onChange={onstatusChange}
                      >
                        <option
                          disabled
                          value=""
                          className={classes.selectOptions}
                        >
                          None
                        </option>
                        {statuses.map(type => {
                          return (
                            <option value={type.statusID} key={type.statusID}>
                              {type.text}
                            </option>
                          );
                        })}
                      </select>
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.eachRow}>
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">
                      Product Hierarchies
                    </Typography>
                  </Box>

                  <Box className={classes.inputFieldBox}>
                    <Typography variant="subtitle1">
                      {productNames ? (
                        productNames.length > 0 ? (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewProduct}
                          >
                            Product Hierarchies({productNames.length})
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewProduct}
                          >
                            Add
                          </Link>
                        )
                      ) : (
                        <Link
                          to="#"
                          className={classes.underlineRemove}
                          onClick={handleOpenViewProduct}
                        >
                          Add
                        </Link>
                      )}
                    </Typography>
                    {viewProduct}
                  </Box>
                </Box>
                <Box className={classes.eachRow}>
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">
                      Location Hierarchies
                    </Typography>
                  </Box>

                  <Box className={classes.inputFieldBox}>
                    <Typography variant="subtitle1">
                      {locationNames ? (
                        locationNames.length > 0 ? (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewLocation}
                          >
                            Location Hierarchies({locationNames.length})
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewLocation}
                          >
                            Add
                          </Link>
                        )
                      ) : (
                        <Link
                          to="#"
                          className={classes.underlineRemove}
                          onClick={handleOpenViewLocation}
                        >
                          Add
                        </Link>
                      )}
                    </Typography>
                    {viewLocation}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 400,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.submitButton}
                      onClick={handleReset}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.buttons}
                      onClick={handleCreateGroup}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default CreateGroup;
