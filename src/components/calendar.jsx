import React from 'react';
import shortid from 'shortid';
/**
 * Presentational component. Renders weekdays list and dates list in calendar
 */
export class Calendar extends React.Component {
    renderDates = () => {
        const { dates } = this.props;
        return dates.map(dateItem => 
            <li
                className={"calendar__date " + (dateItem.currentMonth ? 'current ' : '') + (dateItem.today ? 'active' : '')}
                key={shortid.generate()}>
                {dateItem.date}
            </li>
        );
    }

    renderWeekdays = () => {
        const { weekdays } = this.props;
        return weekdays.map(weekday => (
            <li className="calendar__weekday" key={shortid.generate()}>{weekday.name}</li>
        ));
    }

    render() {
        return(
            <div className="calendar">
                <ul className="calendar__weekdays-list">{this.renderWeekdays()}</ul>
                <ul className="calendar__dates-list">{this.renderDates()}</ul>
            </div>
        );
    }
}