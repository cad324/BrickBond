import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import {styles} from './PayInvestors.Style';

const useStyles = makeStyles(styles);

const PayInvestors = (props) => {

  const [payout, setPayout] = useState(0);

  const classes = useStyles();

  const payInvestors = () => {
    props.payInvestors(payout);
    setPayout(0);
  }

  return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.cardTitle} color="textSecondary">
            PAY INVESTORS
          </Typography>
          <form className={classes.formCtr}>
            <label>
              <span>{`Total Payout (CA$): `}</span>
              <input
                type="number"
                name="payout"
                value={payout}
                onChange={e => setPayout(e.target.value)}
              />
            </label>
          </form>
          {props.payingInvestors ?
            <CircularProgress thickness={5} className={classes.progress} disableShrink /> :
            <Button
            size="small"
            disabled={payout < 10}
            className={classes.primaryBtn}
            onClick={() => payInvestors()}
            variant="contained">
              <Typography variant="caption" component="p">Pay Investors</Typography>
            </Button>
          }
        </CardContent>
      </Card>
  );
}

export default PayInvestors;
