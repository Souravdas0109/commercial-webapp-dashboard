import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Popover,
  Table,
} from "@material-ui/core";

// import axios from 'axios';
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles, styled } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
// import SideBar from '../Layout/SideBar'
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { viewLogRows, viewLogColumns } from "../Data/Data";
import { requestTypes, roleTypes, employeeDetails } from "../Data/Data";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
// import 'primereact/resources/themes/fluent-light/theme.css';
// import 'primereact/resources/primereact.css';
import { teal } from "@material-ui/core/colors";

const fieldWidth = 270;

const useStyles = makeStyles(theme => {
  return {
    mainContainer: {
      flexDirection: "column",
      display: "flex",
      textAlign: "left",
      width: window.innerWidth,
    },
    eachRow: {
      display: "flex",
      // flexDirection: "column",
      paddingTop: "20px",
      alignItems: "baseline",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    inputFields: {
      width: "100%",
      height: 32,
    },
    selectField: {
      width: "100%",
      height: 38,
    },
    inputLabel: {
      width: 200,
    },
    inputFieldBox: {
      width: fieldWidth,
    },
    textArea: {
      width: "100%",
      border: "1px solid black",
    },
    submitButton: {
      width: 150,
      height: 40,
      display: "inline",
      "&:hover": {
        fontSize: "large",
      },
    },
    buttons: {
      width: "auto",
      height: 40,
      "&:hover": {
        fontSize: "large",
      },
    },
    underlineRemove: {
      textDecoration: "none",
      color: "#0000ff",
    },
    multiSelect: {
      "&:hover": {
        borderColor: "green",
      },
    },
    rolesPopup: {
      alignItems: "center",
      width: 400,
      height: 400,
      borderColor: theme.palette.primary.main,
      border: "1px solid",
    },
    backButton: {
      border: 0,
      color: "blue",
      // backgroundColor: "white",
      cursor: "pointer",
      fontSize: "15px",
    },
    viewLogTitle: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      alignItems: "baseline",
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
    whiteButton: {
      borderColor: theme.palette.primary.main,
      border: "2px solid",
      backgroundColor: "white",
      color: theme.palette.primary.main,
      "&:hover": {
        color: "white",
      },
    },
    uploadButton: {
      width: 60,
      height: "32px",
      cursor: "pointer",
      backgroundColor: teal[900],
      color: "white",
    },
  };
});
const Input = styled("input")({
  display: "none",
});

function UserCreateSmall() {
  const classes = useStyles();

  const [roleNames, setRoleNames] = React.useState([]);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [requestType, setRequestType] = React.useState("");
  const [selectEmployeeID, setSelectEmployeeID] = React.useState("");
  const [employeeID, setEmployeeID] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [referenceDoc, setReferenceDoc] = React.useState("");

  const [roles, setRoles] = React.useState([]);

  const [viewLogEl, setViewLogEl] = React.useState(null);
  const viewLogOpen = Boolean(viewLogEl);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderColor: "green",
      backgroundColor: state.isSelected ? "green" : "white",
      color: state.isSelected ? "white" : "green",
    }),
  };

  const handleReset = () => {
    setRoleNames([]);
  };

  const handleFileUpload = event => {
    setReferenceDoc(event.target.files[0]);
  };

  const Option = props => {
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

  const handleRoleChange1 = selected => {
    console.log(selected);
    setRoleNames(selected);
  };

  const roleSelect1 = (
    <>
      <ReactSelect
        options={roleTypes}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleRoleChange1}
        allowSelectAll={true}
        value={roleNames}
        className={classes.multiSelect}
        styles={customStyles}
      />
    </>
  );

  const typeAheadSearch = (
    <Autocomplete
      options={employeeDetails}
      getOptionLabel={option => option.label || ""}
      disablePortal
      value={selectEmployeeID}
      onChange={(event, newValue) => {
        setSelectEmployeeID(newValue);
      }}
      sx={{
        display: "inline-block",
        "& input": {
          width: 200,
          bgcolor: "background.paper",
          color: theme =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Employee ID"
          style={{
            border: "1px solid black",
            fontSize: "0.875rem",
          }}
        />
      )}
    />
  );

  React.useEffect(() => {
    if (selectEmployeeID) {
      setEmployeeID(selectEmployeeID.empID);
      setFirstName(selectEmployeeID.firstName);
      setMiddleName(selectEmployeeID.middleName);
      setLastName(selectEmployeeID.lastName);
      setEmail(selectEmployeeID.email);
      setDesignation(selectEmployeeID.designation);
      setStatus(selectEmployeeID.status);
    } else {
      setEmployeeID("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setDesignation("");
      setStatus("");
    }
  }, [selectEmployeeID]);

  const handleOpenViewLog = e => {
    setViewLogEl(e.currentTarget);
  };
  const handleCloseViewLog = () => {
    setViewLogEl(null);
  };

  const viewLog = (
    <Popover
      id="basic-menu"
      anchorEl={viewLogEl}
      open={viewLogOpen}
      onClose={handleCloseViewLog}
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
      style={{
        height: 500,
      }}
    >
      <Grid
        container
        style={{
          border: "2px solid green",
        }}
      >
        <Grid
          item
          container
          xs={12}
          sm={12}
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: teal[900],
          }}
        >
          <Grid item xs={10} sm={10}>
            <Typography variant="subtitle1">Logs</Typography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <button
              style={{
                border: 0,
                padding: 0,
                height: 22,
                width: 22,
              }}
              className={classes.closeViewLog}
              onClick={handleCloseViewLog}
            >
              <b>X</b>
            </button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="body2">
            Request ID:
            <b>0112233</b>
            <br />
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <DataTable
            value={viewLogRows}
            scrollable
            scrollHeight="200px"
            style={{ minWidth: "310px" }}
            rows={3}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          >
            {viewLogColumns.map(column => {
              return (
                <Column
                  field={column.field}
                  header={column.headerName}
                  columnKey={column.field}
                  headerStyle={{
                    width: column.width,
                    padding: 1,
                    fontSize: "12px",
                  }}
                  bodyStyle={{
                    width: column.width,
                    padding: 1,
                    fontSize: "12px",
                  }}
                  rowSpan={2}
                ></Column>
              );
            })}
          </DataTable>

          <Table></Table>
        </Grid>
      </Grid>
    </Popover>
  );

  const createForm = (
    <Box
      sx={{
        p: 2,
        paddingLeft: 20,
        paddingRight: 30,
      }}
      className={classes.mainContainer}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "20px",
          paddingTop: "10px",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h5">Create Request</Typography>
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
            <button className={classes.backButton} onClick={handleOpenViewLog}>
              View Log
            </button>
          </Box>
          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            |
          </Box>
          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            <button className={classes.backButton}>Back</button>
          </Box>
        </Box>
      </Box>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Request Type</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <select
                name="requesttype"
                id="requesttype"
                className={classes.selectField}
                defaultValue=""
                onChange={e => {
                  setRequestType(e.target.value);
                }}
              >
                <option disabled value="" required>
                  --- Select Request Type ---
                </option>
                {requestTypes.map(type => {
                  return (
                    <option value={type.name} key={type.name}>
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
              Employee ID &nbsp;
              <span
                style={{
                  color: "#ff0000",
                }}
              >
                *
              </span>
            </Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">{typeAheadSearch}</Typography>
          </Box>
        </Box>

        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">First Name</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="eg. Mike"
                className={classes.inputFields}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Middle Name</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="middlename"
                id="middlename"
                placeholder="eg. Dallas"
                className={classes.inputFields}
                onChange={e => {
                  setMiddleName(e.target.value);
                }}
                value={middleName}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Last Name</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="eg. Black"
                className={classes.inputFields}
                onChange={e => {
                  setLastName(e.target.value);
                }}
                value={lastName}
                disabled
              />
            </Typography>
          </Box>
        </Box>

        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Email ID</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="eg. abc.xyz@morrisonsplc.co.uk"
                className={classes.inputFields}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                value={email}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Designation</Typography>
          </Box>

          <Box
            className={classes.inputFieldBox}
            sx={{
              flexDirection: "row",
              // width: windowWidth,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                // flexGrow: 1,
                display: "flex",
              }}
            >
              <Typography variant="subtitle2">
                <input
                  type="text"
                  placeholder="designation"
                  disabled
                  style={{
                    width: 180,
                    height: "32px",
                  }}
                  value={designation}
                />
              </Typography>
            </Box>
            <Box
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: "x-large",
                display: "flex",
              }}
            >
              |
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <button className={classes.backButton}>Additional Data</button>
            </Box>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Status</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle2">
              <input
                type="text"
                name="status"
                id="status"
                placeholder="eg. Active"
                className={classes.inputFields}
                onChange={e => {
                  setStatus(e.target.value);
                }}
                value={status}
                disabled
              />
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Role</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>{roleSelect1}</Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">User Group</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle1">
              <Link to="#" className={classes.underlineRemove}>
                Add
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Reference Document</Typography>
          </Box>

          <Box
            className={classes.inputFieldBox}
            sx={{
              flexDirection: "row",
              // width: 400,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                // flexGrow: 1,
                display: "flex",
              }}
            >
              <Typography variant="subtitle2">
                {referenceDoc ? (
                  <input
                    type="text"
                    value={referenceDoc.name}
                    onClick={() =>
                      document.getElementById("selectedFile").click()
                    }
                    style={{
                      width: 150,
                      height: "32px",
                      cursor: "pointer",
                    }}
                    placeholder="No file selected"
                  />
                ) : (
                  <input
                    type="text"
                    // value={referenceDoc.name}
                    onClick={() =>
                      document.getElementById("selectedFile").click()
                    }
                    style={{
                      // width: 200,
                      height: "32px",
                      cursor: "pointer",
                    }}
                    placeholder="No file selected"
                  />
                )}
                <Input
                  type="file"
                  id="selectedFile"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("selectedFile").click()
                  }
                  className={classes.uploadButton}
                >
                  Browse...
                </button>
              </Typography>
            </Box>
            <Box
              sx={{
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: "x-large",
                display: "flex",
              }}
            >
              |
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <button className={classes.backButton}>view(3)</button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "20px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Comments</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="body2">
              <textarea
                cols="10"
                rows="5"
                className={classes.textArea}
                placeholder="Some Comments....."
                onChange={e => {
                  setComments(e.target.value);
                }}
              />
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "30px",
            alignItems: "baseline",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              paddingBottom: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                paddingRight: 10,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.whiteButton}
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
                type="submit"
                variant="contained"
                color="primary"
                className={classes.whiteButton}
              >
                Reject
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              paddingBottom: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                paddingRight: 10,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.buttons}
              >
                Reassign
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
                Approve
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px",
            alignItems: "baseline",
            flexWrap: "wrap",
            justifyContent: "space-around",
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
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 1, display: "flex" }}>
        <Grid container spacing={1}>
          <Grid container item xs={10}>
            {createForm}
            {viewLog}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserCreateSmall;
