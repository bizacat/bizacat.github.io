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



