import React, { useState, Fragment } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Grid, Checkbox } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import theme from './theme';
import 'moment/min/locales.min';

const businessTheme = theme;
const useStyles = makeStyles((theme) => ({
    icon: {
        borderRadius: 3,
        width: businessTheme.size,
        height: businessTheme.size,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: businessTheme.palette.background.main,
        'input:hover ~ &': {
            backgroundColor: businessTheme.palette.hover.main,
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: businessTheme.palette.primary.main,
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: businessTheme.size,
            height: businessTheme.size,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: businessTheme.palette.hover.main,
        },
    },
}));

const INIT_ACTIVE = false;
const HOURS = new Array(24).fill(INIT_ACTIVE);
const DAYS = new Array(7).fill(HOURS);

const getDayAsLocal = (indexDay) => {
    return moment().weekday(indexDay).format('ddd').toUpperCase();
}

export default function DailyTime(props) {
    const { lang } = props;
    const [data, setData] = useState(DAYS);
    lang && moment.locale(lang);

    const handleChange = (day, hour) => {
        let d = data[day];
        let aux = d.map((item, index) => {
            if (index === hour) {
                return !item;
            } else {
                return item;
            }
        });
        let newdata = [];
        data.forEach((element, index) => {
            index===day ? newdata.push(aux):newdata.push(element);
        });
        props.onchange(newdata);
        setData(newdata);
    }

    return (
        <Fragment>
            <ThemeProvider theme={businessTheme}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Grid container direction="column" style={{ margin: 0, pading: 0 }}>
                            {
                                DAYS.map((element, i) => {
                                    return <DayRow style={{ margin: 0, pading: 0, height: 30 }} key={`day_${i}`} index={i} data={data} ></DayRow>
                                })
                            }
                        </Grid>
                        <Grid container direction="row" style={{ margin: 0, pading: 0, height: businessTheme.size }}>
                            <Grid item style={{ margin: 0, pading: 0, width: 65 }}>hrs.</Grid>
                            {
                                data && data[0].map((item, i) => {
                                    return <Grid key={`hr_${i}`} item style={{ margin: 0, pading: 0, width: businessTheme.size }}>{i}</Grid>
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Fragment>
    )
    function DayRow(props) {
        const classes = useStyles();
        return (
            <Grid item style={{ margin: 0, pading: 0 }}>
                <Grid container direction="row" style={{ margin: 0, pading: 0, height: businessTheme.size }}>
                    <Grid item style={{ margin: 0, pading: 0, width: 60 }}> {getDayAsLocal(props.index)}</Grid>
                    <Grid item xs={11} style={{ margin: 0, pading: 0 }}>
                        {props.data && props.data[props.index].map((element, i) => {
                            return <Checkbox
                                key={`check${props.indes}_${i}`}
                                checked={data[props.index][i]}
                                onChange={() => handleChange(props.index, i)}
                                icon={<span className={classes.icon} />}
                                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                style={{ margin: 0, padding: 0, width: businessTheme.size }} key={`day_${props.index}_h_${i}`} >{"x"}</Checkbox >
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
