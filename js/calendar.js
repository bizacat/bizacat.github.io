// Tutorial @ http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html

var cal_day_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var cal_month_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var cal_month_numbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var cal_current_date = new Date();

function Calendar(month, year) {
    this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
    this.html = '';
}

Calendar.prototype.generateHTML = function () {
    // Establish first day of the week
    var firstDay = new Date(this.year, this.month, 1);
    console.log('This is the first day:' + firstDay);
    var startingDay = firstDay.getDay();
    console.log('This is the starting day:' + startingDay);

    // Get the number of days in the month
    var monthLength = cal_days_in_month[this.month];

    // Compensate for leap years
    if (this.month == 1) { // February only!
        if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
            monthLength = 29;
        }
    }

    // The HTML
    var monthName = cal_month_labels[this.month];
    var monthNumber = cal_month_numbers[this.month];
    var html = '<table class="calendar-table">';
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
    // This loop is for the weeks (rows) 10 just to be safe
    for (var i = 0; i < 9; i++) {
        // This loop is for the weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            if (day < 10) {
                html+= '<td class="calendar-day" id="' + this.year + '-' + monthNumber + '-0' + day + '"><span class=date-number">';
            } else {
                html+= '<td class="calendar-day" id="' + this.year + '-' + monthNumber + '-' + day + '"><span class=date-number">';
            }
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
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

// !!!!!!!!!!!!!!!!!!!

//
//Calendar.prototype.generateHTML = function(){
//
//    // get first day of month
//    var firstDay = new Date(this.year, this.month, 1);
//    var startingDay = firstDay.getDay();
//
//    // find number of days in month
//    var monthLength = cal_days_in_month[this.month];
//
//    // compensate for leap year
//    if (this.month == 1) { // February only!
//        if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
//            monthLength = 29;
//        }
//    }
//
//    // do the header
//    var monthName = cal_months_labels[this.month]
//    var html = '<table class="calendar-table">';
//    html += '<tr><th colspan="7">';
//    html +=  monthName + "&nbsp;" + this.year;
//    html += '</th></tr>';
//    html += '<tr class="calendar-header">';
//    for(var i = 0; i <= 6; i++ ){
//        html += '<td class="calendar-header-day">';
//        html += cal_days_labels[i];
//        html += '</td>';
//    }
//    html += '</tr><tr>';
//
//    // fill in the days
//    var day = 1;
//    // this loop is for is weeks (rows)
//    for (var i = 0; i < 9; i++) {
//        // this loop is for weekdays (cells)
//        for (var j = 0; j <= 6; j++) {
//            html += '<td class="calendar-day">';
//            if (day <= monthLength && (i > 0 || j >= startingDay)) {
//                html += day;
//                day++;
//            }
//            html += '</td>';
//        }
//        // stop making rows if we've run out of days
//        if (day > monthLength) {
//            break;
//        } else {
//            html += '</tr><tr>';
//        }
//    }
//    html += '</tr></table>';
//
//    this.html = html;
//}
//
//Calendar.prototype.getHTML = function() {
//    return this.html;
//}
//
//
