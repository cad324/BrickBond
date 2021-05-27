import React, {useEffect, useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid } from '@material-ui/data-grid';
import {styles} from './Analytics.Style';
import {Helmet} from "react-helmet";
import { setPage } from '../features/page/currentPageSlice';
import { useDispatch } from 'react-redux';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar } from 'recharts';

const useStyles = makeStyles(styles);

const Analytics = () => {

    const dispatch = useDispatch();

    const [earningsTotal, setEarningsTotal] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        dispatch(setPage('/analytics'));
        tallyEarnings(DUMMY_DATA);
    }, []);

    const tallyEarnings = (data) => {
        let total = 0;
        data.map(item => {
            total += item["dividend"];
            setEarningsTotal(total);
        })
    }

    return (
        <div className={classes.content}>
            <Helmet>
                <title>BrickBonds | Analytics</title>
                <meta charSet="utf-8" />
            </Helmet>
            <Toolbar/>
            <Typography className={classes.title} variant="h5">
                Account History
            </Typography>
            <div className={classes.earningSection}>
                <Card>
                    <CardContent>
                        <Typography className={classes.cardTitle}>
                            Earned Dividends (YTD)
                        </Typography>
                        <BarChart className={classes.chart} width={450} height={250} data={DUMMY_DATA}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis label={{ value: 'CA$', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend wrapperStyle={{height: 0}} />
                            <Bar dataKey="dividend" fill="#1C6E7D" />
                        </BarChart>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography className={classes.cardTitle}>
                            Total Earnings (YTD)
                        </Typography>
                        <Typography className={classes.total}>
                            {`CA $${earningsTotal}`}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.cardTitle}>
                        Transaction History
                    </Typography>
                    <DataGrid 
                        pageSize={10} 
                        className={classes.dataGrid}
                        autoHeight
                        rowHeight={30} 
                        rows={rows} 
                        columns={columns} />
                </CardContent>
            </Card>
        </div>
    )
}

const DUMMY_DATA = [
    {
        "month": "January",
        "dividend": 41.50
    },
    {
        "month": "February",
        "dividend": 45.12
    },
    {
        "month": "March",
        "dividend": 60.25
    },
    {
        "month": "April",
        "dividend": 68.55
    },
    {
        "month": "May",
        "dividend": 58.50
    },
    {
        "month": "June",
        "dividend": 59.50
    }
];

const rows = [
    { id: 1, date: '2021-06-01', property: 21, from: 'Jeff Bezos', amount: 59.50 },
    { id: 2, date: '2021-05-01', property: 21, from: 'Jeff Bezos', amount: 58.50 },
    { id: 3, date: '2021-04-01', property: 21, from: 'Jeff Bezos', amount: 68.55 },
];
  
const columns = [
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'property', headerName: 'Property', width: 150 },
    { field: 'from', headerName: 'From', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 }
];

export default Analytics;