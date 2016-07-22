$(document).ready(function() {

    $('#calendar').fullCalendar({
        // put your options and callbacks here

        header: {
          left: '',
          center: 'prevYear prev title next nextYear',
          right: ''
        },
        fixedWeekCount: false,

        events: function (start, end, timezone, callback) {

            $.ajax({
                url: '/img/photoarun',
                success: function (data) {

                    $('#this-day').remove();

                    // Get an array of all the dates on the calendar
                    var calendarDay = $('thead td[data-date]');
                    var dataAttr = $.map(calendarDay, function (element) {
                        return $(element).attr('data-date');
                    });

                    var timeStamp = [];

                    $(data).find('a:contains(".jpg")').each(function () {
                        timeStamp.push(this.text.slice(0, -4)).split;
                    });

                    $('thead td.fc-day-number').addClass('photo-holder');
                    var photoHolder = $('.photo-holder');

                    var d = new Date();
                    var day = d.getDate();
                    if (day < 10) {
                        day = '0' + day;
                    }
                    var month = d.getMonth() + 1;
                    var year = d.getFullYear()-1;

                    var thisDayLastYear = year + '-0' + month + '-' + day;
                    var thisDayElement = '<div class="photo-holder" id="this-day" data-date="' + thisDayLastYear + '"></div>';

                    $('.fc-view-container').append(thisDayElement);
                    $('#this-day').attr('data-date', thisDayLastYear);

                    // Loop through all of the #photoarun photos available
                    for (x in timeStamp) {
                        // Loop through the calendar date array
                        for (y in dataAttr) {

                            if (dataAttr[y] === timeStamp[x]) {
                                $('.photo-holder[data-date="' + dataAttr[y] + '"]').append('' +
                                    '<a data-strip-group="photoarun" class="strip photoarun-photo" href="'
                                    + '/img/photoarun/' + timeStamp[x] + '.jpg'
                                    + '" data-strip-caption=""><img src="'
                                    + '/img/photoarun/' + timeStamp[x] + '.jpg'
                                    + '"></a>'
                                );
                                $('.photo-holder[data-date="' + dataAttr[y] + '"] .date-number').addClass('visible');
                            }
                        }
                    }

                   // This day last year
                   if (thisDayLastYear === null) {
                        return;
                   } else {
                        $('#this-day').append(''
                             + '<h3>This day last year:</h3><h4>' + month + '/' + day + '/' + year
                             + '</h4><a data-strip-group="photoarun" class="strip photoarun-photo" href="'
                             + '/img/photoarun/' + thisDayLastYear + '.jpg'
                             + '" data-strip-caption=""><img src="'
                             + '/img/photoarun/' + thisDayLastYear + '.jpg'
                             + '"></a>'
                       );
                   }

                    // Get height of day with photo and make all td.calendar-height the same height

                    var photoHeight = $('.fc-content-skeleton img').height();
                    $('.fc-content-skeleton thead td').height(photoHeight);

                    // Check if any day has more than one image
                    $('.calendar-day').each(function () {
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

    $('#the-beginning').click(function(e){
        e.preventDefault();
        $('#calendar').fullCalendar( 'gotoDate', '2015-01-25' )
    });
    $('#today').click(function(e){
        e.preventDefault();
        $('#calendar').fullCalendar( 'today' )
    });
});