import { makeStyles } from '@material-ui/core'

export const fieldWidth = window.innerWidth - 80
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  container: {
    height: '100%',
    // padding:"16px"
  },
  manageUser: {
    flex: '1',
    color: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // .p-datatable-scrollable-body {
    //   overflow-y: hidden !important;
    // }
  },
  manageRequest: {
    backgroundColor: '#F0F0F0',
  },
  colorSecondary: {
    padding: '16px 16px 0px 16px',
  },
  buttonCreateGroup: {
    backgroundColor: '#E0E1E2',
    padding: '6px 15px 10px 10px',
    color: '#1b6420',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
    // 0px 2px 2px 0px rgb(0 0 0 / 14%),
    //  0px 1px 5px 0px rgb(0 0 0 / 12%);
  },
  displayTable: {
    display: ' table',
    width: '100%',
  },
  gridSearch: {
    flexDirection: 'column',
    width: '70%',
    float: 'left',
  },
  createGroup: {
    flexDirection: 'column',
    width: '28%',
    marginTop: '7px',
    float: 'left',
    marginTop: '30px',
  },
  exploreButton: {
    color: 'blue',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily,
  },
  fontbutton: {
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily,
  },
  value: {
    flex: 1,
  },
  links: {
    color: 'blue',
    cursor: 'pointer',
  },
  viewlogTable: {
    [theme.breakpoints.up('sm')]: {
      width: fieldWidth - 350,
    },
    [theme.breakpoints.down('sm')]: {
      width: fieldWidth - 20,
    },
  },
  closeViewLog: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    fontSize: '18px',
    '&:hover': {
      color: theme.palette.secondary.main,
      backgroundColor: 'green',
      cursor: 'pointer',
    },
  },
  viewLogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    alignItems: 'baseline',
  },
  backButton: {
    border: 0,
    color: 'blue',
    // backgroundColor: "white",
    cursor: 'pointer',
    fontSize: '15px',
  },
  text: {
    color: theme.palette.primary.main,
  },
  paper: { minWidth: '500px' },
}))
