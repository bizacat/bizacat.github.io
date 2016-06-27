// Tutorial @ http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html

var cal_day_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var cal_month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var cal_month_numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var cal_current_date = new Date();

function Calendar(month, year) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.monthRange = [this.month -1, this.month];
    this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.html = '';
}

Calendar.prototype.generateHTML = function () {
    // Establish first day of the week of this month
    var firstDay0 = new Date(this.year, this.monthRange[0], 1);
    var firstDay1 = new Date(this.year, this.monthRange[1], 1);
    var startingDay0 = firstDay0.getDay();
    var startingDay1 = firstDay1.getDay();

    // Get the number of days in this month
    var monthLength0 = cal_days_in_month[this.monthRange[0]];
    var monthLength1 = cal_days_in_month[this.monthRange[1]];

    // Compensate for leap years
    if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
        if (this.month == 1) { // February only!
            monthLength0 = 29;
        } else if (this.month - 1 == 1) {
            monthLength1 = 29;
        }
    }

    // The HTML
    var monthName0 = cal_month_labels[this.month - 1];
    var monthName1 = cal_month_labels[this.month];
    var monthNumber0 = cal_month_numbers[this.month - 1];
    var monthNumber1 = cal_month_numbers[this.month];

    // ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
    var html = '<table class="calendar-table">';
    // the weekday header
    html += '<tr class="calendar-header" colspan="7">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += cal_day_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';
    // the days
    // Offset the previous month's start day if not a Sunday
    if (startingDay0 > 0) {
        html += '<td class="calendar-day" colspan="' + startingDay0 + '"></td>';
    }

    var day0 = 1;
    var day1 = 1;

    // This loop is for the weeks (rows) 12 just to be safe
    for (var i = 0; i < 11; i++) {
        // This loop is for the weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            // create the first month (previous month)
            if (day0 <= monthLength0 && (i > 0 || j >= startingDay0)) {
                if (day0 < 10) {
                    html += '<td class="calendar-day" id="' + this.year + '-' + monthNumber0 + '-0' + day0 + '"><span class="date-number">';
                } else {
                    html += '<td class="calendar-day" id="' + this.year + '-' + monthNumber0 + '-' + day0 + '"><span class="date-number">';
                }
                if (day0 == 1) {
                    html += monthName0 + ' ';
                }
                html += day0 + '</span>';
                day0++;
            } else {
                if (day1 <= monthLength1 && (i > 0 || j >= startingDay1)) {
                    if (day1 < 10) {
                        html += '<td class="calendar-day" id="' + this.year + '-' + monthNumber1 + '-0' + day1 + '"><span class="date-number">';
                    } else {
                        html += '<td class="calendar-day" id="' + this.year + '-' + monthNumber1 + '-' + day1 + '"><span class="date-number">';
                    }
                }

                if (day1 == 1) {
                    html += monthName1 + ' ';
                }
                html += day1 + '</span>';
                day1++;
            }
            html += '</td>';
        }
        // Stop making rows if we've run out of days
        if (day1 > monthLength1) {
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

