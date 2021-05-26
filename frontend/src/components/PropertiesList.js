import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link
} from "react-router-dom";
import {styles} from './PropertiesList.Style';

const useStyles = makeStyles(styles);

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
