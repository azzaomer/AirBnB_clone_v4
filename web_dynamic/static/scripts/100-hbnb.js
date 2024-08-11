$(document).ready(init);
    //Listen to changes on each input checkbox tag:
//if the checkbox is checked, you must store the State 
//or City
//ID in a variable (dictionary or list)
    const statsObj = [];
    const cityObj = [];
    const amenityObj = [];
    obj = {};

function init() {
    ('$.amenities .popover input').change(function() {
        obj = amenityObj;
        checkObj.call(this, 1);
    });
    $('.state_input').change(function() {
        obj = stateObj;
        checkObj.call(this, 2);
    });
    $('.city_input').change(function() {
        obj = cityObj;
        checkObj.call(this, 3);
    });
}
function checkObj(nObject) {
    if ($(this).is(':checked')) {
        obj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')){
        delete obj[$(this).attr('data-name')];
    }
    const names = Object.keys(obj);
    if(nObject === 1) {
        $('.amenities h4').text(names.sort().join(', '));
    } else if (nObject === 2) {
        $('.locations h4').text(names.sort().join(', '));
    }
}

function apiStatus () {
    const apiUrl = `http://${HOST}:5001/api/v1/status/`;
    $.get(apiUrl, (data, textStatus) => {
      if (textStatus === 'success' && data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }

  function searchPlaces () {
    const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;
    $.ajax({
      url: PLACES_URL,
      type: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        amenities: Object.values(amenityObj),
        states: Object.values(stateObj),
        cities: Object.values(cityObj)
      }),
      success: function (response) {
        $('SECTION.places').empty();
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
