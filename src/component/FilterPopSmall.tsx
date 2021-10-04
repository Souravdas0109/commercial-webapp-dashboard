import {
  makeStyles,
  Button,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  useTheme,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
    //marginLeft: theme.spacing(5),
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  activeTab: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  default: {
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    borderColor: theme.palette.primary.main,
    minWidth: 180,
  },
  font: {
    color: theme.palette.primary.main,
    fontSize: "1rem",
  },
  selectRoot: {
    backgroundColor: "white",
  },
  space: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "0.7em",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "0.6em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em",
    },
  },
  table: {
    width: "100%",
    color: theme.palette.primary.main,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  tab: {
    color: theme.palette.primary.main,
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "0.7em",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "0.6em",
    },
  },
}));
interface FilterPopProps {
  toggleModal: () => void;
}

const FilterPopSmall = React.forwardRef((props: FilterPopProps, ref) => {
  const classes = useStyles();
  const theme = useTheme();
  const active = useMediaQuery(theme.breakpoints.down(500));
  // const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
  //   setOption(newValue);
  // };

  // const [state, setState] = useState<{
  //   age: string | number;
  //   name: string;
  // }>({
  //   age: "",
  //   name: "hai",
  // });

  // const handleChange1 = (
  //   event: React.ChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const name = event.target.name as keyof typeof state;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };
  return (
    <div className={classes.paper}>
      <IconButton onClick={props.toggleModal} edge="end">
        <CloseIcon />
      </IconButton>
      <Grid container>
        {!active ? (
          <Grid item sm={12} xs={12}>
            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              color="primary"
              className={classes.space}
              size="small"
            >
              Saved Searches
            </Button>

            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              color="primary"
              className={classes.space}
              size="small"
            >
              Saved Search
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              color="primary"
              className={classes.space}
              size="small"
            >
              Apply Search
            </Button>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Button
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                color="primary"
                className={classes.space}
                size="small"
              >
                Saved Searches
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                color="primary"
                className={classes.space}
                size="small"
              >
                Saved Search
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                color="primary"
                className={classes.space}
                size="small"
              >
                Apply Search
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <br />
      {!active ? (
        <Grid container>
          <Grid item xs={12} md={12}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tab}>
                    ID or Description
                  </TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="Description"
                      label=""
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="inherit">
                      <SearchIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>Sub Process</TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="Process"
                      label="Any"
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="inherit">
                      <ArrowDropDownCircleIcon style={{ color: green[900] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>Requested By</TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="Requested"
                      label="Any"
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="inherit">
                      <ArrowDropDownCircleIcon style={{ color: green[900] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>Assigned to</TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="Assigned"
                      label="Use Name"
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="inherit">
                      <ArrowDropDownCircleIcon style={{ color: green[900] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>
                    Last Actioned By
                  </TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="Actioned"
                      label="Any"
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="inherit">
                      <ArrowDropDownCircleIcon style={{ color: green[900] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>Workflow Status</TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="Workflow"
                      label="In Progress"
                      variant="outlined"
                      size="small"
                    />
                    <IconButton color="inherit">
                      <ArrowDropDownCircleIcon style={{ color: green[900] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>Created Between</TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="datetime-Created"
                      label="Created Between"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tab}>
                    Last Actioned Between
                  </TableCell>
                  <TableCell className={classes.tab}>
                    <TextField
                      id="datetime-Actioned"
                      label="Last Actioned Date"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography className={classes.tab}>ID or Description</Typography>
            <TextField
              id="Description"
              label=""
              variant="outlined"
              size="small"
            />
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>Sub Process</Typography>

            <TextField
              id="Process"
              label="Any"
              variant="outlined"
              size="small"
            />
            <IconButton color="inherit">
              <ArrowDropDownCircleIcon style={{ color: green[900] }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>Requested By</Typography>

            <TextField
              id="Requested"
              label="Any"
              variant="outlined"
              size="small"
            />
            <IconButton color="inherit">
              <ArrowDropDownCircleIcon style={{ color: green[900] }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>Assigned to</Typography>

            <TextField
              id="Assigned"
              label="Use Name"
              variant="outlined"
              size="small"
            />
            <IconButton color="inherit">
              <ArrowDropDownCircleIcon style={{ color: green[900] }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>Last Actioned By</Typography>

            <TextField
              id="Actioned"
              label="Any"
              variant="outlined"
              size="small"
            />
            <IconButton color="inherit">
              <ArrowDropDownCircleIcon style={{ color: green[900] }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>Workflow Status</Typography>

            <TextField
              id="Workflow"
              label="In Progress"
              variant="outlined"
              size="small"
            />
            <IconButton color="inherit">
              <ArrowDropDownCircleIcon style={{ color: green[900] }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>Created Between</Typography>

            <TextField
              id="datetime-Created"
              label="Created Between"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Typography className={classes.tab}>
              Last Actioned Between
            </Typography>

            <TextField
              id="datetime-Actioned"
              label="Last Actioned Date"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      )}

      {/* <Grid container component={Paper}>
        <Grid item lg={6}>
          <Typography display="inline">ID or Description</Typography>

          <TextField
            id="Description"
            label=""
            variant="outlined"
            size="small"
          />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </Grid>

        <Grid item lg={6}>
          <Typography display="inline">Sub Process</Typography>

          <TextField id="Process" label="Any" variant="outlined" size="small" />
          <IconButton color="inherit">
            <ArrowDropDownCircleIcon style={{ color: green[900] }} />
          </IconButton>
        </Grid>

        <Grid item lg={6}>
          <Typography display="inline">Requested By</Typography>

          <TextField
            id="Requested"
            label="Any"
            variant="outlined"
            size="small"
          />
          <IconButton color="inherit">
            <ArrowDropDownCircleIcon style={{ color: green[900] }} />
          </IconButton>
        </Grid>
        <Grid item lg={6}>
          <Typography display="inline">Assigned to</Typography>

          <TextField
            id="Assigned"
            label="Use Name"
            variant="outlined"
            size="small"
          />
          <IconButton color="inherit">
            <ArrowDropDownCircleIcon style={{ color: green[900] }} />
          </IconButton>
        </Grid>

        <Grid item lg={6}>
          <Typography display="inline">Last Actioned By</Typography>

          <TextField
            id="Actioned"
            label="Any"
            variant="outlined"
            size="small"
          />
          <IconButton color="inherit">
            <ArrowDropDownCircleIcon style={{ color: green[900] }} />
          </IconButton>
        </Grid>
        <Grid item lg={6}>
          <Typography display="inline">Workflow Status</Typography>

          <TextField
            id="Workflow"
            label="In Progress"
            variant="outlined"
            size="small"
          />
          <IconButton color="inherit">
            <ArrowDropDownCircleIcon style={{ color: green[900] }} />
          </IconButton>
        </Grid>
        <Grid item lg={6}>
          <Typography display="inline">Created Between</Typography>

          <TextField
            id="datetime-Created"
            label="Created Between"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item lg={6}>
          <Typography display="inline">Last Actioned Between</Typography>

          <TextField
            id="datetime-Actioned"
            label="Last Actioned Date"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid> */}
    </div>
  );
});

export default FilterPopSmall;
