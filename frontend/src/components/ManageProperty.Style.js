export const styles = (theme) => ({
    root: {
      display: 'flex',
      fontFamily: 'Poppins'
    },
    primaryBtn: {
      backgroundColor: '#2F4858',
      marginTop: theme.spacing(1.5),
      fontSize: theme.spacing(1.5),
      color: '#fff',
      '&:hover': {
        backgroundColor: '#3c5783'
      }
    },
    buyBtn: {
      backgroundColor: '#005500',
      color: '#fff',
      width: theme.spacing(13.25),
      padding: `0 ${theme.spacing(1)}px`,
      fontSize: theme.spacing(1.5),
      '&:hover': {
        backgroundColor: '#418800'
      }
    },
    approveBtn: {
      backgroundColor: '#2F4858',
      padding: `0 ${theme.spacing(1)}px`,
      color: '#fff',
      fontSize: theme.spacing(1.5),
      '&:hover': {
        backgroundColor: '#3c5783'
      }
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
    progressWide: {
      width: `${theme.spacing(3)}px !important`,
      height: `${theme.spacing(3)}px !important`,
      color: '#3c5783',
      marginLeft: theme.spacing(2.75),
      '& svg': {
        width: theme.spacing(3),
        height: theme.spacing(3)
      }
    },
    chip: {
      margin: 'auto',
      marginLeft: theme.spacing(1)
    },
    secondaryBtn: {
      backgroundColor: 'rgba(149, 0, 4, 0.5)',
      borderRadius: theme.spacing(2),
      marginTop: theme.spacing(1.5),
      padding: `${theme.spacing(0.5)}px ${theme.spacing(0.5)}px`,
      color: '#fff',
      '& span': {
        fontSize: theme.spacing(1.25),
        fontWeight: '600'
      },
      '&:hover': {
        backgroundColor: 'rgba(149, 0, 4, 0.75)'
      }
    },
    brickItem: {
      display: 'flex',
      marginBottom: theme.spacing(1),
      '& p': {
        flexGrow: 1,
        fontWeight: '700',
        lineHeight: `${theme.spacing(4)}px`,
        margin: 0
      },
      '& h6': {
        fontSize: theme.spacing(1.75),
        fontWeight: '600',
        marginBottom: theme.spacing(0.5)
      },
      '& ol': {
        width: '-webkit-fill-available',
        margin: 0,
        '& li > span': {
          marginRight: theme.spacing(1)
        },
      },
      flexWrap: 'wrap'
    },
    backIcon: {
      fontSize: theme.spacing(1.25),
      fontWeight: '600'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
    card: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    cardTitle: {
      fontSize: 12,
      fontWeight: '600',
      paddingBottom: theme.spacing(1.5)
    },
    cardEmpty: {
      textAlign: 'center',
      margin: theme.spacing(3),
      color: 'slategrey'
    },
    ownerPanel: {
      display: 'flex',
      '& div': {
        flexGrow: 1
      }
    },
    title: {
      fontWeight: '600',
      fontSize: theme.spacing(2.5),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    approveList: {
      paddingLeft: theme.spacing(1),
      listStyle: 'none',
      '& li': {
        marginBottom: theme.spacing(0.75)
      }
    }
  })