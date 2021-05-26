export const styles = (theme) => ({
    img: {
        '& img': {
            width: theme.spacing(21),
            marginRight: theme.spacing(1),
            cursor: 'pointer'
        }
    },
    btnCtrl: {
        marginBottom: theme.spacing(2)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    lightbox: {
        '& img': {
            top: theme.spacing(16)
        }
    }
})
