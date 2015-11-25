// Tag cloud area that gets populated with the tags
var tagCloudUl = $('#tagCloudUl');

// Select all tags on the page
var tag = $('span.tag');

// Grab all inner text of tags
var tagList = tag.map(function(){
    return this.innerHTML;
}).get();

// Set up hyphenated list of tags
var tagListHyphenated = [];

// Loop through each tag on page and create tag for it in tagCloudUl
for (i=0; i < tagList.length; i++) {
    function showAll() {
        $('section.design-work').show();
    }

// When clicking on a tag's anchor in the tagCloud
    $('a.tag').click(function () {
        // sections with matching tag
        var matchingSection = $('section.' + $(this).attr('id'));
        var matchingText = $(this).text();

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            // Remove the filtered class in the content that was matched/filtered above
            $('.filtered').removeClass('filtered');
            showAll();
        } else {
            // Highlight the tag in the content that is being matched/filtered above
            $('span.tag').filter(function() {
                return $(this).text() === matchingText;
            }).addClass("filtered");
            // Add selected tag to the tagCloud item that was clicked
            $('a.tag').removeClass('selected');
            $(this).addClass('selected');
            // hide all sections
            $('section.design-work').hide();
            // find the matching section(s) with this as a class and show them
            matchingSection.show();
        }
    });
}


// Instagram API

var accessToken = '1467055893.9fcd975.516d1778069d4706812a4be9cf8cb594';
var clientId = '9fcd97533de7404388454e3d65c663d5';
var userId = '1467055893';
var url = 'https://api.instagram.com/v1/tags/photoarun/media/recent?access_token=' + accessToken;

$(document).ready(function(){

    $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        data: {
            clientId: clientId
        },
        success: function (data) {
            console.log(data);

            // Get an array of all the dates on the calendar
            var calendarDay = $('thead td[data-date]');
            var dataAttr = $.map(calendarDay, function (element) {
                return $(element).attr('data-date');
            });

            // Loop through all of the #photoarun photos available
            for (x in data.data) {

                // Loop through the calendar date array
                for (y in dataAttr) {

                    // Get the date of each #photoarun
                    var timeStamp = new Date(parseInt(data.data[x].created_time) * 1000);
                    timeStamp = $.format.date(timeStamp, 'yyyy-MM-dd');

                    if (dataAttr[y] === timeStamp) {
                        $('thead td[data-date="' + dataAttr[y] + '"]').append('' +
                            '<a href="' + data.data[x].link + '" target="_blank">' + '<img src="' + data.data[x].images.low_resolution.url + '"></a>');
                        $('thead td[data-date="' + dataAttr[y] + '"] .date-number').addClass('visible');
                        $('.fc-bg td[data-date="' + dataAttr[y] + '"]').append('<span class="insta-description">' + data.data[x].caption.text + '</span>');
                    }
                }
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
});


$('#calendar').fullCalendar({

    views: {
        month: { // name of view
            titleFormat: ''
            // other view-specific options here
        }
    }
});
