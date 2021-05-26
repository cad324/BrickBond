export const styles = (theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        '& label': {
            display: 'flex',
            marginBottom: theme.spacing(1.5),
            '& p': {
                width: theme.spacing(16)
            },
            '& > div': {
                flexGrow: 1
            }
        }
    },
    heading: {
        marginBottom: theme.spacing(3)
    },
    nameFields: {
        display: 'flex'
    },
    primaryBtn: {
        backgroundColor: '#2F4858',
        marginTop: theme.spacing(1.5),
        fontSize: theme.spacing(1.5),
        color: '#fff',
        '&:hover': {
          backgroundColor: '#3c5783'
        },
        '&:disabled': {
            backgroundColor: 'lightgrey'
        }
      },
})