$(document).ready(init);
    const HOST = '0.0.0.0';

    function init() {
        const amenityObject = {};
        $('.amenities.popover input').change(function(){
            if(($this).is(':checked')){
                amenityObject[$(this).arrt('data-name')] = $(this).attr('data-id');
            } else {
                delete amenityObject[$(this).attr('data-name')];
            }
            const names = Object.keys(amenityObject);
            $('.amenities h4').text(names.sort().join(', '));
        })
        apiStatus();
        fetchPlaces();
    }

    function apiStatus() {
        const apiUrl = 'http://${HOST}:5001/api/v1/status/';
        $.get(apiUrl, (data, textStatus) => {
            if (textStatus === 'success' && data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available')
            }
        });
    }

    function fetchPlaces() {
        const placesUrl = `http://${HOST}:5001/api/v1/places_search/`;
        $.ajax({
            url: PLACES_URL,
            type: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({}),
            success: function (response) {
                for (const r of response) {
                    const article = ['<article>',
                      '<div class="title_box">',
                    `<h2>${r.name}</h2>`,
                    `<div class="price_by_night">$${r.price_by_night}</div>`,
                    '</div>',
                    '<div class="information">',
                    `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
                    `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
                    `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
                    '</div>',
                    '<div class="description">',
                    `${r.description}`,
                    '</div>',
                    '</article>'];
                    $('SECTION.places').append(article.join(''));
                  }
                },
                error: function (error) {
                    console.log(error);
                  }
                
            });

    }
/*
Send a POST request with Content-Type:
application/json and an empty dictionary in
the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
Loop into the result of the request and create
an article tag representing a Place in the
section.places.
(you can remove the Owner tag in the place description)
*/