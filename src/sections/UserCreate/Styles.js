import { makeStyles } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'

export const fieldWidth = window.innerWidth - 80

export const useStyles = makeStyles((theme) => {
  return {
    eachRow: {
      display: 'flex',
      [theme.breakpoints.up(750)]: {
        flexDirection: 'row',
      },
      [theme.breakpoints.down(750)]: {
        flexDirection: 'column',
      },
      paddingTop: '20px',
      alignItems: 'baseline',
    },
    //
    createRequest: {
      backgroundColor: '#F0F0F0',
      padding: '20px !important',
      // @media (min-width: 320px) and (max-width: 768px) {
      //   padding: 20px !important;
      // }
    },
    createRequestContainer: {
      backgroundColor: 'white',
      padding: '25px',
      additionalData: {
        fontSize: '16px',
        color: 'green',
        display: 'block',
      },
    },
    //
    inputFields: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: 400,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(450)]: {
        width: 350,
      },
      [theme.breakpoints.down(400)]: {
        width: 250,
      },
      [theme.breakpoints.down(300)]: {
        width: 200,
      },
      height: 32,
    },
    selectField: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: '100%',
      height: 38,
      color: teal[900],
    },
    selectOptions: {
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    inputLabel: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 250,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: 250,
      [theme.breakpoints.down(750)]: {
        width: 250,
      },
      [theme.breakpoints.down(500)]: {
        width: 200,
      },
    },
    // inputFieldBox: {
    //   [theme.breakpoints.up("sm")]: {
    //     width: 392,
    //   },
    //   [theme.breakpoints.down("sm")]: {
    //     width: fieldWidth,
    //   },
    // },
    inputFieldBox: {
      width: 400,
      [theme.breakpoints.down(750)]: {
        width: 400,
      },
      [theme.breakpoints.down(450)]: {
        width: 350,
      },
      [theme.breakpoints.down(400)]: {
        width: 250,
      },
      [theme.breakpoints.down(300)]: {
        width: 200,
      },
    },
    filelist: {
      width: '100%',
    },
    textArea: {
      // [theme.breakpoints.up("sm")]: {
      //   width: 392,
      // },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      width: '100%',
      resize: 'none',
      border: '1px solid black',
    },
    designationField: {
      [theme.breakpoints.up(750)]: {
        width: 250,
      },
      [theme.breakpoints.down(750)]: {
        width: 200,
      },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth,
      // },
      height: '32px',
    },

    submitButton: {
      width: 'auto',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      //height: 40,
      display: 'inline',
      '&:hover': {
        // fontSize: 'large',
        color: theme.palette.secondary.main,
      },
      marginBottom: '10px',
      marginRight: '10px',
    },
    buttons: {
      width: 'auto',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      //height: 40,
      '&:hover': {
        // fontSize: 'large',
        color: theme.palette.secondary.main,
      },
      marginBottom: '10px',
      marginRight: '10px',
    },
    underlineRemove: {
      textDecoration: 'none',
      color: '#0000ff',
    },
    multiSelect: {
      '&:hover': {
        borderColor: 'green',
      },
    },

    uploadTextfield: {
      width: 'auto',
      [theme.breakpoints.up(400)]: {
        width: 200,
      },
      // [theme.breakpoints.down("sm")]: {
      //   width: fieldWidth - 80,
      // },
      height: '32px',
      cursor: 'pointer',
    },

    backButton: {
      // border: 0,
      // color: 'blue',
      // // backgroundColor: "white",
      // cursor: 'pointer',
      // fontSize: '18px',
      // '&:disabled': {
      //   color: 'grey',
      //   cursor: 'default',
      // },
      backgroundColor: '#E0E1E2',
      padding: '2px',
      cursor: 'pointer',
      fontSize: '16px !important',
      boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%)',
      // "0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      svg: {
        position: 'relative',
        top: '8px',
        fontSize: '1.2rem',
        right: '-5px',
      },
      ' &:hover': {
        fontSize: '16px !important',
      },
    },
    addUserGroup: {
      color: '#1b6420',
      fontSize: '16px',
      display: 'block',
    },
    browseArea: {
      button: {
        padding: '3px 8px 3px 8px',
        height: 'auto',
      },
      // button:hover: {
      //   font-size: 16px;
      // }
      // input: {
      //   height: auto;
      //   border: 1px solid $warm-grey-200;
      //   padding: 2px;
      // }
    },
    attachIcon: {
      border: 0,
      color: 'blue',
      // backgroundColor: "white",
      cursor: 'pointer',
      fontSize: '10px',
      textDecoration: 'underline',
    },
    viewLogTitle: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      alignItems: 'baseline',
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
    whiteButton: {
      borderColor: theme.palette.primary.main,
      border: '1px solid',
      backgroundColor: 'white',
      color: theme.palette.primary.main,
      '&:hover': {
        color: 'white',
        backgroundColor: teal[900],
      },
      marginBottom: '10px',
      marginRight: '10px',
    },
    uploadButton: {
      width: 'auto',
      height: '32px',
      cursor: 'pointer',
      backgroundColor: teal[900],
      color: 'white',
      padding: '2px',
    },
    root: {
      padding: theme.spacing(2),
      height: '100%',
    },
    text: {
      color: theme.palette.primary.main,
    },
    hideit: {
      display: 'none',
    },
    customMaxWidth: {
      maxWidth: '75%',
    },
  }
})
