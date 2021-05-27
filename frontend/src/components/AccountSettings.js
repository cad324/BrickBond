import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,
    Toolbar,
    Typography,
    Switch,
    Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Helmet} from "react-helmet";
import {styles} from './AccountSettings.Style';
import { accountDetailsSetter } from '../features/account/accountDetailsSlice';
import { setPage } from '../features/page/currentPageSlice';
import { useSelector, useDispatch } from 'react-redux';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles(styles);

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const AccountSettings = ({address}) => {

    const dispatch = useDispatch();
    const details = useSelector((state) => state.accountDetailsSetter.details );

    const [userData, setUserData] = useState(details);
    const [checked, setChecked] = useState(false);
    const [changed, setChanged] = useState(false);
    const [putChanges, setPutChanges] = useState([false, ""]);

    const classes = useStyles();

    const { first_name, last_name, city, zip, 
        dob, issuer, province, address_1, address_2 } = userData;

    const putBody = { 
        id: address,
        first_name: first_name, 
        last_name: last_name, 
        city: city,
        zip: zip, 
        dob: dob, 
        issuer: issuer, 
        province: province, 
        address_1: address_1, 
        address_2: address_2 
    };

    const toggleSwitch = () => {
        setChecked(!checked);
        setChanged(true);
        let tempUserData = Object.assign({}, userData);
        tempUserData["issuer"] = !checked;
        setUserData(tempUserData);
    }

    const showSnackbar = (msg) => {
        setPutChanges([true, msg]);
        setTimeout(() => {
            setPutChanges([false, ""]);
        }, 5000);
    } 

    useEffect(() => {
        if (isEmpty(userData)) {
            getUserData();
        } else {
            console.log('[USER DATA]', userData);
        }
        dispatch(setPage('/settings'));
    }, []);

    const putUserData = () => {
        fetch(ENDPOINT, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(putBody)
        })
        .then(response => response.json(), (err) => {
            console.log('[PUT ERROR]', err);
            showSnackbar("error");
        })
        .then(data => {
            console.log(data);
            setChanged(false);
            showSnackbar("success");
        }, (err) => {
            console.log('[PutUserData]', err);
            showSnackbar("error");
        })
    }

    const getUserData = () => {
        fetch(ENDPOINT.concat(address))
            .then(response => response.json(), (err) => {
                console.log('[API ERROR]', err);
            })
            .then(data => {
                console.log('[API GATEWAY RES]', data);
                setUserData(data);
                dispatch(accountDetailsSetter(data));
            }, (err) => {
                console.log('[API GATEWAY ERR]', err);
            });
    }

    const handleChange = (val, item) => {
        setChanged(true);
        let tempUserData = Object.assign({}, userData);
        tempUserData[item] = val;
        setUserData(tempUserData);
    }

    const isEmpty = (obj) => {
        return JSON.stringify(obj) === '{}';
    }

    return (
        <div className={classes.content}>
            <Helmet>
                <title>BrickBonds | Account Settings</title>
            </Helmet>
            <Toolbar/>
            <Typography className={classes.heading} variant="h5">Account Settings</Typography>
            <div>
                <div className={classes.nameFields}>
                    <label>
                        <Typography>First Name: </Typography> 
                        <TextField 
                            value={first_name || ""} 
                            id="fName" 
                            onChange={(e) => handleChange(e.target.value, "first_name")}
                            type="text" />
                    </label>
                    <label>
                        <Typography>Last Name: </Typography> 
                        <TextField 
                            value={last_name || ""} 
                            id="lName" 
                            onChange={(e) => handleChange(e.target.value, "last_name")}
                            type="text" />
                    </label>
                </div>
                <label>
                    <Typography>Date of Birth: </Typography> 
                    <TextField 
                        value={dob || ""} 
                        onChange={(e) => handleChange(e.target.value, "dob")}
                        id="time" 
                        type="date" />
                </label>
                <label>
                    <Typography>Token Issuer: </Typography> 
                    <Switch 
                        checked={issuer || false} 
                        name={`issuer`}
                        color={`primary`}
                        onChange={(e) => toggleSwitch()} />
                </label>
                <label>
                    <Typography>Address Line 1: </Typography> 
                    <TextField 
                        value={address_1 || ""} 
                        onChange={(e) => handleChange(e.target.value, "address_1")}
                        id="address1" 
                        type="text" />
                </label>
                <label>
                    <Typography>Address Line 2: </Typography> 
                    <TextField 
                        value={address_2 || ""}
                        onChange={(e) => handleChange(e.target.value, "address_2")}
                        id="address2" 
                        type="text" />
                </label>
                <label>
                    <Typography>City: </Typography> 
                    <TextField 
                        value={city || ""}
                        onChange={(e) => handleChange(e.target.value, "city")}
                        id="city" 
                        type="text" />
                </label>
                <label>
                    <Typography>Province: </Typography> 
                    <TextField 
                        value={province || ""} 
                        onChange={(e) => handleChange(e.target.value, "province")}
                        id="province" 
                        type="text" />
                </label>
                <label>
                    <Typography>Zip Code: </Typography> 
                    <TextField 
                        value={zip || ""}
                        onChange={(e) => handleChange(e.target.value, "zip")} 
                        id="zip" 
                        type="text" />
                </label>
            </div>
            <Button 
                disabled={!changed}
                onClick={putUserData}
                className={classes.primaryBtn}>Apply changes</Button>
            <Snackbar open={putChanges[0]} autoHideDuration={5000}>
            {putChanges[1] === "success" ?
                <Alert severity="success">
                    Updated account!
                </Alert> : putChanges[1] === "error" ? 
                <Alert severity="error">
                    Could not update account. Please try again later.
                </Alert> : null
            }
            </Snackbar>
        </div>
    );
}

export default AccountSettings;