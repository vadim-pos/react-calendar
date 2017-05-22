import React from 'react';
import moment from 'moment';

import { Options } from './options.jsx';
import { Calendar } from './calendar.jsx';

/**
 * Container component. Stateful, contains Options and Calendar components.
 */
export class Main extends React.Component {
    constructor(props) {
        super(props);
        const today = moment();

        this.state = {
            month: today.month(),
            year: today.year(),
            todayDate: today.date(),
            weekStart: 1, // monday
            minYear: 2000,
            maxYear: 2020
        };
    }

    /**
     * Reorder weekdays by week start day
     * @param {Array} weekdays - Weekdays names
     * @param {Number} weekStart - The day from which the week begins
     * @return {Array} - Reordered array of objects with weekday name and weekday number (0 is Sunday, etc...)
     */
    getReorderedWeekdays(weekdays, weekStart) {
        let weekdaysMap = weekdays.map((weekday, i) => ({
                name: weekday,
                num: i
            })
        );

        return weekdaysMap.splice(weekStart).concat(weekdaysMap);
    }

    /**
     * Get dates to be displayed in the calendar
     * @return {Array} - Calendar dates objects
     */
    getCalendarDates() {
        const { month, year, weekStart, todayDate } = this.state;

        let calendarDates = [],
            date = moment(new Date(year, month)),
            prevDay = null,
            nextDay = null,
            todayIsFound = false;

        // get previous month dates
        prevDay = moment(date);
        do {
            prevDay = prevDay.subtract(1, 'days');
            calendarDates.unshift({ date: prevDay.date(), currentMonth: false });
        } while (prevDay.day() !== weekStart)

        // get selected month dates
        nextDay = date;
        while (nextDay.month() === month) {
            calendarDates.push({ date: nextDay.date(), currentMonth: true });
            nextDay = nextDay.add(1, 'days');
        }

        // get next month dates
        do {
            calendarDates.push({ date: nextDay.date(), currentMonth: false });
            nextDay = nextDay.add(1, 'days');
        } while (nextDay.day() !== weekStart)
        
        // find today's date in selected month and mark it as 'today'
        todayIsFound = calendarDates.some(dateItem => {
            if (date.currentMonth && dateItem.date === todayDate) {
                return dateItem.today = true;
            }
        });
        
        // if today's date was not found in selected month (like 30's day in February), find it in previous month and mark it as 'today'
        if (!todayIsFound) {
            calendarDates.some(dateItem => {
                if (dateItem.date === todayDate) {
                    return dateItem.today = true;
                }
            })
        }
        
        return calendarDates;
    }
    
    /**
     * Update state when user interacts with Options
     * @param {Object} changesObj - Changes passed from Options component
     */
    handleOptionChange = changesObj => {
        this.setState({ ...this.state, ...changesObj });
    }

    render() {
        const { weekStart } = this.state;
        const weekdays = moment()._locale._weekdaysShort; // weekdays short names
        const months = moment()._locale._months; // months names
        
        return(
            <div>
                <Options
                    {...this.state}
                    weekdays={this.getReorderedWeekdays(weekdays, 1)} // start from monday (1'st day)
                    months={months}
                    onChange={this.handleOptionChange}
                />
                <Calendar
                    dates={this.getCalendarDates()}
                    weekdays={this.getReorderedWeekdays(weekdays, weekStart)}
                />
            </div>
        );
    }
}