import React from "react";

export default class BattingAverage extends React.Component {
    static get displayName() {
        return "BattingAverage";
    }

    static get propTypes() {
        return {
            rowData: React.PropTypes.object.isRequired,
            options: React.PropTypes.any.isRequired,
            column: React.PropTypes.string.isRequired,
            value: React.PropTypes.any
        };
    }

    render() {
        const avg = Math.floor(1000 * this.props.rowData.totalH / this.props.rowData.totalAB);

        return (
            <div className="avg">
                .{avg} <a href="https://en.wikipedia.org/wiki/Batting_average" target="_blank">
                    <i className="hi page small hi-help"></i>
                </a>
            </div>
        );
    }
}
