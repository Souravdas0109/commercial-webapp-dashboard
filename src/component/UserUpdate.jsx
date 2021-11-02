import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Popover,
} from "@material-ui/core";

// import axios from 'axios';
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles, styled } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
// import SideBar from '../Layout/SideBar'
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import { viewLogRows, viewLogColumns, groupTypes } from "../Data/Data";
import { requestTypes, roleTypes, employeeDetails } from "../Data/Data";
import CloseIcon from "@material-ui/icons/Close";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primeicons/primeicons.css";
import "primereact/resources/themes/fluent-light/theme.css";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => {
  return {
    eachRow: {
      display: "flex",
      flexDirection: "row",
      paddingTop: "20px",
      alignItems: "baseline",
    },
    inputFields: {
      width: 392,
      height: 32,
    },
    selectField: {
      width: "100%",
      height: 38,
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
    submitButton: {
      width: 150,
      height: 40,
      fontSize: "bi",
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
        borderColor: teal[900],
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
      width: 80,
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

function UserUpdate() {
  const classes = useStyles();
  const length = viewLogRows.length;

  const [roleNames, setRoleNames] = React.useState([]);
  const [groupNames, setGroupNames] = React.useState([]);
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
  const [viewGroupEl, setViewGroupEl] = React.useState(null);
  const viewGroupOpen = Boolean(viewGroupEl);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : "white",
      color: state.isSelected ? "white" : teal[900],
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
  const handleGroupChange = selected => {
    setGroupNames(selected);
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
  const groupSelect = (
    <>
      <ReactSelect
        options={groupTypes}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        onChange={handleGroupChange}
        allowSelectAll={true}
        value={groupNames}
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
  const handleOpenViewGroup = e => {
    setViewGroupEl(e.currentTarget);
  };
  const handleCloseViewGroup = () => {
    setViewGroupEl(null);
  };
  const viewGroup = (
    <Popover
      id="basic-menu"
      anchorEl={viewGroupEl}
      open={viewGroupOpen}
      onClose={handleCloseViewGroup}
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
            <Typography variant="subtitle1">View Groups</Typography>
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
              onClick={handleCloseViewGroup}
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
            <b>Added Group</b>
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <Box className={classes.inputFieldBox}>{groupSelect}</Box>
        </Box>
      </Box>
    </Popover>
  );
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
            <Typography variant="subtitle1">Logs</Typography>
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
              onClick={handleCloseViewLog}
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
            Request ID:
            <b>0112233</b>
          </Typography>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
          }}
        >
          <DataTable
            value={viewLogRows}
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={5}
            style={{
              fontSize: "16px",
              backgroundColor: "#f7f7f7",
            }}
          >
            {viewLogColumns.map(column => {
              return (
                <Column
                  key={column.field}
                  field={column.field}
                  header={column.headerName}
                />
              );
            })}
          </DataTable>
        </Box>
      </Box>
    </Popover>
  );

  const createForm = (
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
          <Typography variant="h5">Update User</Typography>
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
              View Log({length})
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
            <Link to="/userconfig/usermanage" className={classes.backButton}>
              Back
            </Link>
          </Box>
        </Box>
      </Box>
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
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
            <Typography variant="subtitle2">
              {/* <input
                                type="text"
                                name="empid"
                                id="empid"
                                placeholder="eg. 123456"
                                className={classes.inputFields}
                                onChange={(e) => {
                                    setEmployeeID(e.target.value)
                                }}
                                required/> */}

              {
                typeAheadSearch
                // typeAheadSearch1
              }
            </Typography>
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
              width: 400,
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
                {/* <select name="designation"
                                id="designation"
                                className={classes.selectField}
                                defaultValue=""
                                title="designation"
                                onChange={(e) => {
                                    setDesignation(e.target.value)
                                }}
                                disabled
                            >
                                <option disabled value="">
                                    --- Select Designation ---
                                </option>
                                <option value="manager">Manager</option>
                                <option value="clerk">Clerk</option>
                                <option value="staff">Staff</option>
                            </select> */}
                <input
                  type="text"
                  placeholder="designation"
                  disabled
                  style={{
                    width: 250,
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

          <Box className={classes.inputFieldBox}>
            {/* <FormControl>
                            <Select
                                id="roleSelect"
                                multiple
                                value={roleNames}
                                onChange={handleRoleChange}
                                className={classes.multiSelect}
                                defaultValue=""
                            >
                                <MenuItem value="" disabled>
                                    --- Select Role ---
                                </MenuItem>

                                {roleTypes.map(role => {
                                    return (
                                        <MenuItem
                                            key={role.value}
                                            value={role.value}
                                        >
                                            {role.label}
                                        </MenuItem>
                                    )
                                })}

                            </Select>
                        </FormControl> */}

            {
              roleSelect1
              // roleSelect2
            }
          </Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">User Group</Typography>
          </Box>

          <Box
            sx={{
              paddingLeft: 5,
            }}
          >
            <Link
              to="#"
              className={classes.underlineRemove}
              onClick={handleOpenViewGroup}
            >
              Groups({groupNames.length})
            </Link>
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
            <Link to="#" className={classes.underlineRemove}>
              Manage Task(4)
            </Link>
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
              width: 400,
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
                      width: 200,
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
                      width: 200,
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
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 220,
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
                color="primary"
                className={classes.submitButton}
              >
                Submit
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
            {viewGroup}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserUpdate;
