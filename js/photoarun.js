$(document).ready(function() {

    //$.ajax({
    //    url: "http://bizacat.github.io/photoarun-images/",
    //    success: function(data){
    //        $(data).find("td > a").each(function(){
    //            // will loop through
    //            console.log("Found a file: " + $(this).attr("href"));
    //        });
    //    }
    //});
    var baseUrl = "/photoarun-images/";
    var pictureIndex = 0;
    var pictures = [];

    function getFiles() {
        $.ajax(baseUrl).success(function(data) {
            pictures = [];
            $(data).find("a[href]").each(function() {
                var href = $(this).attr('href');
                if (href.indexOf('.jpg') > 0 || href.indexOf('.png') > 0 || href.indexOf('.jpeg') > 0) {
                    pictures.push(href);
                }
            });
            console.log(pictures.length + " pictures loaded!");
            changePicture(0);
        });
    }
    //
    //function changePicture(indexOffset) {
    //    pictureIndex += indexOffset;
    //    if (pictureIndex >= pictures.length) {
    //        pictureIndex = 0;
    //    } else if (pictureIndex < 0) {
    //        pictureIndex = pictures.length - 1;
    //    }
    //    $('#viewer').attr('src', baseUrl + pictures[pictureIndex]);
    //    $('#info').text((pictureIndex + 1) + "/" + pictures.length);
    //}
    //
    //getFiles();
    //$(document).keydown(function(e){
    //    var left = -1, right = 1;
    //    if (e.keyCode == 37) {
    //        changePicture(left); return false;
    //    } else if (e.keyCode == 39) {
    //        changePicture(right); return false;
    //    }
    //});

});
//    // page is now ready, initialize the calendar...
//
//    $.ajax({
//        url: 'https://www.instagram.com/bizacat/media/',
//        dataType: 'jsonp',
//        success: function (data) {
//            console.log(data);
//
//            // Get an array of all the dates on the calendar
//            var calendarDay = $('thead td[data-date]');
//            var dataAttr = $.map(calendarDay, function (element) {
//                return $(element).attr('data-date');
//            });
//            console.log(dataAttr);
//
//            // Loop through all of the #photoarun photos available
//            for (x in data.data) {
//
//                // Loop through the calendar date array
//                for (y in dataAttr) {
//
//                    // Get the date of each #photoarun
//                    var timeStamp = new Date(parseInt(data.data[x].created_time) * 1000);
//                    timeStamp = $.format.date(timeStamp, 'yyyy-MM-dd');
//                    var newTimeStamp = new Date(parseInt(data.data[x].created_time) * 1000);
//                    newTimeStamp = $.format.date(newTimeStamp, 'MMMM d');
//
//                    if (dataAttr[y] === timeStamp) {
//                        $('.calendar-day[id="' + dataAttr[y] + '"]').append('' +
//                            '<a data-strip-group="photoarun" class="strip photoarun-photo" href="'
//                            + data.data[x].images.standard_resolution.url
//                            + '" data-strip-caption="'
//                            + newTimeStamp + ': '
//                            + data.data[x].caption.text
//                            + '"><img src="'
//                            + data.data[x].images.low_resolution.url
//                            + '"></a>');
//                        $('.calendar-day[id="' + dataAttr[y] + '"] .date-number').addClass('visible');
//                    }
//                }
//
//
//            }
//
//            // Get height of day with photo and make all td.calendar-height the same height
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
//
//    //$('#calendar').fullCalendar({
//    //    // put your options and callbacks here
//    //    events: function (start, end, timezone, callback) {
//    //
//    //        $.ajax({
//    //            url: 'http://bizacat.github.io/img/photoarun',
//    //            success: function (data) {
//    //                // Get an array of all the dates on the calendar
//    //                var calendarDay = $('thead td[data-date]');
//    //                var dataAttr = $.map(calendarDay, function (element) {
//    //                    return $(element).attr('data-date');
//    //                });
//    //                console.log(dataAttr);
//    //
//    //                var timeStamp = [];
//    //
//    //                $(data).find('a:contains(".jpg")').each(function () {
//    //                    timeStamp.push(this.text.slice(1, -4)).split;
//    //                });
//    //
//    //                console.log(timeStamp);
//    //
//    //                // Loop through all of the #photoarun photos available
//    //                for (x in timeStamp) {
//    //                    // Loop through the calendar date array
//    //                    for (y in dataAttr) {
//    //
//    //                        if (dataAttr[y] === timeStamp[x]) {
//    //                            $('thead td[data-date="' + dataAttr[y] + '"]').append('' +
//    //                                '<a data-strip-group="photoarun" class="strip photoarun-photo" href="'
//    //                                + '/img/photoarun/' + timeStamp[x] + '.jpg'
//    //                                + '" data-strip-caption=""><img src="'
//    //                                + '/img/photoarun/' + timeStamp[x] + '.jpg'
//    //                                + '"></a>'
//    //                            );
//    //                            $('thead td[data-date="' + dataAttr[y] + '"] .date-number').addClass('visible');
//    //                        }
//    //
//    //                    }
//    //                }
//    //
//    //                // Get height of day with photo and make all td.calendar-height the same height
//    //
//    //                var photoHeight = $('.fc-content-skeleton img').height();
//    //                $('.fc-content-skeleton thead td').height(photoHeight);
//    //
//    //                // Check if any day has more than one image
//    //                $('.calendar-day').each(function () {
//    //                    var $this = $(this);
//    //                    if ($this.find('img').length > 1) {
//    //                        $this.addClass('twinsies');
//    //                    }
//    //                });
//    //            },
//    //            error: function (data) {
//    //                console.log(data);
//    //            }
//    //        });
//    //    }
//    //});
//});