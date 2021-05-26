import { fade } from '@material-ui/core/styles';

const drawerWidth = 240;

export const styles = (theme) => ({
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.3em',
        borderRadius: '0.4em'
      },
      '*::-webkit-scrollbar-track': {
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.4)',
        outline: 'none'
      }
    },
    root: {
      display: 'flex',
      fontFamily: 'Poppins'
    },
    welcome: {
      marginBottom: theme.spacing(2),
      color: '#535353'
    },
    appBar: {
        backgroundColor: '#950004',
        zIndex: theme.zIndex.drawer + 1,
        '& div, h6': {
          flexGrow: 1
        }
    },
    primaryBtn: {
      backgroundColor: '#2F4858',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#3c5783'
      }
    },
    bottomItem: {
      position: "fixed",
      bottom: 0,
      paddingBottom: 10,
      width: drawerWidth
    },
    nested: {
      paddingLeft: theme.spacing(10),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      '& span': {
        fontSize: theme.spacing(1.75)
      }
    },
    propertiesList: {
      overflowY: 'scroll',
      maxHeight: 150,
      paddingRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    cardTitle: {
      fontSize: 12,
      fontWeight: '600'
    },
    card: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    cursor: {
      curson: 'pointer'
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      display: 'block'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    navigation: {
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      zIndex: 0
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#2F4858',
      color: '#fff'
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    }
  })
