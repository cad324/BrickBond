export const styles = (theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    title: {
      marginBottom: theme.spacing(1.5),
      fontWeight: '600'
    },
    card: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    cardTitle: {
      fontSize: theme.spacing(1.75),
      fontWeight: '600'
    },
    cardContent: {
      paddingBottom: 0
    },
    cardSkeleton: {
      marginBottom: theme.spacing(1.5),
      borderRadius: theme.spacing(0.25)
    },
    brickCount: {
      padding: `${theme.spacing(1)}px 0`
    },
    cardActions: {
      '& a': {
        textDecoration: 'none',
        fontSize: theme.spacing(1.5),
        color: '#2F4858'
      }
    },
    subtitle: {
      color: '#444444',
      fontSize: theme.spacing(1.75)
    }
  })