import React, { useEffect } from 'react';
import {
    Typography,
    Card,
    CardContent,
    Toolbar,
    CardActions,
    Link,
    Button } from '@material-ui/core';
import {Helmet} from "react-helmet";
import {styles} from './Home.Style';
import BricksList from './BricksList';
import { makeStyles } from '@material-ui/core/styles';
import { setPage } from '../features/page/currentPageSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(styles);

const Home = ({address, balance, propertyDetails, properties, 
    propertyBricks, brickOwners, allBricks, getAllPropertyBricks}) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage("/"));
    });

    return (
        <main className={classes.content}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BrickBonds | Home</title>
            </Helmet>
            <Toolbar/>
            <Typography variant="body2" component="p" className={classes.welcome}>
            Here's what's happening with your account today.
            </Typography>
            <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                ACCOUNT INFO
                </Typography>
                <Typography variant="body2" component="p">
                My address: {address}
                </Typography>
                <Typography variant="body2" component="p">
                BRICK Balance: <span className={classes.balance}>{balance} BRICK</span>
                </Typography>
            </CardContent>
            </Card>
            <Card className={classes.card}>
            <CardContent>
            <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                MY PROPERTIES
            </Typography>
                <div className={classes.propertiesList}>
                {properties.map(property => {
                    return <p key={`p-${property}`}>{
                        propertyDetails[property] ?
                            `${propertyDetails[property]["street"]},
                            ${propertyDetails[property]["city"]},
                            ${propertyDetails[property]["province"]}
                            ${propertyDetails[property]["zip_code"]}`
                            : `Property # ${property}`
                        }</p>
                    }
                )}
                {!properties.length ?
                    <Typography className={classes.cardEmpty}>
                    You have not registered any properties.
                    </Typography>
                    : null
                }
                </div>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small"><Link to="/properties">See More</Link></Button>
            </CardActions>
            </Card>
            <BricksList
                address={address}
                brickOwners={brickOwners}
                getPropertyBricks={() => getAllPropertyBricks()}
                propertyBricks={propertyBricks}
                bricks={allBricks} />
            <br />
        </main>
    )
} 

export default Home;