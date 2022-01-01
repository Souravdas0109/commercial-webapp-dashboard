import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Popover,
  Dialog,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import SidepanelUser from "./SidepanelUser";

// import axios from 'axios';
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles, styled } from "@material-ui/styles";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
// import SideBar from '../Layout/SideBar'
import Select, { StylesConfig } from "react-select";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import {
  viewLogRows,
  viewLogColumns,
  taskList,
  GroupTypes,
  groupTypes,
  pendingActionUpdateTableHeaders,
} from "../Data/Data";
import { requestTypes, roleTypes, employeeDetails } from "../Data/Data";
import { RoleTypes } from "../Data/Data";
import { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/fluent-light/theme.css';
import { teal } from "@material-ui/core/colors";
import { connect } from "react-redux";
import { reset_empID } from "../redux/Actions/ManageUser";
import axios from "axios";
import { Toast } from "primereact/toast";
import { reset_pendingAction } from "../redux/Actions/PendingAction";

const fieldWidth = window.innerWidth - 80;
const useStyles = makeStyles((theme: any) => {
  return {
    eachRow: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      paddingTop: "20px",
      // alignItems: "baseline"
    },
    inputFields: {
      [theme.breakpoints.up("sm")]: {
        width: 392,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth,
      },

      height: 32,
    },
    selectField: {
      [theme.breakpoints.up("sm")]: {
        width: 392,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth,
      },
      height: 38,
    },
    inputLabel: {
      [theme.breakpoints.up("sm")]: {
        width: 250,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth,
      },
    },
    inputFieldBox: {
      [theme.breakpoints.up("sm")]: {
        width: 392,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth,
      },
    },
    textArea: {
      [theme.breakpoints.up("sm")]: {
        width: 392,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth,
      },
      border: "1px solid black",
    },
    designationField: {
      [theme.breakpoints.up("sm")]: {
        width: 250,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth,
      },
      height: "32px",
    },
    uploadTextfield: {
      [theme.breakpoints.up("sm")]: {
        width: 200,
      },
      [theme.breakpoints.down("sm")]: {
        width: fieldWidth - 80,
      },

      height: "32px",
      cursor: "pointer",
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

function UpdatePendingAction(props: any) {
  const { pendingActionDetails, reset_empID } = props;

  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const width = useMediaQuery(theme.breakpoints.up("md"));
  const dialogwidth = width ? 600 : fieldWidth;
  const [roleNames, setRoleNames] = React.useState([]);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [requestType, setRequestType] = React.useState("");
  const [selectEmployeeID, setSelectEmployeeID] = React.useState<any>();
  const [employeeID, setEmployeeID] = React.useState("");
  const [requestedId, setRequestedId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [designation, setDesignation] = React.useState<any>();
  const [status, setStatus] = React.useState("");
  const [statusWithValue, setStatusWithValue] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [referenceDoc, setReferenceDoc] = React.useState<any>();
  const [viewLogEl, setViewLogEl] = React.useState(null);
  const viewLogOpen = Boolean(viewLogEl);
  const [groupData, setGroupData] = React.useState<any>();
  const [groups, setGroups] = React.useState([]);
  const [groupInput, setGroupInput] = React.useState([]);
  const [groupOpen, setGroupOpen] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [tasks, setTasks] = React.useState(taskList);
  const [referenceDocData, setReferenceDocData] = React.useState<any>();
  const [taskSelected, setTaskSelected] = React.useState<any>(null);
  const [taskOpen, setTaskOpen] = React.useState(false);
  const toast = useRef<any>(null);

  React.useEffect(() => {
    if (!pendingActionDetails) {
      history.push("/Commercial/pendingactions");
    } else {
      console.log(pendingActionDetails[0]);
      setSelectEmployeeID(pendingActionDetails[0]);
      console.log(selectEmployeeID);
      setTasks(taskList);

      let accessToken;
      if (localStorage && localStorage.getItem("_GresponseV2")) {
        accessToken = JSON.parse(
          (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
        );
      }

      axios({
        method: "GET",
        url: `https://dev-api.morrisons.com/commercial-user/v1/roles?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken.access_token}`,
        },
      })
        .then(res => {
          console.log(res.data);
          const rolesValues = res.data.roles.map((role: any) => {
            if (role.roleId) {
              return {
                label: role.roleId,
                value: role.roleId,
                roleId: role.roleId,
                roleName: role.roleName,
                roleDesc: role.roleDesc,
              };
            }
          });
          setRoles(rolesValues);
          console.log(rolesValues);
        })
        .catch(err => {
          console.log(err);
        });

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
              label: group.groupName,
              value: group.groupId,
              groupId: group.groupId,
              groupName: group.groupName,
              status: group.status,
            };
          });
          setGroupData(groupValues);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const goBack = () => {
    reset_pendingAction();
    history.goBack();
  };

  const customStyles: StylesConfig<GroupTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: "#004d40",
      backgroundColor: state.isSelected ? "#004d40" : "white",
      color: state.isSelected ? "white" : "#004d40",
    }),
  };

  const roleSelectStyle: StylesConfig<RoleTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : "white",
      color: state.isSelected ? "white" : teal[900],
    }),
  };

  const handleReset = () => {
    setRoleNames([]);
  };
  const onrequestTypeChange = (e: any) => {
    setRequestType(e.target.value);
  };
  useEffect(() => {
    console.log(requestType);
  }, [requestType]);
  const handleFileUpload = (event: any) => {
    setReferenceDoc(event.target.files[0]);
    if (event.target.files[0]) {
      setReferenceDocData(event.target.files[0]);
    }
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

  const handleRoleChange1 = (selected: any) => {
    console.log(selected);
    setRoleNames(selected);
  };

  const roleSelect1 = (
    <>
      <Select
        options={roles}
        isMulti
        onChange={handleRoleChange1}
        components={{
          Option,
        }}
        value={roleNames}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        className={classes.multiSelect}
        styles={roleSelectStyle}
      />
    </>
  );

  React.useEffect(() => {
    if (selectEmployeeID) {
      setRequestedId(selectEmployeeID.requestedId);
      setEmployeeID(selectEmployeeID.employeeId);
      setFirstName(selectEmployeeID.firstName);
      setMiddleName(selectEmployeeID.middleName);
      setLastName(selectEmployeeID.lastName);
      setEmail(selectEmployeeID.emailId);
      setDesignation(selectEmployeeID.designation);
      if (selectEmployeeID.status === "D") {
        setStatus(selectEmployeeID.status);
        setStatusWithValue("DELETED");
      } else if (selectEmployeeID.status === "W") {
        setStatus(selectEmployeeID.status);
        setStatusWithValue("INPROGRESS");
      } else if (selectEmployeeID.status === "I") {
        setStatus(selectEmployeeID.status);
        setStatusWithValue("INACTIVE");
      } else {
        setStatus(selectEmployeeID.status);
        setStatusWithValue("ACTIVE");
      }

      //   setRoleNames(
      //     selectEmployeeID.roles.map((role: any) => {
      //       return {
      //         label: role.roleId,
      //         value: role.roleId,
      //       };
      //     })
      //   );
      //   setGroupInput(
      //     selectEmployeeID.usergroups.map((group: any) => {
      //       return {
      //         label: group.groupId,
      //         value: group.groupId,
      //         status: group.status,
      //       };
      //     })
      //   );
      //   setGroups(
      //     selectEmployeeID.usergroups.map((group: any) => {
      //       return {
      //         label: group.groupId,
      //         value: group.groupId,
      //         status: group.status,
      //       };
      //     })
      //   );
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
  }, [selectEmployeeID, groupData]);

  const handleOpenGroups = (e: any) => {
    e.preventDefault();
    setGroupOpen(true);
  };
  const handleCloseGroups = (e: any) => {
    e.preventDefault();
    setGroupOpen(false);
  };
  const updateGroups = () => {
    setGroups(groupInput);
    setGroupOpen(false);
  };

  const handleGroupsInput = (selected: any) => {
    setGroupInput(selected);
  };

  const viewGroups = (
    <Dialog onClose={handleCloseGroups} open={groupOpen}>
      <Box
        sx={{
          height: 450,
          width: dialogwidth,
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
            {/* <ReactSelect
                            options={groupItems}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                                Option
                            }}
                            onChange={handleGroupsInput}
                            allowSelectAll={true}
                            value={groupInput}
                            styles={customStyles}
                            placeholder="select groups"
                        /> */}
            <Select
              options={groupData}
              isMulti
              onChange={handleGroupsInput}
              components={{
                Option,
              }}
              value={groupInput}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              className={classes.multiSelect}
              styles={customStyles}
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

  const handleOpenTasks = (e: any) => {
    console.log("open task");
    e.preventDefault();
    setTaskOpen(true);
  };
  const handleCloseTasks = (e: any) => {
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

  const manageTasks = (
    <Dialog onClose={handleCloseTasks} open={taskOpen}>
      <Box
        sx={{
          height: 500,
          width: dialogwidth,
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
              scrollable
              scrollHeight="400px"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{
                  width: "40px",
                  backgroundColor: teal[900],
                  color: "white",
                }}
              ></Column>
              <Column
                field="label"
                header="Task"
                headerStyle={{
                  // width: "40px",
                  backgroundColor: teal[900],
                  color: "white",
                }}
              >
                Tasks
              </Column>
              <Column
                field="count"
                header="Count"
                headerStyle={{
                  // width: "40px",
                  backgroundColor: teal[900],
                  color: "white",
                }}
              >
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

  const handleOpenViewLog = (e: any) => {
    setViewLogEl(e.currentTarget);
  };
  const handleCloseViewLog = () => {
    setViewLogEl(null);
  };

  const viewLog = (
    <Dialog open={viewLogOpen} onClose={handleCloseViewLog}>
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
            // justifyContent: "center",
            display: "flex",

            // textAlign: "center"
          }}
        >
          <DataTable
            value={viewLogRows}
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
            {viewLogColumns.map(column => {
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

  const handleUpdateUser = (e: any) => {
    e.preventDefault();
    const formData = {
      requestType: requestType,
      user: {
        EmployeeId: employeeID,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId: email,
        additionalInfo: designation,
        designation: designation.toUpperCase(),
        status: status,
      },
      roles: roleNames.map((role: any) => {
        return {
          roleId: role.value,
        };
      }),
      usergroups: groups.map((group: any) => {
        return {
          groupId: group.value,
          status: group.status,
        };
      }),
    };
    console.log(formData);

    let accessToken;
    if (localStorage && localStorage.getItem("_GresponseV2")) {
      accessToken = JSON.parse(
        (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
      );
    }
    console.log(accessToken.access_token);
    axios
      .put(
        `https://dev-api.morrisons.com/commercial-workflow/v1/users/userdetails/${employeeID}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
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
        // if (statusCode === 200) {
        //   toast.current.show({
        //     severity: "success",
        //     summary: "",
        //     detail: res.data.message,
        //     life: 6000,
        //   });
        //   // alert(res)
        // }
        if (statusCode === 202)
          toast.current.show({
            severity: "success",
            summary: "",
            detail: res.data,
            life: 6000,
          });
      })
      .catch(err => {
        console.log(err.response);
        let statusCode = err.response.status;
        console.log(statusCode);
        // alert(err)
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail: err.response.data.error,
          life: 6000,
        });
      });

    const formDataforAttachment: any = {
      requestId: "SYSTCS175",
      timestamp: "2021-12-12",
      userId: employeeID,
      role: "ADMIN",
      camundaRequestId: "C1234567",
      actionTaken: "New",
      comments: "comments",
    };

    const formdata = new FormData();
    formdata.append("fileIn", referenceDocData);
    formdata.append(
      "postData",
      new Blob([JSON.stringify(formDataforAttachment)], {
        type: "application/json",
      })
    );

    //start
    axios
      .post(
        `https://dev-api.morrisons.com/commercial-user/v1/tasklogs?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
        formdata,
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${accessToken.access_token}`,
            "content-type": "application/json",
          },
        }
      )
      .then(res => {
        console.log(res);
        let statusCode = res.status;
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
        console.log(err.response);
        let statusCode = err.response.status;
        console.log(statusCode);
        // alert(err)
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail: err.response.data.error,
          life: 6000,
        });
      });
  };

  const createForm = (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        p: 2,
        [theme.breakpoints.up("sm")]: {
          paddingLeft: 30,
          paddingRight: 30,
        },
        [theme.breakpoints.down("sm")]: {
          paddingLeft: 10,
          paddingRight: 20,
        },
        textAlign: "left",
        width: width ? 700 : fieldWidth,
      }}
    >
      <Box
        sx={{
          display: "flex",
          [theme.breakpoints.up("sm")]: {
            flexDirection: "row",
          },
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
          },
          paddingBottom: "20px",
          paddingTop: "10px",
          // width: fieldWidth
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Typography variant="h5">Pending Action - {requestedId}</Typography>
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
      <form onSubmit={handleUpdateUser}>
        <Box className={classes.eachRow}>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <DataTable
              value={pendingActionDetails}
              paginator
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
              rows={10}
              // globalFilter={globalFilter}
              emptyMessage="No Users found."
              //   scrollable
              //   scrollHeight="500px"
              //   style={{
              //     width: "1000px",
              //   }}
              showGridlines
              //loading={manageUserLoading}
            >
              {pendingActionUpdateTableHeaders.map(column => {
                return (
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
                    // body={
                    //   (column.field === "roles" && roleTemplate) ||
                    //   (column.field === "requestedId" && requestIdTemplate)
                    // }
                    sortable
                  />
                );
              })}
            </DataTable>
          </Box>
        </Box>
        <Box
          // sx={{
          //     display: "flex",
          //     flexDirection: "row",
          //     alignItems: "baseline"
          // }}
          className={classes.eachRow}
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
                onChange={onrequestTypeChange}
                required
              >
                <option disabled value="">
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
                // onChange={e => {
                //   setFirstName(e.target.value);
                // }}
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
                // onChange={e => {
                //   setMiddleName(e.target.value);
                // }}
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
                // onChange={e => {
                //   setLastName(e.target.value);
                // }}
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
                // onChange={e => {
                //   setEmail(e.target.value);
                // }}
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
            // className={classes.inputFieldBox}
            sx={{
              [theme.breakpoints.up("sm")]: {
                flexDirection: "row",
                width: 400,
              },
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                width: fieldWidth,
              },

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
                  className={classes.designationField}
                  value={designation}
                />
              </Typography>
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
                // onChange={e => {
                //   setStatus(e.target.value);
                // }}
                value={statusWithValue}
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
              [theme.breakpoints.up("sm")]: {
                flexDirection: "row",
              },
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },

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
                {
                  <input
                    type="text"
                    value={referenceDoc ? referenceDoc.name : ""}
                    onClick={() =>
                      document.getElementById("selectedFile")!.click()
                    }
                    className={classes.uploadTextfield}
                    placeholder="No file selected"
                    readOnly
                  />
                }
                <Input
                  type="file"
                  id="selectedFile"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("selectedFile")!.click()
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
              {width && <>|</>}
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
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">Comments</Typography>
          </Box>

          <Box className={classes.inputFieldBox}>
            <Typography variant="body2">
              <textarea
                cols={10}
                rows={5}
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
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "center",
            },
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
              [theme.breakpoints.down("sm")]: {
                paddingBottom: "20px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Button
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
              [theme.breakpoints.up("sm")]: {
                width: 400,
              },
              [theme.breakpoints.down("sm")]: {
                width: 250,
                paddingBottom: "20px",
              },
            }}
          >
            {width && (
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
            )}

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
          {!width && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
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
          )}
        </Box>
      </form>
    </Box>
  );

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      {createForm}
      {viewLog}
      {viewGroups}
      {manageTasks}
    </>
  );
}

const mapStatetoProps = (state: any) => {
  return {
    pendingActionDetails: state.pendingActionReducer.pendingActionDetails,
  };
};

const matchDispatchToProps = (dispatch: any) => {
  return {
    reset_pendingAction: () => dispatch(reset_pendingAction()),
  };
};

export default connect(
  mapStatetoProps,
  matchDispatchToProps
)(UpdatePendingAction);
