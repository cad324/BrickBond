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
    }
});