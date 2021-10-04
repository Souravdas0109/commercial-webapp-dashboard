import {
    Grid,
    Typography,
    makeStyles,
    Button,
    Tooltip,
    InputAdornment,
    MenuItem,
    FormControl,
    useMediaQuery,
    useTheme,
  } from "@material-ui/core";
  import "date-fns";
  import { format } from "date-fns";
  import ArrowBack from "@material-ui/icons/ArrowBack";
  import InfoOutlined from "@material-ui/icons/InfoOutlined";
  import Warning from "@material-ui/icons/Warning";
  import DeptData from "./serviceJson/departments.json";
  import TextField from "@material-ui/core/TextField";
  import { MuiPickersUtilsProvider } from "@material-ui/pickers";
  import CloudUploadIcon from "@material-ui/icons/CloudUpload";
  import {
    ValidatorForm,
    TextValidator,
    SelectValidator,
  } from "react-material-ui-form-validator";
  import DateFnsUtils from "@date-io/date-fns";
  import React, { useEffect, useRef, useState } from "react";
  import { useHistory, Prompt } from "react-router-dom";
  import { errorMessage, helperTexts } from "./util/messages";
  import { validate } from "./util/validate";
  import { NEW_SETUP_MAX } from "./util/const";
  import ValidatedDatePicker from "./ValidatedDatePicker";
  import { util } from "./rangecreate/util";
  import { labels } from "./messages";
  import { red } from "@material-ui/core/colors";
  
  const useStyles = makeStyles((theme) => ({
    card: {
      margin: theme.spacing(2),
    },
    spacing: {
      margin: theme.spacing(2),
    },
    flex: {
      marginTop: theme.spacing(4),
      //marginBottom: theme.spacing(4),
      display: "flex",
    },
    flex1: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(4),
      display: "flex",
    },
    hidden: { visibility: "hidden" },
    button1: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(2),
      paddingRight: theme.spacing(6),
  
      //w-full pr-12 mb-4 mt-2 flex
    },
    space: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    activeTab: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    default: {
      backgroundColor: "lightgrey",
      color: "grey",
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    bold: {
      fontWeight: "bold",
    },
    color90: {
      color: theme.palette.primary.main,
    },
    color80: {
      color: "#FFBF00",
    },
    color60: {
      color: "red",
    },
    tool: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    btnproducttype: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    tabHead: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      marginLeft: theme.spacing(2),
      // [theme.breakpoints.down("sm")]: {
      //   fontSize: "0.8em",
      // },
      // [theme.breakpoints.down("xs")]: {
      //   fontSize: "0.6em",
      // },
    },
    margin: {
      margin: theme.spacing(2),
    },
    button: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8em",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.6em",
      },
    },
    text: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8em",
      },
    },
    back: {
      marginLeft: theme.spacing(8),
      [theme.breakpoints.between("sm", "md")]: {
        marginLeft: theme.spacing(4),
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    pt6: {
      paddingTop: theme.spacing(3),
    },
  }));
  let departmentsList = util.getDepartments(DeptData);
  
  function Dashboard() {
    const theme = useTheme();
    const active = useMediaQuery(theme.breakpoints.down("md"));
    const classes = useStyles();
    const history = useHistory();
    const isReadOnly = true;
    const isRangeItemEditAccess = false;
    const departments = departmentsList;
    const [categories, setCategories] = useState([]);
    const [department, setDepartment] = useState({
      department: "",
      departmentId: "",
    });
    const [category, setCategory] = useState({
      category: "",
      categoryId: "",
    });
    const [name, setName] = useState("");
    const [buyer, setBuyer] = useState("");
    const handleClick = () => {
      history.goBack();
    };
    const [targetDateWarningMessage, setTargetDateWarningMessage] = useState("");
    const [productType, setProductType] = useState("existingProducts");
    const [buyerAssistant, setBuyerAssistant] = useState("");
    const [supplyChainSpecialist, setSupplyChainSpecialist] = useState("");
    const [targetLaunchDate, setTargetLaunchDate] = useState("");
    const [isPageModified, setIsPageModified] = useState(false);
    const formRef = useRef(null);
  
    useEffect(() => {
      ValidatorForm.addValidationRule("validProducts", (products) => {
        if (!products) {
          return true;
        } else {
          return validate.productsValidate(products);
        }
      });
      ValidatorForm.addValidationRule("duplicateProducts", (products) => {
        if (!products) {
          return true;
        } else {
          //return validate.duplicateProducts(products, props.productSearchResults)
          return validate.duplicateProducts(products, []).length > 0
            ? false
            : true;
        }
      });
      ValidatorForm.addValidationRule("minCountLessThanHundred", (products) => {
        //if (!props.products) {
        if (!products) {
          return true;
        } else {
          return validate.minCountValidate(products);
        }
      });
      ValidatorForm.addValidationRule("validDate", (targetLaunchDate) => {
        if (!targetLaunchDate) {
          return false;
        } else {
          return validate.validateDate(targetLaunchDate);
        }
      });
      ValidatorForm.addValidationRule("newSetupProducts", (count) => {
        if (count) {
          const isValid = /^[0-9]+$/.test(count);
          const isValidCount =
            isValid && count > 0 && count <= NEW_SETUP_MAX ? true : false;
          return isValid && isValidCount ? true : false;
        } else {
          return true;
        }
      });
      return () => {
        ValidatorForm.removeValidationRule("validProducts");
        ValidatorForm.removeValidationRule("duplicateProducts");
        ValidatorForm.removeValidationRule("minCountLessThanHundred");
        ValidatorForm.removeValidationRule("newSetupProducts");
      };
    });
  
    useEffect(() => {
      const findCategoriesAgainstDept = (searchKey: number) => {
        const selectedDepartment = departments.filter((department) => {
          return department.id === searchKey;
        });
        setCategories(
          selectedDepartment[0] &&
            selectedDepartment[0].categories.map((category: any) => {
              return {
                name: category.department.name,
                id: category.department.id,
              };
            })
        );
      };
      if (department.departmentId) {
        findCategoriesAgainstDept(parseInt(department.departmentId));
      } else {
        setCategories([]);
      }
    }, [department, departments]);
  
    const departmentList = departments.map((department) => {
      return (
        <MenuItem
          key={department.id}
          value={department.id}
          className={classes.color90}
        >
          {department.name}
        </MenuItem>
      );
    });
  
    const categoryList = (categories || []).map((category: any) => {
      return (
        <MenuItem
          key={category.id}
          value={category.id}
          className={classes.color90}
        >
          {category.name}
        </MenuItem>
      );
    });
  
    const onNameChange = (e: any) => {
      setName(e.target.value);
      setIsPageModified(true);
    };
  
    const onBuyerNameChange = (e: any) => {
      setBuyer(e.target.value);
      setIsPageModified(true);
    };
  
    const onDepartmentChange = (e: any) => {
      const deptname = departments
        .filter((dep) => dep.id === e.target.value)
        .map((dept) => dept.name)
        .toString();
      setDepartment({
        department: deptname,
        departmentId: e.target.value,
      });
      setIsPageModified(true);
      buildRangeResetName(deptname, "department");
    };
    const onBuyerAssistantChange = (e: any) => {
      setBuyerAssistant(e.target.value);
      setIsPageModified(true);
    };
    const onCategoryChange = (e: any) => {
      const categname = categories
        .filter((cat: any) => cat.id === e.target.value)
        .map((categ: any) => categ.name)
        .toString();
  
      setCategory({
        category: categname,
        categoryId: e.target.value,
      });
      setIsPageModified(true);
      buildRangeResetName(categname, "category");
    };
  
    const onSupplyChainSpecialistChange = (e: any) => {
      setSupplyChainSpecialist(e.target.value);
      setIsPageModified(true);
    };
  
    const onTargetLaunchDateChange = (targetLaunchDate: any) => {
      setTargetDateWarningMessage(
        util.validateTargetDateForMondayandTwentyEightWeeks(targetLaunchDate)
      );
      try {
        setTargetLaunchDate(format(targetLaunchDate, "yyyy-MM-dd HH:mm:ss.SSS"));
      } catch (error) {
        setTargetLaunchDate(targetLaunchDate);
      }
      setIsPageModified(true);
      buildRangeResetName(targetLaunchDate, "targetLaunchDate");
    };
  
    const targetDateWarningSection = targetDateWarningMessage ? (
      <div
      //className={`w-full text-xs mt-2 flex items-center ${classes.warningMsg}`}
      >
        <Warning fontSize="small" style={{ color: red[200] }} />
        {/* <span className="pl-1 pt-1">{targetDateWarningMessage}</span> */}
        <span>{targetDateWarningMessage}</span>
      </div>
    ) : null;
  
    const handleSubmit = () => {
      console.log("Submit action triggered");
    };
  
    const buildRangeResetName = (fieldValue: any, field: any) => {
      const rangeResetName = util.getRangeResetName(name, fieldValue, field);
      setName(rangeResetName);
      setIsPageModified(true);
    };
  
    const productOptions = [
      { label: "Existing Products", value: "existingProducts" },
      { label: "New Products", value: "newProducts" },
      { label: "New-Setup Pending Products", value: "newSetupPendingProducts" },
    ];
  
    const existingProductsSection =
      productType === "existingProducts" ? (
        !active ? (
          <Grid container>
            <Grid item>
              <div className={classes.flex}>
                <TextValidator
                  fullWidth
                  label="Products"
                  disabled={isReadOnly || !isRangeItemEditAccess}
                  //onChange={onProductsChange}
                  //className="w-4/5"
                  multiline
                  //rows={3}
                  name="products"
                  value={"Products"}
                  validators={["validProducts", "duplicateProducts"]}
                  errorMessages={[
                    errorMessage.getErrorMessage(
                      "createRangeReset",
                      "invalidProducts"
                    ),
                    errorMessage.getErrorMessage(
                      "createRangeReset",
                      "duplicateProducts"
                    ),
                  ]}
                  inputProps={{ "data-cy": "products-input" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={helperTexts.getHelperText(
                            "createRangeReset",
                            "productsAdd"
                          )}
                        >
                          <InfoOutlined
                            fontSize="small"
                            color="disabled"
                          ></InfoOutlined>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                {/* <div className="flex items-end pb-4 pl-2"> */}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isReadOnly || !isRangeItemEditAccess}
                  //className="ml-4 mt-4"
                  data-cy="add-products-btn"
                  className={classes.button}
                  //onClick={handleProductsAdd}
                >
                  Add
                </Button>
              </div>
              {/* </div> */}
            </Grid>
            {/* <div className="w-1/2 pr-12 flex flex-wrap"> */}
            <Grid item>
              {/* <div className="w-full flex items-end mt-4"> */}
              <div className={classes.flex1}>
                <input
                  accept=".csv,.xls,.xlsx"
                  id="uploadProduct"
                  multiple
                  className={classes.hidden}
                  type="file"
                  //onChange={handleFileSelection}
                />
                <label htmlFor="uploadProduct">
                  <Button
                    variant="contained"
                    component="span"
                    color="default"
                    disabled={isReadOnly}
                    startIcon={<CloudUploadIcon />}
                    className={classes.button}
                  >
                    Choose File
                  </Button>
                </label>
                {/* <div className="flex items-end pl-4"> */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "3px" }}
                  //className="ml-4 mt-4"
                  //disabled={isReadOnly || !uploadedFileName || props.itemUploaded}
                  disabled={isReadOnly}
                  //onClick={handleProductsUpload}
                  data-cy="file-upload"
                  className={classes.button}
                >
                  Upload
                </Button>
                {/* </div> */}
                {/* <div className="pb-1 pl-2"> */}
                <Tooltip
                  title={helperTexts.getHelperText(
                    "createRangeReset",
                    "productsUpload"
                  )}
                >
                  <InfoOutlined fontSize="small" color="disabled"></InfoOutlined>
                </Tooltip>
              </div>
              {/* <div className="pl-2" data-cy="file-name">
                {uploadedFileName}
              </div> */}
              {/* </div> */}
              {/* <div className={`w-full text-xs mt-2 ${classes.errorMsg}`}>
              {uploadedFileError}
            </div> */}
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item sm={12} xs={12}>
              {/* <div className={classes.flex}> */}
              <TextValidator
                fullWidth
                label="Products"
                disabled={isReadOnly || !isRangeItemEditAccess}
                //onChange={onProductsChange}
                //className="w-4/5"
                multiline
                //rows={3}
                name="products"
                value={"Products"}
                validators={["validProducts", "duplicateProducts"]}
                errorMessages={[
                  errorMessage.getErrorMessage(
                    "createRangeReset",
                    "invalidProducts"
                  ),
                  errorMessage.getErrorMessage(
                    "createRangeReset",
                    "duplicateProducts"
                  ),
                ]}
                inputProps={{ "data-cy": "products-input" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title={helperTexts.getHelperText(
                          "createRangeReset",
                          "productsAdd"
                        )}
                      >
                        <InfoOutlined
                          fontSize="small"
                          color="disabled"
                        ></InfoOutlined>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <div className="flex items-end pb-4 pl-2"> */}
              <Button
                variant="contained"
                color="primary"
                disabled={isReadOnly || !isRangeItemEditAccess}
                //className="ml-4 mt-4"
                data-cy="add-products-btn"
                className={classes.button}
                //onClick={handleProductsAdd}
              >
                Add
              </Button>
              {/* </div> */}
              {/* </div> */}
            </Grid>
            {/* <div className="w-1/2 pr-12 flex flex-wrap"> */}
            <Grid item sm={12} xs={12}>
              {/* <div className="w-full flex items-end mt-4"> */}
              {/* <div className={classes.flex1}> */}
              <input
                accept=".csv,.xls,.xlsx"
                id="uploadProduct"
                multiple
                className={classes.hidden}
                type="file"
                //onChange={handleFileSelection}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <label htmlFor="uploadProduct">
                <Button
                  variant="contained"
                  component="span"
                  color="default"
                  disabled={isReadOnly}
                  startIcon={<CloudUploadIcon />}
                  className={classes.button}
                >
                  Choose File
                </Button>
              </label>
              {/* <div className="flex items-end pl-4"> */}
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "3px" }}
                //className="ml-4 mt-4"
                //disabled={isReadOnly || !uploadedFileName || props.itemUploaded}
                disabled={isReadOnly}
                //onClick={handleProductsUpload}
                data-cy="file-upload"
                className={classes.button}
              >
                Upload
              </Button>
              {/* </div> */}
              {/* <div className="pb-1 pl-2"> */}
              <Tooltip
                title={helperTexts.getHelperText(
                  "createRangeReset",
                  "productsUpload"
                )}
              >
                <InfoOutlined fontSize="small" color="disabled"></InfoOutlined>
              </Tooltip>
              {/* </div> */}
              {/* <div className="pl-2" data-cy="file-name">
                {uploadedFileName}
              </div> */}
              {/* </div> */}
              {/* <div className={`w-full text-xs mt-2 ${classes.errorMsg}`}>
              {uploadedFileError}
            </div> */}
            </Grid>
          </Grid>
        )
      ) : undefined;
  
    const newProductsSection =
      productType === "newProducts" ? (
        <Grid container>
          <Grid item lg={10} xl={10} sm={10} md={10} xs={10}>
            <TextValidator
              fullWidth
              label="New Products"
              disabled={isReadOnly || !isRangeItemEditAccess}
              //onChange={onNewProductsChange}
              //className="w-4/5"
              multiline
              //rows="3"
              name="products"
              value={"New Products"}
              validators={["validProducts", "duplicateProducts"]}
              errorMessages={[
                errorMessage.getErrorMessage(
                  "createRangeReset",
                  "invalidProducts"
                ),
                errorMessage.getErrorMessage(
                  "createRangeReset",
                  "duplicateProducts"
                ),
              ]}
              inputProps={{ "data-cy": "products-input" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={helperTexts.getHelperText(
                        "createRangeReset",
                        "productsAdd"
                      )}
                    >
                      <InfoOutlined
                        fontSize="small"
                        color="disabled"
                      ></InfoOutlined>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={2} xl={2} sm={2} md={2} xs={2}>
            {/* <div className="flex items-end pb-4 pl-2"> */}
            <Button
              variant="contained"
              color="primary"
              disabled={isReadOnly || !isRangeItemEditAccess}
              //className="ml-4 mt-4"
              data-cy="add-new-products-btn"
              className={classes.button}
              //onClick={handleNewProductsAdd}
            >
              Add
            </Button>
          </Grid>
          {/* </div> */}
        </Grid>
      ) : undefined;
  
    const newSetupPendingProductsSection =
      productType === "newSetupPendingProducts" ? (
        // <div className="w-1/2 pr-12 mb-4 flex addProduct">
        <Grid container>
          <Grid item lg={10} xl={10} sm={10} md={10} xs={10}>
            <TextValidator
              id="newSetupProducts"
              name="product"
              label="How many new lines do you wish to enter?"
              fullWidth
              //className="w-1/2"
              disabled={isReadOnly}
              value={"0"}
              //onChange={handleNewSetupProductsCountChange}
              validators={["newSetupProducts"]}
              errorMessages={[
                errorMessage.getErrorMessage(
                  "createRangeReset",
                  "invalidProductCount"
                ),
              ]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={helperTexts.getHelperText(
                        "createRangeReset",
                        "newSetupPending"
                      )}
                    >
                      <InfoOutlined
                        fontSize="small"
                        color="disabled"
                      ></InfoOutlined>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={2} xl={2} sm={2} md={2} xs={2}>
            {/* <div className="items-end pt-3 pl-2"> */}
            <Button
              variant="contained"
              color="primary"
              disabled={isReadOnly || !isRangeItemEditAccess}
              className={classes.button}
              data-cy="add-new-products-btn"
              //onClick={handleAddNewSetupProductsCount}
            >
              Add
            </Button>
          </Grid>
          {/* </div> */}
        </Grid>
      ) : undefined;
  
    return (
      <>
        <Typography variant="body1" color="primary" className={classes.tabHead}>
          Tasklists {">"} Range Amendment
        </Typography>
        <Prompt when={isPageModified} message={labels.promptMessage} />
        <Grid container className={classes.margin}>
          <Grid item lg={10} md={10} sm={8} xs={8}>
            <Typography
              variant="body1"
              color="primary"
              className={classes.tabHead}
            >
              Create Range Reset
            </Typography>
          </Grid>
          <Grid item lg={2} md={2} sm={4} xs={4}>
            <Button
              variant="contained"
              onClick={handleClick}
              color="primary"
              className={`${classes.back} ${classes.button}`}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.margin} direction="column">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <div className="w-full p-6 pl-0 prodInput" data-cy="prod-input"> */}
            <ValidatorForm
              ref={formRef}
              onSubmit={handleSubmit}
              onError={(errors) => console.log(errors)}
              className={classes.color90}
            >
              {/* <div className="w-1/2 pr-12 mb-4"> */}
              <Grid item>
                <TextValidator
                  label="Name"
                  //disabled={true}
                  disabled={false}
                  onChange={onNameChange}
                  fullWidth
                  name="name"
                  value={name}
                  placeholder="Trad Grp_Target Date"
                  InputProps={{
                    classes: { input: classes.text },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={helperTexts.getHelperText(
                            "createRangeReset",
                            "name"
                          )}
                        >
                          <InfoOutlined
                            fontSize="small"
                            color="disabled"
                          ></InfoOutlined>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                    classes: { input: classes.text },
                  }}
                  helperText={helperTexts.getHelperText(
                    "createRangeReset",
                    "nameAutoPopulate"
                  )}
                />
              </Grid>
              {/* </div> */}
              {/* <div className="w-1/2 pr-12 mb-4"> */}
              <Grid item>
                <TextValidator
                  label="Buyer *"
                  //disabled={isReadOnly}
                  disabled={false}
                  onChange={onBuyerNameChange}
                  fullWidth
                  name="buyer"
                  value={buyer}
                  validators={["required"]}
                  errorMessages={[
                    errorMessage.getErrorMessage("createRangeReset", "buyerName"),
                  ]}
                  InputProps={{
                    classes: { input: classes.text },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={helperTexts.getHelperText(
                            "createRangeReset",
                            "buyer"
                          )}
                        >
                          <InfoOutlined
                            fontSize="small"
                            color="disabled"
                          ></InfoOutlined>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* </div> */}
              {/* <div className="w-1/2 pr-12 mb-4"> */}
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item lg={11} md={11} sm={10} xs={9}>
                    <FormControl required fullWidth>
                      <SelectValidator
                        name="department"
                        fullWidth
                        label="Department *"
                        //disabled={isReadOnly}
                        disabled={false}
                        validators={["required"]}
                        errorMessages={[
                          errorMessage.getErrorMessage(
                            "createRangeReset",
                            "department"
                          ),
                        ]}
                        value={department.departmentId}
                        onChange={onDepartmentChange}
                        InputProps={{
                          classes: { input: classes.text },
                          // endAdornment: (
                          //   <InputAdornment position="end"></InputAdornment>
                          // ),
                        }}
                      >
                        <MenuItem value="" className={classes.color90}>
                          <em>None</em>
                        </MenuItem>
                        {departmentList}
                      </SelectValidator>
                    </FormControl>
                  </Grid>
                  <Grid item lg={1} md={1} sm={2} xs={3}>
                    <div className={classes.pt6}>
                      <Tooltip
                        title={helperTexts.getHelperText(
                          "createRangeReset",
                          "department"
                        )}
                      >
                        <InfoOutlined
                          fontSize="small"
                          color="disabled"
                        ></InfoOutlined>
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {/* </div> */}
              {/* <div className="w-1/2 pr-12 mb-4"> */}
              <Grid item>
                <TextField
                  id="buyerAssistant"
                  label="Buyers Assistant"
                  //disabled={isReadOnly}
                  disabled={false}
                  fullWidth
                  value={buyerAssistant}
                  onChange={onBuyerAssistantChange}
                  InputProps={{
                    classes: { input: classes.text },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={helperTexts.getHelperText(
                            "createRangeReset",
                            "buyerAssistant"
                          )}
                        >
                          <InfoOutlined
                            fontSize="small"
                            color="disabled"
                          ></InfoOutlined>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* </div> */}
              {/* <div className="w-1/2 pr-12 mb-4"> */}
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item lg={11} md={11} sm={10} xs={9}>
                    <FormControl required fullWidth>
                      <SelectValidator
                        fullWidth
                        name="category"
                        label="Category *"
                        //disabled={isReadOnly}
                        disabled={false}
                        validators={["required"]}
                        errorMessages={[
                          errorMessage.getErrorMessage(
                            "createRangeReset",
                            "category"
                          ),
                        ]}
                        value={category.categoryId}
                        onChange={onCategoryChange}
                        InputProps={{
                          classes: { input: classes.text },
                          // endAdornment: (
                          //   <InputAdornment position="end" component="span">
                          //   </InputAdornment>
                          // ),
                        }}
                      >
                        <MenuItem value="" className={classes.color90}>
                          <em>None</em>
                        </MenuItem>
                        {categoryList}
                      </SelectValidator>
                    </FormControl>
                  </Grid>
                  <Grid item lg={1} md={1} sm={2} xs={3}>
                    <div className={classes.pt6}>
                      <Tooltip
                        title={helperTexts.getHelperText(
                          "createRangeReset",
                          "category"
                        )}
                      >
                        <InfoOutlined
                          fontSize="small"
                          color="disabled"
                        ></InfoOutlined>
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {/* </div> */}
              {/* <div className="w-1/2 pr-12 mb-4"> */}
              <Grid item>
                <TextValidator
                  id="supplyChainSpecialist"
                  name=""
                  label="Supply chain specialist *"
                  //disabled={isReadOnly}
                  disabled={false}
                  validators={["required"]}
                  errorMessages={[
                    errorMessage.getErrorMessage(
                      "createRangeReset",
                      "supplyChainSpName"
                    ),
                  ]}
                  value={supplyChainSpecialist}
                  onChange={onSupplyChainSpecialistChange}
                  fullWidth
                  InputProps={{
                    classes: { input: classes.text },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title={helperTexts.getHelperText(
                            "createRangeReset",
                            "supplyChainSpecialist"
                          )}
                        >
                          <InfoOutlined
                            fontSize="small"
                            color="disabled"
                          ></InfoOutlined>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {/* </div> */}
              {/* <div className="w-1/2 pr-12 mb-4 target-date-field"> */}
              {/* <div className="flex"> */}
              <Grid item>
                <div className={classes.flex}>
                  <ValidatedDatePicker
                    name=""
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    autoOk
                    margin="none"
                    validators={["required", "validDate"]}
                    //disabled={isReadOnly}
                    disabled={false}
                    errorMessages={[
                      errorMessage.getErrorMessage(
                        "createRangeReset",
                        "targetLaunchDate"
                      ),
                      errorMessage.getErrorMessage(
                        "createRangeReset",
                        "inValidDate"
                      ),
                    ]}
                    id="date-picker-inline"
                    label="Target Launch Date *"
                    value={targetLaunchDate}
                    onChange={onTargetLaunchDateChange}
                    placeholder="dd/mm/yyyy"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                      "data-cy": "target-date",
                    }}
                  />
  
                  {/* <div className="flex pt-6"> */}
  
                  <div className={classes.pt6}>
                    <Tooltip
                      title={helperTexts.getHelperText(
                        "createRangeReset",
                        "targetLaunchDate"
                      )}
                    >
                      <InfoOutlined
                        fontSize="small"
                        color="disabled"
                      ></InfoOutlined>
                    </Tooltip>
                  </div>
                </div>
              </Grid>
              {/* </div> */}
              {/* </div> */}
              {targetDateWarningSection}
              {/* </div> */}
              <Grid item>
                <div className={classes.button1}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick={() => setProductType(productOptions[0].value)}
                    className={
                      productType === "existingProducts"
                        ? `${classes.activeTab} ${classes.space} ${classes.button}`
                        : `${classes.default} ${classes.space} ${classes.button}`
                    }
                  >
                    {productOptions[0].label}
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick={() => setProductType(productOptions[1].value)}
                    className={
                      productType === "newProducts"
                        ? `${classes.activeTab} ${classes.space} ${classes.button}`
                        : `${classes.default} ${classes.space} ${classes.button}`
                    }
                  >
                    {productOptions[1].label}
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick={() => setProductType(productOptions[2].value)}
                    className={
                      productType === "newSetupPendingProducts"
                        ? `${classes.activeTab} ${classes.space} ${classes.button}`
                        : `${classes.default} ${classes.space} ${classes.button}`
                    }
                  >
                    {productOptions[2].label}
                  </Button>
                  {/* <SelectButton
                  value={productType}
                  options={productOptions}
                  onChange={(e) => setProductType(e.value)}
                  className={classes.btnproducttype}
                /> */}
                </div>
                {existingProductsSection}
                {newProductsSection}
                {newSetupPendingProductsSection}
              </Grid>
            </ValidatorForm>
            {/* </div> */}
          </MuiPickersUtilsProvider>
        </Grid>
      </>
    );
  }
  
  export default Dashboard;
  