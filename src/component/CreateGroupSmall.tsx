import {
  makeStyles,
  Button,
  Grid,
  Typography,
  Box,
  useTheme,
  Popover,
  Dialog,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { components } from "react-select";
import CloseIcon from "@material-ui/icons/Close";
import { TextareaAutosize } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import {
  // statuses,
  groupTypes,
  statuses,
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
    flexDirection: "column",
    paddingTop: "20px",
    alignItems: "baseline",
  },
  inputLabel: {
    width: 200,
  },
  inputFieldBox: {
    width: 200,
  },
  textArea: {
    width: 200,
    border: "1px solid black",
  },
  inputFields: {
    width: 200,
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
    // marginLeft: "300px",
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
    // marginLeft: "150px",
    width: 100,
    height: 40,
    "&:hover": {
      fontSize: "large",
    },
  },
  // paper: { minWidth: "500px" },
}));

function CreateGroupSmall() {
  const theme = useTheme();
  const classes = useStyles();
  const [groupID, setGroupID] = useState("");
  const [groupname, setGroupname] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [productNames, setproductNames] = useState([]);
  const [viewProductEl, setViewProductEl] = useState(null);
  const [locationNames, setLocationNames] = useState([]);
  const [viewLocationEl, setViewLocationEl] = useState(null);
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
    setGroupID(e.target.value);
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
    <Dialog open={viewProductOpen} onClose={handleCloseViewProduct}>
      <Box
        sx={{
          width: 250,
          height: 400,
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
    </Dialog>
  );
  const viewLocation = (
    <Dialog open={viewLocationOpen} onClose={handleCloseViewLocation}>
      <Box
        sx={{
          width: 250,
          height: 400,
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
    </Dialog>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 1, display: "flex" }}>
        <Grid container spacing={1}>
          <Grid container item xs={12}>
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                p: 2,
                paddingLeft: 40,
                paddingRight: 30,
                textAlign: "left",
                width: 270,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
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
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      paddingLeft: 5,
                    }}
                  >
                    <Link to="#" className={classes.backButton}>
                      Back
                    </Link>
                  </Box>
                </Box>
              </Box>
              <form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "baseline",
                  }}
                >
                  <Box
                    className={classes.inputLabel}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography variant="subtitle2">Group ID</Typography>
                  </Box>
                  <Box
                    className={classes.inputFieldBox}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography variant="subtitle2">
                      <input
                        type="text"
                        name="groupID"
                        id="groupID"
                        placeholder="eg. 012345"
                        className={classes.inputFields}
                        onChange={ongroupIDChange}
                        value={groupID}
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.eachRow}>
                  <Box
                    className={classes.inputLabel}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <Typography variant="subtitle2">Group Name</Typography>
                  </Box>
                  <Box
                    className={classes.inputFieldBox}
                    sx={{
                      display: "flex",
                    }}
                  >
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
                    flexDirection: "column",
                    paddingTop: "20px",
                  }}
                >
                  <Box
                    className={classes.inputLabel}
                    sx={{
                      display: "flex",
                    }}
                  >
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
                        minRows="5"
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
                <Box className={classes.eachRow}>
                  {/* <Box className={classes.inputLabel}></Box> */}
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
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
                        className={classes.buttons}
                      >
                        Submit
                      </Button>
                    </Box>
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
export default CreateGroupSmall;
