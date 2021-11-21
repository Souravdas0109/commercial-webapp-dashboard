import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Popover,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import SidepanelUser from "./SidepanelUser";

// import axios from 'axios';
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles, styled } from "@material-ui/styles";
import React from "react";
import { Link, useHistory } from "react-router-dom";
// import SideBar from '../Layout/SideBar'
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import {
  viewLogRows,
  viewLogColumns,
  groupTypes,
  taskList,
} from "../Data/Data";
import { requestTypes, roleTypes, userDetails } from "../Data/Data";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect } from "react";
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/fluent-light/theme.css';
import { teal } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { reset_empID } from "../redux/Actions/ManageUser";

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
      fontSize: "18px",
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
        backgroundColor: teal[900],
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

function UserUpdate(props) {
  const { empDetails, reset_empID } = props;

  const history = useHistory();
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

  // const [rolesPreview, setRolesPreview] = React.useState("")

  const [viewLogEl, setViewLogEl] = React.useState(null);
  const viewLogOpen = Boolean(viewLogEl);

  const [groups, setGroups] = React.useState([]);
  const [groupInput, setGroupInput] = React.useState([]);
  const [groupOpen, setGroupOpen] = React.useState(false);

  const [tasks, setTasks] = React.useState(taskList);
  const [taskSelected, setTaskSelected] = React.useState(null);
  const [taskOpen, setTaskOpen] = React.useState(false);

  React.useEffect(() => {
    if (!empDetails) {
      history.push("/userconfig/usermanage");
    } else {
      console.log(empDetails[0]);
      setSelectEmployeeID(empDetails[0]);
      setTasks(taskList);
    }
  }, []);

  const goBack = () => {
    reset_empID();
    history.goBack();
  };

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

  React.useEffect(() => {
    if (selectEmployeeID) {
      setEmployeeID(selectEmployeeID.empID);
      setFirstName(selectEmployeeID.firstName);
      setMiddleName(selectEmployeeID.middleName);
      setLastName(selectEmployeeID.lastName);
      setEmail(selectEmployeeID.email);
      setDesignation(selectEmployeeID.designation);
      setStatus(selectEmployeeID.status);
      setComments(selectEmployeeID.comments);
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

  const handleOpenGroups = e => {
    e.preventDefault();
    setGroupOpen(true);
  };
  const handleCloseGroups = e => {
    e.preventDefault();
    setGroupOpen(false);
  };
  const updateGroups = () => {
    setGroups(groupInput);
    setGroupOpen(false);
  };

  const handleGroupsInput = selected => {
    setGroupInput(selected);
  };

  const viewGroups = (
    <Dialog onClose={handleCloseGroups} open={groupOpen}>
      <Box
        sx={{
          height: 400,
          width: 500,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <DialogTitle>Add Groups</DialogTitle>
          </Box>

          <Box
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <ReactSelect
              options={groupTypes}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
              onChange={handleGroupsInput}
              allowSelectAll={true}
              value={groupInput}
              styles={customStyles}
              placeholder="select groups"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            type="button"
            className={classes.whiteButton}
            onClick={updateGroups}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

  const handleOpenTasks = e => {
    console.log("open task");
    e.preventDefault();
    setTaskOpen(true);
  };
  const handleCloseTasks = e => {
    e.preventDefault();
    console.log("close");
    setTaskOpen(false);
  };

  const unAssignTasks = () => {
    let _tasks = tasks.filter(value => !taskSelected.includes(value));
    setTasks(_tasks);
    setTaskSelected(null);
    setTaskOpen(false);
  };
  const nameTemplate = rowData => {
    return (
      <input
        type="checkbox"
        value={rowData}
        onChange={e => console.log(e.target.value)}
      />
    );
  };
  useEffect(() => {
    console.log(taskSelected);
  }, [taskSelected]);
  const manageTasks = (
    <Dialog onClose={handleCloseTasks} open={taskOpen}>
      <Box
        sx={{
          height: 500,
          width: 500,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <DialogTitle>Manage Tasks</DialogTitle>
          </Box>

          <Box
            sx={{
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <DataTable
              value={tasks}
              selection={taskSelected}
              onSelectionChange={e => setTaskSelected(e.value)}
              className="p-datatable-sm"
              showGridlines
            >
              <Column
                selectionMode="multiple"
                headerStyle={{
                  width: "40px",
                }}
              ></Column>
              <Column field="label" header="Task">
                Tasks
              </Column>
              <Column field="count" header="Count">
                Count
              </Column>
            </DataTable>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            type="button"
            className={classes.whiteButton}
            onClick={unAssignTasks}
            disabled={!taskSelected || !taskSelected.length}
          >
            Unassign
          </Button>
        </Box>
      </Box>
    </Dialog>
  );

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
              <b>X</b>
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
              fontSize: "14px",
              backgroundColor: "#f7f7f7",
            }}
            className="p-datatable-sm"
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
        p: 3,
        paddingLeft: 50,
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
          width: 650,
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
              View Log ({viewLogRows.length})
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
            <button className={classes.backButton} onClick={goBack}>
              Back
            </button>
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
                    type.name !== "new" && (
                      <option value={type.name} key={type.name}>
                        {type.text}
                      </option>
                    )
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
              <input
                type="text"
                className={classes.inputFields}
                value={employeeID}
                disabled
              />
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

          <Box className={classes.inputFieldBox}>{roleSelect1}</Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">User Group</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="subtitle1">
              {groups ? (
                groups.length > 0 ? (
                  <button
                    className={classes.backButton}
                    onClick={handleOpenGroups}
                  >
                    Groups ( {groups.length} )
                  </button>
                ) : (
                  <button
                    className={classes.backButton}
                    onClick={handleOpenGroups}
                  >
                    Add
                  </button>
                )
              ) : (
                <button
                  className={classes.backButton}
                  onClick={handleOpenGroups}
                >
                  Add
                </button>
              )}
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <button className={classes.backButton} onClick={handleOpenTasks}>
                Tasks ( {tasks.length} )
              </button>
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
                value={comments}
              />
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "30px",
            // justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: 220,
              marginRight: "30px",
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
      {/* <div className={classes.root}>
            <div className={classes.value}>
                <Grid container className={classes.container}>
                    <Grid item lg={2} md={2} sm={4} xs={5}>
                        <SidepanelUser />
                    </Grid>
                    <Grid item lg={10} md={10} sm={8} xs={7}> */}
      {createForm}
      {viewLog}
      {viewGroups}
      {manageTasks}
      {/* </Grid>
                </Grid>
            </div>
        </div > */}
    </>
  );
}

const mapStatetoProps = state => {
  return {
    empDetails: state.manageUserReducer.empDetails,
  };
};

const matchDispatchToProps = dispatch => {
  return {
    reset_empID: () => dispatch(reset_empID()),
  };
};

export default connect(mapStatetoProps, matchDispatchToProps)(UserUpdate);
