// Tutorial @ http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html

var cal_day_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var cal_month_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var cal_month_numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var cal_current_date = new Date();

function Calendar(month, year) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
        // prints as 10 for November
        //console.log(this.month - 1); prints correctly as 9 (October)
    this.prevMonth = this.month - 1;
    this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.html = '';
}

Calendar.prototype.generateHTML = function () {
    // Establish first day of the week of this month
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();

    // Get the number of days in this month
    var monthLength = cal_days_in_month[this.month];

    // Establish first day of the week of the previous month
    var prevFirstDay = new Date(this.year, this.prevMonth, 1);
    var prevStartingDay = prevFirstDay.getDay();

    // Get the number of days in the previous month
    var prevMonthLength = cal_days_in_month[this.prevMonth];

    // Compensate for leap years
    if (this.month == 1) { // February only!
        if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
            monthLength = 29;
        }
    }

    // The HTML
    var monthName = cal_month_labels[this.month];
    var monthNumber = cal_month_numbers[this.month];

    var prevMonthName = cal_month_labels[this.prevMonth];
    var prevMonthNumber = cal_month_numbers[this.prevMonth];

    // ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
    var html = '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
        // the month and year
    html += prevMonthName + '&nbsp;' + this.year;
    html += '</th></tr>';
        // the weekday header
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += cal_day_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    if (prevStartingDay > 0) {
        html += '<td class="calendar-day" colspan="' + prevStartingDay + '"></td>';
    }
        // the days
    var day = 1;

    // This loop is for the weeks (rows) 10 just to be safe
    for (var i = 0; i < 9; i++) {
        // This loop is for the weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            if (day <= prevMonthLength && (i > 0 || j >= prevStartingDay)) {
                if (day < 10) {
                    html+= '<td class="calendar-day" id="' + this.year + '-' + prevMonthNumber + '-0' + day + '"><span class=date-number">';
                } else {
                    html+= '<td class="calendar-day" id="' + this.year + '-' + prevMonthNumber + '-' + day + '"><span class=date-number">';
                }
                html += day + '</span>';
                day++;
            }
            html += '</td>';
        }
        // Stop making rows if we've run out of days
        if (day > prevMonthLength) {
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';


    // ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
    html += '<table class="calendar-table">';
    html += '<tr><th colspan="7">';
    // the month and year
    html += monthName + '&nbsp;' + this.year;
    html += '</th></tr>';
    // the weekday header
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += cal_day_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';
    // the days
    var day = 1;
    // This loop is for the weeks (rows) 12 just to be safe
    for (var i = 0; i < 11; i++) {
        // This loop is for the weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            if (startingDay > 0) {
                html += '<td class="calendar-day" colspan="' + (startingDay - 1) + '"></td>';
            }
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                if (day < 10) {
                    html += '<td class="calendar-day" id="' + this.year + '-' + monthNumber + '-0' + day + '"><span class=date-number">';
                } else {
                    html += '<td class="calendar-day" id="' + this.year + '-' + monthNumber + '-' + day + '"><span class=date-number">';
                }
                html += day + '</span>';
                day++;
            }
            html += '</td>';
        }
        // Stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';

    this.html = html;
}

Calendar.prototype.getHTML = function() {
    return this.html;
}