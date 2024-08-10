$(document).ready(function() {
    // an empty object
    const amenities = {}
    //Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        // if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
    if ($(this).is(':checked')) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    // if the checkbox is unchecked, remove the Amenity ID from the variable
    } else {
        delete amenities[$(this).attr('data-id')];
    }
    // update the h4 tag inside the div Amenities 
    // with the list of Amenities checked
    $('.amenities H4').text(Object.values(amenities).join(', '));
    });
});