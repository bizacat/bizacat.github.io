//$(window).load(function() {
//
//    $.ajax({
//        url: '../img/photoarun',
//        success: function (data) {
//            // Get an array of all the dates on the calendar
//            var calendarDay = $('thead td[data-date]');
//            var dataAttr = $.map(calendarDay, function (element) {
//                return $(element).attr('data-date');
//            });
//            console.log(dataAttr);
//
//            var timeStamp = [];
//
//            $(data).find('a:contains(".jpg")').each(function () {
//                timeStamp.push(this.text.slice(0, -4)).split;
//            });
//
//            console.log(timeStamp);
//
//            // Loop through all of the #photoarun photos available
//            for (x in timeStamp) {
//                // Loop through the calendar date array
//                for (y in dataAttr) {
//
//                    if (dataAttr[y] === timeStamp[x]) {
//                        $('thead td[data-date="' + dataAttr[y] + '"]').append('' +
//                            '<a data-strip-group="photoarun" class="strip photoarun-photo" href="'
//                            + '/img/photoarun/' + timeStamp[x] + '.jpg'
//                            + '" data-strip-caption=""><img src="'
//                            + '/img/photoarun/' + timeStamp[x] + '.jpg'
//                            + '"></a>'
//                        );
//                        $('thead td[data-date="' + dataAttr[y] + '"] .date-number').addClass('visible');
//                    }
//
//                }
//            }
//
//            // Get height of day with photo and make all td.calendar-height the same height
//
//            var photoHeight = $('.fc-content-skeleton img').height();
//            $('.fc-content-skeleton thead td').height(photoHeight);
//
//            // Check if any day has more than one image
//            $('.calendar-day').each(function() {
//                var $this = $(this);
//                if ($this.find('img').length > 1) {
//                    $this.addClass('twinsies');
//                }
//            });
//        },
//        error: function (data) {
//            console.log(data);
//        }
//    });
////});
//<strong>File not found</strong></p>↵↵ <p>↵ The site configured at this address does not↵ contain the requested file.↵
//</p>↵↵ <p>↵ If this is your site, make sure that the filename case matches the URL.<br>↵ For root URLs
//(like <code>http://example.com/</code>) you must provide an↵ <code>index.html</code> file.↵ </p>↵↵ <p>↵
// <a href=\"https://help.github.com/pages/\">Read the full documentation</a>↵ for
// more information about using <strong>GitHub Pages</strong>.↵ </p>↵↵ <div id=\"suggestions\">↵
// <a href=\"https://status.github.com\">GitHub Status</a> &mdash;↵ <
// a href=\"https://twitter.com/githubstatus\">@githubstatus</a>↵ </div>↵↵




$(document).ready(function() {
    // page is now ready, initialize the calendar...


    $('#calendar').fullCalendar({
        // put your options and callbacks here
        events: function(start, end, timezone, callback) {
            $.ajax({
                url: 'http://bizacat.github.io/photoarun/',
                success: function (data) {
                    console.log('change 1');
                    // Get an array of all the dates on the calendar
                    var calendarDay = $('thead td[data-date]');
                    var dataAttr = $.map(calendarDay, function (element) {
                        return $(element).attr('data-date');
                    });

                    var timeStamp = [];

                    $(data).find('a:contains(".jpg")').each(function () {
                        timeStamp.push(this.text.slice(0, -4)).split;
                    });

                    for (x in timeStamp) {
                        // Loop through all of the #photoarun photos available

                        for (y in dataAttr) {

                            if (dataAttr[y] === timeStamp[x]) {
                                // Loop through the calendar date array
                                console.log(timeStamp);

                                $('thead td[data-date="' + dataAttr[y] + '"]').append('' +
                                    '<a data-strip-group="photoarun" class="strip photoarun-photo" href="'
                                    + '/photoarun/' + timeStamp[x] + '.jpg'
                                    + '" data-strip-caption=""><img src="'
                                    + '/photoarun/' + timeStamp[x] + '.jpg'
                                    + '"></a>'
                                );
                                $('thead td[data-date="' + dataAttr[y] + '"] .date-number').addClass('visible');
                            }

                        }
                    }

                    // Get height of day with photo and make all td.calendar-height the same height

                    var photoHeight = $('.fc-content-skeleton img').height();
                    $('.fc-content-skeleton thead td').height(photoHeight);

                    // Check if any day has more than one image
                    $('.calendar-day').each(function() {
                        var $this = $(this);
                        if ($this.find('img').length > 1) {
                            $this.addClass('twinsies');
                        }
                    });
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    });

    console.log('fullCalendar initialized');
});