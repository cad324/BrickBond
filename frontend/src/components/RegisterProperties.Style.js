export const styles = (theme) => ({
    root: {
      display: 'flex',
      fontFamily: 'Poppins'
    },
    primaryBtn: {
      backgroundColor: '#2F4858',
      marginTop: theme.spacing(1.5),
      color: '#fff',
      '&:hover': {
        backgroundColor: '#3c5783'
      }
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    cardTitle: {
      fontSize: 12,
      fontWeight: '600',
      paddingBottom: theme.spacing(1.5)
    },
    card: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    progress: {
      width: `${theme.spacing(3)}px !important`,
      height: `${theme.spacing(3)}px !important`,
      marginTop: theme.spacing(1.5),
      color: '#3c5783',
      '& svg': {
        width: theme.spacing(3),
        height: theme.spacing(3)
      }
    },
    formCtr: {
      '& label': {
        display: 'block',
        marginBottom: theme.spacing(1)
      },
      '& label span': {
        width: theme.spacing(9),
        display: 'inline-block'
      }
    },
  
  })