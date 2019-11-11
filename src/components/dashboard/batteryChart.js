import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as d3 from "d3"
import c3 from 'c3'
import 'c3/c3.css'

const useStyles = makeStyles(theme => ({
    chart: {
        marginTop: 24
    },
    text: {
        marginLeft: 45,
        marginTop: 5
    }
}));
const BatteryChart = ({ chart: { battery } }) => {
    const classes = useStyles();
    let roundOfBattery = Math.round(battery)
    useEffect(() => {
        c3.generate({
            oninit: function () {
                // d3.select("#chart1")
                //     .select('.c3-chart-arcs-title')
                //     // .insert("battery",":first-child")
                //     .attr('x', -2)
                //     .attr('dy', 4)
                //     .text(roundOfBattery + "%")
                // //.attr('xlink:href', Battery);
            },
            bindto: '#chart1',
            data: {
                columns: [
                    ['Battery', battery]
                ],
                type: 'gauge',
            },
            legend: {
                show: false
            },
            gauge: {
                fullCircle: true,
                label: {
                    format: function (value, ratio) {
                        return;
                    },
                    show: false// to turn off the min/max labels.
                },
                width: 33// for adjusting arc thickness
            },
            color: {
                pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
                threshold: {
                    //unit: 'value', // percentage is default
                    //max: 200, // 100 is default
                    values: [30, 60, 90, 100]
                }
            },
            size: {
                height: 345
            },
          
             
        });
    })
    return (
        <div>
            <div id="chart1" className={classes.chart} ></div>
            <Typography className={classes.text}>
                <em><font size="5">{roundOfBattery}</font></em>  % Charge

                </Typography>
        </div>
    )
}

BatteryChart.propTypes = {
    chart: PropTypes.object,
}
const mapStateToProps = state => ({
    chart: state.chart
})
export default connect(mapStateToProps, {})(BatteryChart)