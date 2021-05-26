export const styles = (theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  cardEmpty: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: 'slategrey'
  },
  brickItem: {
    display: 'flex',
    '& p': {
      flexGrow: 1
    },
    '& a': {
      fontSize: theme.spacing(1.5),
      color: '#1b6a9d'
    }
  },
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
  brickList: {
    overflowY: 'scroll',
    maxHeight: 150,
    paddingRight: theme.spacing(2)
  }
})
