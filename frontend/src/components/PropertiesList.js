import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
}));

const PropertiesList = (props) => {

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
          MY PROPERTIES
        </Typography>
        <div className={classes.propertiesList}>
          {props.properties ? props.properties.map(property =>
                <p className={classes.propertyItem} key={`p-${property}`}>
                  <span>{
                    props.propertyDetails[property] ?
                      `${props.propertyDetails[property]["street"]},
                      ${props.propertyDetails[property]["city"]},
                       ${props.propertyDetails[property]["province"]}
                      ${props.propertyDetails[property]["zip_code"]}`
                      : `Property # ${property}`
                  }</span>
                  <Link to={`/property/${property}`}>Manage Property</Link>
                </p>) : <div>Nothing</div>
            }
          </div>
        </CardContent>
    </Card>
  );

}

export default PropertiesList;
