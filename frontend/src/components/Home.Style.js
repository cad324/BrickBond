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
    primaryBtn: {
      backgroundColor: '#2F4858',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#3c5783'
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
    cardActions: {
      '& a': {
        textDecoration: 'none',
        fontSize: theme.spacing(1.5),
        color: '#2F4858'
      }
    },
    cardEmpty: {
      textAlign: 'center',
      marginTop: theme.spacing(3),
      color: 'slategrey'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    balance: {
      backgroundColor: 'rgba(0, 81, 133, 0.5)',
      padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,
      borderRadius: theme.spacing(1.25),
      color: 'white',
      fontSize: theme.spacing(1.5)
    }
});