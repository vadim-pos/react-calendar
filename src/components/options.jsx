import React from 'react';
import shortid from 'shortid';
/**
 * Presentational component. Renders select elements with proper options.
 * Passes options changes to container component after user interactions
 */
export class Options extends React.Component {
    onChange = e => {
        const target = e.target;
        const { onChange } = this.props;
        onChange({ [target.name]: parseInt(target.value) });
    }

    getDayOptions = () => {
        const { weekdays } = this.props;
        return weekdays.map(weekday => (
            <option value={weekday.num} key={shortid.generate()}>{weekday.name}</option>)
        );
    }

    getMonthOptions = () => {
        const { months } = this.props;
        return months.map((monthName, i) => (
            <option value={i} key={shortid.generate()}>{monthName}</option>)
        );
    }

    getYearOptions = () => {
        const { minYear, maxYear } = this.props;
        let yearOptions = [];

        for (var i = minYear; i <= maxYear; i++) {
            yearOptions.push(<option value={i} key={shortid.generate()}>{i}</option>);
        }

        return yearOptions;
    }

    render() {
        const { weekStart, month, year } = this.props;

        return(
            <div className="options">
                <select
                    className="options__group"
                    name="month"
                    value={month}
                    onChange={this.onChange}>
                    {this.getMonthOptions()}
                </select>
                <select
                    className="options__group"
                    name="year"
                    value={year}
                    onChange={this.onChange}>
                    {this.getYearOptions()}
                </select>
                <select
                    className="options__group"
                    name="weekStart"
                    value={weekStart}
                    onChange={this.onChange}>
                    {this.getDayOptions()}
                </select>
            </div>
        );
    }
}