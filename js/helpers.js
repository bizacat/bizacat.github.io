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
    var liTag = $('<li>');
    var aTag = $('<a>');
    tagCloudUl.append(liTag);

    liTag.append(aTag);
    aTag.addClass('tag').text(tagList[i]);

    // hyphenate the tags
    tagListHyphenated = tagList[i].replace(/\s+/g, '-');

    // add hyphenated version as id to the anchors
    aTag.attr('id', tagListHyphenated);

function showAll() {
    $('section.design-work').show();
}

// When clicking on a tag's anchor in the tagCloud
    $('a.tag').click(function() {
        // sections with matching tag
        var matchingSection = $('section.' + $(this).attr('id'));

        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            showAll();
        } else {
            // Add selected tag to the tagCloud item that was clicked
            $(this).addClass('selected');
            // hide all sections
            $('section.design-work').hide();
            // find the matching section(s) with this as a class and give them the class of show
            matchingSection.show();
        }
    });
}


$('#showAll').click(function(){
    showAll();
    $('a.tag').removeClass('selected');
});
