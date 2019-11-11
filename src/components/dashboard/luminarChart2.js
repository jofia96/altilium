import React, { useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import c3 from 'c3'
import { connect } from 'react-redux'
import 'c3/c3.css';
import { opModeOff, opModeOn } from '../../actions/chartAction';
import * as d3 from "d3";

const useStyles = makeStyles(theme => ({
    chart: {
        marginTop: 40,
        marginLeft: 50
    },
}));
const LuminarChart2 = ({ chart: { opmodeOn, opmodeOff }, opModeOff, opModeOn }) => {
    const classes = useStyles();
    useEffect(() => {
        opModeOff()
        opModeOn()
    }, [opModeOff, opModeOn])
    useEffect(() => {
        c3.generate({
            oninit: function () {
                // var element = this.selectChart[0][0]
                d3.select("#chart3")
                    .select(".c3-chart-arcs-title")
                    .append("tspan")
                    .attr('x', -2)
                    .attr('dy', 15)
                    .text("ON : " + opmodeOn)
                    .append("tspan")
                    .attr('x', -2)
                    .attr('dy', -15)
                    .text("OFF : " + opmodeOff)
            },
            bindto: '#chart3',
            data: {
                columns: [
                    ['On', opmodeOn],
                    ['Off', opmodeOff],
                ],
                colors: {
                    On: 'darkblue',
                    Off: 'gray'
                },
                color: function (color, d) {
                    return color;
                },
                type: 'donut',
            },
            donut: {
                label: {
                    show: false,
                },
                width: 35
            }
        });
    })

    return (
        <div >
            <div id="chart3" className={classes.chart}></div>
        </div>
    )
}
LuminarChart2.propTypes = {
    chart: PropTypes.object,
    opModeOff: PropTypes.func.isRequired,
    opModeOn: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    chart: state.chart
})
export default connect(mapStateToProps, { opModeOn, opModeOff })(LuminarChart2)