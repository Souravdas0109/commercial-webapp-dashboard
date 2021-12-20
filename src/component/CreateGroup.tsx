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
import axios from "axios";
import { Toast } from "primereact/toast";
import { useEffect } from "react";
import {
  groupstatuses,
  groupTypes,
  locationTypes,
  producthierarchyTypes,
  ProducthierarchyTypes,
  LocationhierarchyTypes,
} from "../Data/Data";

//product changes start
const mainvalues = [
  { value: "none", label: "Select.." },
  { value: "division", label: "Division" },
  { value: "group", label: "Trading Group" },
  { value: "category", label: "Category" },
  { value: "department", label: "Product Group" },
  { value: "class", label: "Class" },
  { value: "subclass", label: "Sub Class" },
];
//product changes end

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
  const [currentDate, setCurrentDate] = useState("");
  const [status, setStatus] = useState("");
  const [productNames, setproductNames] = useState([]);
  const [viewProductEl, setViewProductEl] = useState(null);
  const [locationNames, setLocationNames] = useState([]);
  const [viewLocationEl, setViewLocationEl] = useState(null);
  const [hierLevels, setHierLevels] = useState<any>([]);
  const [hierLevelSelect, setHierLevelSelect] = useState<any>("");
  const [hierarchyDetails, setHierarchyDetails] = useState<any>([]);
  const [productHierarchyValues, setProductHierarchyValues] = useState<any>([]);
  const toast = useRef<any>(null);
  //product changes start.............................................
  const BASE = "https://pre-api.morrisons.com";
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [division, setDivision] = useState<any>([]);
  const [uniquediv, setUniqueDiv] = useState<any>([]);
  const [uniquedivobj, setUniqueDivObj] = useState<any>([]);
  const [group, setGroup] = useState<any>([]);
  const [uniquegrp, setUniqueGrp] = useState<any>([]);
  const [uniquegrpobj, setUniqueGrpObj] = useState<any>([]);
  const [cat, setCat] = useState<any>([]);
  const [uniquecat, setUniqueCat] = useState<any>([]);
  const [uniquecatobj, setUniqueCatObj] = useState<any>([]);
  const [dep, setDep] = useState<any>([]);
  const [uniquedep, setUniqueDep] = useState<any>([]);
  const [uniquedepobj, setUniqueDepObj] = useState<any>([]);
  const [cls, setCls] = useState<any>([]);
  const [uniquecls, setUniqueCls] = useState<any>([]);
  const [uniqueclsobj, setUniqueClsObj] = useState<any>([]);
  const [scls, setScls] = useState<any>([]);
  const [uniquescls, setUniqueScls] = useState<any>([]);
  const [uniquesclsobj, setUniqueSclsObj] = useState<any>([]);
  const [payload, setPayload] = useState<any>([]);
  const [hierLevel, setHierLevel] = useState<any>({});
  //product changes end ................................................

  //product changes start...........................................

  useEffect(() => {
    for (let d = 0; d < data.length; d++) {
      data[d]["tag"] = data[d].name;
      let tag = `${data[d].name}#${data[d].tag}#${data[d].id}`;
      if (!uniquediv.includes(tag)) {
        setUniqueDiv((prevState: any) => [...prevState, tag]);
        const splitted = tag.split("#");
        setUniqueDivObj((prevState: any) => [
          ...prevState,
          {
            value: splitted[0],
            label: splitted[1],
            id: splitted[2],
            hierGroup: "division",
          },
        ]);
      }
      for (let g = 0; g < data[d].nodes.length; g++) {
        data[d].nodes[g]["tag"] = `${data[d].tag} > ${data[d].nodes[g].name}`;
        let tag = `${data[d].nodes[g].name}#${data[d].nodes[g].tag}#${data[d].nodes[g].id}`;
        if (!uniquegrp.includes(tag)) {
          setUniqueGrp((prevState: any) => [...prevState, tag]);
          const splitted = tag.split("#");
          setUniqueGrpObj((prevState: any) => [
            ...prevState,
            {
              value: splitted[0],
              label: splitted[1],
              id: splitted[2],
              hierGroup: "group",
            },
          ]);
        }
        for (let c = 0; c < data[d].nodes[g].nodes.length; c++) {
          data[d].nodes[g].nodes[c][
            "tag"
          ] = `${data[d].nodes[g].tag} > ${data[d].nodes[g].nodes[c].name}`;
          let tag = `${data[d].nodes[g].nodes[c].name}#${data[d].nodes[g].nodes[c].tag}#${data[d].nodes[g].nodes[c].id}`;
          if (!uniquecat.includes(tag)) {
            setUniqueCat((prevState: any) => [...prevState, tag]);
            const splitted = tag.split("#");
            setUniqueCatObj((prevState: any) => [
              ...prevState,
              {
                value: splitted[0],
                label: splitted[1],
                id: splitted[2],
                hierGroup: "category",
              },
            ]);
          }
          for (let dp = 0; dp < data[d].nodes[g].nodes[c].nodes.length; dp++) {
            data[d].nodes[g].nodes[c].nodes[dp][
              "tag"
            ] = `${data[d].nodes[g].nodes[c].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].name}`;
            let tag = `${data[d].nodes[g].nodes[c].nodes[dp].name}#${data[d].nodes[g].nodes[c].nodes[dp].tag}#${data[d].nodes[g].nodes[c].nodes[dp].id}`;
            if (!uniquedep.includes(tag)) {
              setUniqueDep((prevState: any) => [...prevState, tag]);
              const splitted = tag.split("#");
              setUniqueDepObj((prevState: any) => [
                ...prevState,
                {
                  value: splitted[0],
                  label: splitted[1],
                  id: splitted[2],
                  hierGroup: "department",
                },
              ]);
            }
            for (
              let cl = 0;
              cl < data[d].nodes[g].nodes[c].nodes[dp].nodes.length;
              cl++
            ) {
              data[d].nodes[g].nodes[c].nodes[dp].nodes[cl][
                "tag"
              ] = `${data[d].nodes[g].nodes[c].nodes[dp].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].name}`;
              let tag = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].name}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].tag}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].id}`;
              if (!uniquecls.includes(tag)) {
                setUniqueCls((prevState: any) => [...prevState, tag]);
                const splitted = tag.split("#");
                setUniqueClsObj((prevState: any) => [
                  ...prevState,
                  {
                    value: splitted[0],
                    label: splitted[1],
                    id: splitted[2],
                    hierGroup: "class",
                  },
                ]);
              }
              for (
                let scl = 0;
                scl <
                data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes.length;
                scl++
              ) {
                data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl][
                  "tag"
                ] = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].tag} > ${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].name}`;
                let tag = `${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].name}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].tag}#${data[d].nodes[g].nodes[c].nodes[dp].nodes[cl].nodes[scl].id}`;
                if (!uniquescls.includes(tag)) {
                  setUniqueScls((prevState: any) => [...prevState, tag]);
                  const splitted = tag.split("#");
                  setUniqueSclsObj((prevState: any) => [
                    ...prevState,
                    {
                      value: splitted[0],
                      label: splitted[1],
                      id: splitted[2],
                      hierGroup: "subclass",
                    },
                  ]);
                }
              }
            }
          }
        }
      }
    }
  }, [data]);

  useEffect(() => {
    async function handleClick() {
      setData([]);
      setDivision([]);
      setGroup([]);
      setCat([]);
      setDep([]);
      setCls([]);
      setScls([]);
      setUniqueDivObj([]);
      setUniqueGrpObj([]);
      setUniqueCatObj([]);
      setUniqueDepObj([]);
      setUniqueClsObj([]);
      setUniqueSclsObj([]);
      setUniqueDiv([]);
      setUniqueGrp([]);
      setUniqueCat([]);
      setUniqueDep([]);
      setUniqueCls([]);
      setUniqueScls([]);
      setDisabled(true);
      let nexturl = `${BASE}/product/v1/hierarchies/reporting?apikey=ArAaZlvKV09DlZst4aGqxicONzvtGbpI&offset=0`;
      const start = new Date();
      while (nexturl !== "") {
        console.log("to visit url: ", nexturl);
        await axios
          .get(nexturl, {
            headers: {
              Authorization:
                "Basic QXJBYVpsdktWMDlEbFpzdDRhR3F4aWNPTnp2dEdicEk6d2txU0VjQWRHWllaRnc5Yg==",
            },
          })
          .then(res => {
            setData((prevState: any) => [
              ...prevState,
              ...res.data.hierarchy.nodes,
            ]);
            nexturl = res.data.metaData.links.next
              ? `${BASE}${res.data.metaData.links.next}`
              : "";
            console.log(`up next: ${res.data.metaData.links.next}`);
            console.log(res.data.hierarchy.nodes);
          })
          .catch(e => {
            nexturl = "";
            setError(e.message);
          });
      }
      // const end = new Date();
      // const timediff = end - start;
      // console.log("Time taken for api calls: ", timediff);
    }
    handleClick();
  }, []);

  const handleChange = (e: any) => {
    setHierLevel(mainvalues.filter(val => val.value === e.value));
    switch (e.value) {
      case "division":
        setDisabled(false);
        setPayload("");
        setSelected([...uniquedivobj]);
        break;
      case "group":
        setDisabled(false);
        setPayload("");
        setSelected([...uniquegrpobj]);
        break;
      case "category":
        setDisabled(false);
        setPayload("");
        setSelected([...uniquecatobj]);
        break;
      case "department":
        setDisabled(false);
        setPayload("");
        setSelected([...uniquedepobj]);
        break;
      case "class":
        setDisabled(false);
        setPayload("");
        setSelected([...uniqueclsobj]);
        break;
      case "subclass":
        setDisabled(false);
        setPayload("");
        setSelected([...uniquesclsobj]);
        break;
      default:
        setDisabled(true);
        setPayload("");
        setSelected([]);
        break;
    }
  };

  const handleHierarchyChange = (e: any) => {
    let values = [];
    for (let i = 0; i < e.length; i++) {
      values.push({
        value: e[i].label,
        label: e[i].label,
        hierarchyLevel: e[i].hierGroup,
        hierarchyId: e[i].id,
        startDate: new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, "-"),
        endDate: "2099-12-31",
      });
    }
    setPayload([...values]);
    console.log(values);
    console.log(payload);
  };

  //product changes end...................
  useEffect(() => {
    axios({
      method: "GET",
      url: `https://pre-api.morrisons.com/product/v1/hierarchies/reporting?apikey=ArAaZlvKV09DlZst4aGqxicONzvtGbpI&offset=1`,
      headers: {
        "content-type": "application/json",
        Authorization: `Basic QXJBYVpsdktWMDlEbFpzdDRhR3F4aWNPTnp2dEdicEk6d2txU0VjQWRHWllaRnc5Yg==`,
      },
    }).then((response: any) => {
      let hierarchyLevels: any = [];
      hierarchyLevels.push(response.data.hierarchy.nodes[0].type);
      hierarchyLevels.push(response.data.hierarchy.nodes[0].nodes[0].type);
      hierarchyLevels.push(
        response.data.hierarchy.nodes[0].nodes[0].nodes[0].type
      );
      hierarchyLevels.push(
        response.data.hierarchy.nodes[0].nodes[0].nodes[0].nodes[0].type
      );
      hierarchyLevels.push(
        response.data.hierarchy.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0]
          .type
      );
      hierarchyLevels.push(
        response.data.hierarchy.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0]
          .nodes[0].type
      );
      console.log(hierarchyLevels);
      setHierLevels(hierarchyLevels);
      setHierarchyDetails(response.data.hierarchy);
    });
  }, []);

  const productCustomStyles = {
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
    console.log(selected);
  };
  const viewLocationOpen = Boolean(viewLocationEl);
  const handleLocationChange = (selected: any) => {
    setLocationNames(selected);
    console.log(selected);
  };
  const handleReset = () => {
    setGroupId("");
    setGroupname("");
    setDescription("");
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
      {/* <Select
        // options={producthierarchyTypes}
        options={productHierarchyValues && productHierarchyValues}
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
      /> */}
      <Select
        closeMenuOnSelect={false}
        //components={animatedComponents}
        //defaultValue={[colourOptions[4], colourOptions[5]]}
        // components={{
        //   Option,
        // }}
        isDisabled={disabled}
        isMulti
        hideSelectedOptions={true}
        options={selected}
        value={payload}
        onChange={handleHierarchyChange}
        className={classes.multiSelect}
        styles={productCustomStyles}
        //value={payload !== "" ? payload.id : ""}
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

  //changes
  const handleHierLevelSelect = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "division") {
      const hierNames =
        hierarchyDetails.nodes &&
        hierarchyDetails.nodes.map((hier: any) => {
          return {
            label: hier.name,
            value: hier.id,
            name: hier.name,
            id: hier.id,
            type: hier.type,
          };
        });
      setProductHierarchyValues(hierNames);
    } else if (e.target.value === "group") {
      const hierNames =
        hierarchyDetails.nodes &&
        hierarchyDetails.nodes.map((hier: any) => {
          return {
            label: hier.nodes[0].name,
            value: hier.nodes[0].id,
            name: hier.nodes[0].name,
            id: hier.nodes[0].id,
            type: hier.nodes[0].type,
          };
        });
      setProductHierarchyValues(hierNames);
    } else if (e.target.value === "category") {
      const hierNames =
        hierarchyDetails.nodes &&
        hierarchyDetails.nodes.map((hier: any) => {
          return {
            label: hier.nodes[0].nodes[0].name,
            value: hier.nodes[0].nodes[0].id,
            name: hier.nodes[0].nodes[0].name,
            id: hier.nodes[0].nodes[0].id,
            type: hier.nodes[0].nodes[0].type,
          };
        });
      setProductHierarchyValues(hierNames);
    } else if (e.target.value === "department") {
      const hierNames =
        hierarchyDetails.nodes &&
        hierarchyDetails.nodes.map((hier: any) => {
          return {
            label: hier.nodes[0].nodes[0].nodes[0].name,
            value: hier.nodes[0].nodes[0].nodes[0].id,
            name: hier.nodes[0].nodes[0].nodes[0].name,
            id: hier.nodes[0].nodes[0].nodes[0].id,
            type: hier.nodes[0].nodes[0].nodes[0].type,
          };
        });
      setProductHierarchyValues(hierNames);
    } else if (e.target.value === "class") {
      const hierNames =
        hierarchyDetails.nodes &&
        hierarchyDetails.nodes.map((hier: any) => {
          return {
            label: hier.nodes[0].nodes[0].nodes[0].nodes[0].name,
            value: hier.nodes[0].nodes[0].nodes[0].nodes[0].id,
            name: hier.nodes[0].nodes[0].nodes[0].nodes[0].name,
            id: hier.nodes[0].nodes[0].nodes[0].nodes[0].id,
            type: hier.nodes[0].nodes[0].nodes[0].nodes[0].type,
          };
        });
      setProductHierarchyValues(hierNames);
    } else if (e.target.value === "subclass") {
      const hierNames =
        hierarchyDetails.nodes &&
        hierarchyDetails.nodes.map((hier: any) => {
          return {
            label: hier.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].name,
            value: hier.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].id,
            name: hier.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].name,
            id: hier.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].id,
            type: hier.nodes[0].nodes[0].nodes[0].nodes[0].nodes[0].type,
          };
        });
      setProductHierarchyValues(hierNames);
    }
  };

  //changes
  const viewProduct = (
    <Dialog
      id="basic-menu"
      open={viewProductOpen}
      onClose={handleCloseViewProduct}
    >
      <Box
        sx={{
          width: 600,
          height: 500,
          border: "3px solid green",
          borderRadius: 5,
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
            paddingLeft: 20,
            display: "flex",
          }}
        >
          <Box
            className={classes.inputFieldBox}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* {productSelect} */}
            <Box>
              <label>Hierarchy Level</label>
            </Box>
            <Box>
              {/* <select
                style={{ width: 150 }}
                defaultValue="0"
                onChange={handleHierLevelSelect}
              >
                <option disabled value="0">
                  --- Select Hierarchy Level ---
                </option>
                {hierLevels &&
                  hierLevels.map((lvl: any, index: any) => {
                    return (
                      <option key={index} value={lvl}>
                        {lvl.toUpperCase()}
                      </option>
                    );
                  })}
              </select> */}
              <Select
                defaultValue={hierLevel}
                isDisabled={data !== [] ? false : true}
                isLoading={false}
                // components={{
                //   Option,
                // }}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={mainvalues}
                onChange={handleChange}
                className={classes.multiSelect}
                styles={locationCustomStyles}
                //value={hierLevel}
              />
              {/* <TreeSelect value={hierLevelSelect} options={hierLevelValues} onChange={(e)=>setHierLevelSelect(e.value)}/> */}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: 20,
          }}
        >
          <Box>
            <label>Search Hierrachies</label>
          </Box>
          <Box
            sx={{
              justifyContent: "center",

              paddingRight: 10,
            }}
          >
            {productSelect}
          </Box>
        </Box>
      </Box>
    </Dialog>
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
            //justifyContent: "center",
            display: "flex",
            p: 2,
          }}
        >
          <Box className={classes.inputFieldBox}>{locationSelect}</Box>
        </Box>
      </Box>
    </Popover>
  );
  React.useEffect(() => {
    let today = new Date();
    let dd = String(today.getDate());

    let mm = String(today.getMonth() + 1);
    let yyyy = String(today.getFullYear());
    if (dd < "10") {
      dd = "0" + dd;
    }

    if (mm < "10") {
      mm = "0" + mm;
    }
    let startdate;
    startdate = yyyy + "-" + mm + "-" + dd;
    console.log(startdate);
    setCurrentDate(startdate);
  }, [locationNames]);

  const handleCreateGroup = (e: any) => {
    e.preventDefault();

    const formData = {
      groupName: groupname,
      groupDesc: description,
      status: status,
      locationHierarchy: locationNames.map((location: any) => {
        return {
          hierarchyLevel: location.hierarchyLevel,
          hierarchyId: location.hierarchyId,
          startDate: currentDate,
          endDate: location.endDate,
        };
      }),
      productHierarchy: payload.map((product: any) => {
        return {
          hierarchyLevel: product.hierarchyLevel,
          hierarchyId: product.hierarchyId,
          startDate: currentDate,
          endDate: product.endDate,
        };
      }),
    };
    //console.log(status);
    console.log(formData);
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
                    <Typography variant="subtitle2">
                      Group ID &nbsp;
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
                        name="groupId"
                        id="groupId"
                        placeholder="eg. 012345"
                        className={classes.inputFields}
                        onChange={ongroupIDChange}
                        value={groupId}
                        required
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box className={classes.eachRow}>
                  <Box className={classes.inputLabel}>
                    <Typography variant="subtitle2">
                      Group Name &nbsp;
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
                        name="groupname"
                        id="groupname"
                        placeholder="eg. group name 1"
                        className={classes.inputFields}
                        onChange={ongroupnameChange}
                        value={groupname}
                        required
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
                        <option
                          disabled
                          value=""
                          className={classes.selectOptions}
                        >
                          None
                        </option>
                        {groupstatuses.map(type => {
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
                      {payload ? (
                        payload.length > 0 ? (
                          <Link
                            to="#"
                            className={classes.underlineRemove}
                            onClick={handleOpenViewProduct}
                          >
                            Product Hierarchies({payload.length})
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
                      type="reset"
                      variant="contained"
                      className={classes.submitButton}
                      onClick={handleReset}
                    >
                      Reset
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
