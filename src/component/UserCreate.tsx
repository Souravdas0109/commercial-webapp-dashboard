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
  OutlinedInput,
  IconButton,
  InputAdornment,
} from "@material-ui/core";

// import axios from 'axios';
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, styled } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
// import SideBar from '../Layout/SideBar'
import Select, { StylesConfig } from "react-select";
import { default as ReactSelect } from "react-select";
import { useState, useEffect, useRef } from "react";
import { components } from "react-select";
import { Toast } from "primereact/toast";
import {
  viewLogRows,
  viewLogColumns,
  groupTypes,
  GroupTypes,
  userData,
} from "../Data/Data";
import {
  requestTypes,
  roleTypes,
  employeeDetails,
  statuses,
} from "../Data/Data";
import axios from "axios";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/fluent-light/theme.css';
import { teal } from "@material-ui/core/colors";
import { RoleTypes } from "../Data/Data";
import { SearchOutlined } from "@material-ui/icons";

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
      alignItems: "baseline",
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
      color: teal[900],
    },
    selectOptions: {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
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

    submitButton: {
      width: 120,
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

function UserCreate() {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const width = useMediaQuery(theme.breakpoints.up("md"));
  const dialogwidth = width ? 600 : fieldWidth;
  const [roleNames, setRoleNames] = React.useState<any>();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [empIdInput, setEmpIdInput] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [middleName, setMiddleName] = React.useState("");
  const [requestType, setRequestType] = React.useState("");
  const [selectEmployeeID, setSelectEmployeeID] = React.useState<any>();
  const [referenceDocData, setReferenceDocData] = React.useState<any>();
  const [employeeID, setEmployeeID] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [additionalInfo, setAdditionalInfo] = React.useState("");
  const [submitFlag, setSubmitFlag] = React.useState("");
  const [referenceDoc, setReferenceDoc] = React.useState<any>();
  const [viewLogEl, setViewLogEl] = React.useState(null);
  const viewLogOpen = Boolean(viewLogEl);

  const [groups, setGroups] = React.useState<any>();
  const [groupInput, setGroupInput] = React.useState<any>();
  const [groupOpen, setGroupOpen] = React.useState(false);
  //integration changes start
  const [roles, setRoles] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const toast = useRef<any>(null);
  //integration changes start
  React.useEffect(() => {
    setGroupInput(groups);
  }, [groups]);

  const customStyles: StylesConfig<GroupTypes, true> = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : "white",
      color: state.isSelected ? "white" : teal[900],
    }),
    // menu:(provided: any, state: any)=>({
    //   ...provided,
    //   height:"300px"
    // })
  };
  //integration changes start

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
          if (group.groupId) {
            return {
              label: group.groupName,
              value: group.groupId,
              groupId: group.groupId,
              groupName: group.groupName,
              groupDesc: group.groupDesc,
              status: group.status,
              locationHierarchy: group.locationHierarchy,
              productHierarchy: group.productHierarchy,
            };
          }
        });
        setGroupsData(groupValues);
        console.log(groupValues);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
  const roleSelectStyle = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderColor: teal[900],
      backgroundColor: state.isSelected ? teal[900] : "white",
      color: state.isSelected ? "white" : teal[900],
    }),
  };

  const handleReset = () => {
    setEmpIdInput("");
  };

  const handleFileUpload = (event: any) => {
    setReferenceDoc(event.target.files[0]);
    if (event.target.files[0]) {
      // let reader = new FileReader();
      // reader.readAsDataURL(event.target.files[0]);

      // reader.onload = (e: any) => {
      //   console.log(e.target.result);
      setReferenceDocData(event.target.files[0]);
      // };
    }
  };
  const onstatusChange = (e: any) => {
    setStatus(e.target.value);
  };
  const onrequestTypeChange = (e: any) => {
    setRequestType(e.target.value);
  };
  useEffect(() => {
    console.log(requestType);
  }, [requestType]);

  const handleRoleChange1 = (selected: any) => {
    console.log(selected);
    setRoleNames(selected);
    console.log(selected.length);
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
        //required
      />
      <input
        tabIndex={-1}
        autoComplete="off"
        style={{ opacity: 0, height: 0 }}
        value={roleNames}
        required
      />
    </>
  );

  const defVal = {
    user: {
      userId: "select employee Id",
    },
  };
  const typeAheadSearch = (
    <Autocomplete
      // options={employeeDetails}
      options={userData}
      // getOptionLabel={(option: any) => (option.user.empID ? "" + option.user.empID : "")}
      getOptionLabel={(option: any) =>
        option.user.userId ? option.user.userId : ""
      }
      disablePortal
      getOptionDisabled={(option: any) => option.value === "select employee Id"}
      value={
        selectEmployeeID
          ? selectEmployeeID
          : {
              user: {
                userId: "select employee Id",
              },
            }
      }
      onChange={(event: any, newValue: {} | null) => {
        setSelectEmployeeID(newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Employee ID"
          style={{
            border: "1px solid black",
            fontSize: "0.7rem",
          }}
        />
      )}
    />
  );

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
    console.log(selected);
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
            <Select
              // options={groupTypes}
              options={groupsData}
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

  React.useEffect(() => {
    if (selectEmployeeID) {
      setEmployeeID(selectEmployeeID.user.userId);
      setFirstName(selectEmployeeID.user.firstName);
      setMiddleName(selectEmployeeID.user.middleName);
      setLastName(selectEmployeeID.user.lastName);
      setEmail(selectEmployeeID.user.emailId);
      setDesignation(selectEmployeeID.user.designation);
      setStatus(selectEmployeeID.user.status);
      setRoleNames(
        selectEmployeeID.roles.map((role: any) => {
          return {
            label: role.roleId,
            value: role.roleId,
          };
        })
      );

      setGroupInput(
        selectEmployeeID.usergroups.map((group: any) => {
          return {
            label: group.groupId,
            value: group.groupId,
            status: group.status,
          };
        })
      );
      setGroups(
        selectEmployeeID.usergroups.map((group: any) => {
          return {
            label: group.groupId,
            value: group.groupId,
            status: group.status,
          };
        })
      );
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

  const goBack = () => {
    history.goBack();
  };

  const handleSearchEmployee = () => {
    // let selectedEmp = userData.filter((user: any) => {
    //   return user.user.userId === empIdInput
    // })

    axios({
      method: "GET",
      url: `https://sit-api.morrisons.com/colleague/v1/colleagues/${empIdInput}?apikey=vqaiDRZzSQhA6CPAy0rSotsQAkRepprX`,
      headers: {
        "content-type": "application/json",
        Authorization: `Basic dnFhaURSWnpTUWhBNkNQQXkwclNvdHNRQWtSZXBwclg6THhhVk01SllpckJya1FRdQ==`,
      },
    })
      .then((response: any) => {
        //console.log(response);
        if (response.status === 200) {
          let userData = response.data;
          setEmployeeID(empIdInput);
          setFirstName(userData.FirstName);
          setLastName(userData.LastName);
          setEmail(userData.email);
          setDesignation(userData.jobRole.jobTitle);

          //setStatus(userData.employee_status);
        }
      })
      .catch(err => {
        //console.log(err);
        handleReset();
        toast.current.show({
          severity: "error",
          summary: "Error!",
          detail: "Invalid Employee ID",
          life: 6000,
        });
      });
  };
  React.useEffect(() => {
    let employeedetails;
    if (localStorage && localStorage.getItem("_GresponseV2")) {
      employeedetails = JSON.parse(
        (localStorage && localStorage.getItem("_GresponseV2")) || "{}"
      );
    }
    let empid = employeedetails.empId;
    console.log(empid);
    if (empid === "40011368") {
      setSubmitFlag("ADMIN");
    } else {
      setSubmitFlag("USER");
    }
  }, []);

  const handleCreateRequest = (e: any) => {
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
        status: status,
        designation: designation.toUpperCase(),
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
      submitFlag: submitFlag,
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
        //    if (statusCode === 200) {
        //   toast.current.show({
        //     severity: "success",
        //     summary: "",
        //     detail: res.data.message,
        //     life: 6000,
        //   });
        //   // alert(res)
        //   setEmployeeID("");
        //   setFirstName("");
        //   setMiddleName("");
        //   setLastName("");
        //   setEmail("");
        //   setDesignation("");
        //   setStatus("");
        //   setGroups([]);
        //   setRoleNames([]);
        // }
        if (statusCode === 202) {
          toast.current.show({
            severity: "success",
            summary: "",
            detail: res.data,
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

    const formDataforAttachment: any = {
      requestId: "SYSTCS109",
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
        // width:"100%"
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
          {/* <Box
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
          </Box> */}
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
      <form onSubmit={handleCreateRequest}>
        <Box
          sx={{
            display: "flex",
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
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
                onChange={onrequestTypeChange}
                required
              >
                <option disabled value="">
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
              {/* {typeAheadSearch} */}
              <OutlinedInput
                value={empIdInput}
                onChange={e => setEmpIdInput(e.target.value)}
                className={classes.inputFields}
                style={{ backgroundColor: "white" }}
                placeholder="Search Employee ID"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchEmployee} edge="end">
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                }
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
                  onChange={e => {
                    setDesignation(e.target.value);
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
              {width && <>|</>}
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
            <Typography variant="subtitle2">
              Status &nbsp;
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
              <select
                name="status"
                id="status"
                className={classes.selectField}
                defaultValue=""
                onChange={onstatusChange}
                required
              >
                <option disabled value="" className={classes.selectOptions}>
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
              Role &nbsp;
              <span
                style={{
                  color: "#ff0000",
                }}
              >
                *
              </span>
            </Typography>
          </Box>

          <Box className={classes.inputFieldBox}>{roleSelect1}</Box>
        </Box>
        <Box className={classes.eachRow}>
          <Box className={classes.inputLabel}>
            <Typography variant="subtitle2">
              User Group &nbsp;
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
              <input
                tabIndex={-1}
                autoComplete="off"
                style={{ opacity: 0, height: 0 }}
                value={groups}
                required
              />
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

        <Box
          sx={{
            display: "flex",
            [theme.breakpoints.up("sm")]: {
              flexDirection: "row",
            },
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
            paddingTop: "20px",
          }}
        >
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
                type="reset"
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
      <Box sx={{ flexGrow: 1, p: 1, display: "flex" }}>
        <Grid container spacing={1}>
          <Grid container item xs={10}>
            <Toast ref={toast} position="bottom-left" />
            {createForm}
            {viewLog}
            {viewGroups}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserCreate;
