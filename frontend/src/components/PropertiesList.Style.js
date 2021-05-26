export const styles = (theme) => ({
    propertiesList: {
      overflowY: 'scroll',
      maxHeight: 150,
      paddingRight: theme.spacing(2)
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
    propertyItem: {
      marginTop: 0,
      display: 'flex',
      '& span': {
        flexGrow: 1
      },
      '& a': {
        fontSize: theme.spacing(1.5),
        color: '#1b6a9d',
        textDecoration: 'none'
      },
      '& a:hover': {
        textDecoration: 'underline'
      }
    }
  })