import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    marginBottom: theme.spacing(1.5)
  },
  card: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const BrowseProperties = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Toolbar/>
      <Typography className={classes.title} variant="h5">
        Browse Properties
      </Typography>
      {
        props.allProperties.map((property) =>
          <Card
          key={`${property.street}-${property.city}`} 
          className={classes.card}>
            <CardContent>
              {`${property.street}, ${property.city},
               ${property.province} ${property.zip_code}`}
            </CardContent>
          </Card>
      )
      }
    </div>
  )
}

export default BrowseProperties;
