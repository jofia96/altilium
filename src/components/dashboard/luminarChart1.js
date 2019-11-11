import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { OnGrid, OnBattery, litalityNodes } from '../../actions/chartAction'
import * as d3 from "d3";
import c3 from 'c3'
import 'c3/c3.css';

const useStyles = makeStyles(theme => ({
    chart: {
        marginTop: 40,
        marginLeft: 10
    },
    text: {
        marginLeft: 45,
        marginTop: 20
    }
}));

const LuminarChart1 = ({ chart: { onGrid, onBattery, nodes }, OnGrid, OnBattery, litalityNodes }) => {
    const classes = useStyles();
    useEffect(() => {
        OnGrid()
        OnBattery()
        litalityNodes()
    }, [OnGrid, OnBattery])

    useEffect(() => {
        c3.generate({
            oninit: function () {
                d3.select("#chart2")
                    .select(".c3-chart-arcs-title")
                    .append("tspan")
                    .attr('x', -2)
                    .attr('dy', 15)
                    .text("On Battery : " + onBattery)
                    .append("tspan")
                    .attr('x', -2)
                    .attr('dy', -15)
                    .text("On Grid : " + onGrid)
            },
            bindto: '#chart2',
            data: {
                columns: [
                    ['OnGrid', onGrid],
                    ['OnBattery', onBattery],
                ],
                colors: {
                    OnGrid: 'darkblue',
                    OnBattery: 'lightblue'
                },
                color: function (color, d) {
                    return color;
                },
                type: 'donut',
            },
            legend: {
                show: true
                // position: 'right',
            },
            donut: {
                // title: "On Battery:"+onBattery,
                width: 35,
                label: {
                    show: false,
                },
            }
        });
    })
    return (
        <div >
            <div id="chart2" className={classes.chart}></div>
            <Typography className={classes.text} >
                Total number of Litality nodes : <em><font size="5">{nodes}</font></em>
            </Typography>
        </div>
    )
}
LuminarChart1.propTypes = {
    chart: PropTypes.object,
    OnGrid: PropTypes.func.isRequired,
    OnBattery: PropTypes.func.isRequired,
    litalityNodes: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    chart: state.chart
})
export default connect(mapStateToProps, { OnGrid, OnBattery, litalityNodes })(LuminarChart1)