const amenities = {};
let places = {};
$(document).ready(function () {
  $('#api_status').addClass('not_available');
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text('');
    let count = 0;
    Object.entries(amenities).forEach(([key, value]) => {
      if (count === 0) {
        $('.amenities H4').append(value);
      } else {
        $('.amenities H4').append(', ');
        $('.amenities H4').append(value);
      }
      count += 1;
    });
  });
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').toggleClass('available');
      } else {
        $('#api_status').toggleClass('not_available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    datatype: 'json',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    success: function (data) {
      places = data;
      places.forEach((place, index) => {
        $('.places').append(
          '<article>' +
        '<div class="title">' +
        '<h2>' + place.name + '</h2>' +
        '<div class="price_by_night">' + place.price_by_night +
        '</div>' +
        '</div>' +
        '<div class="information">' +
        '<div class="max_guest">' +
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.max_guest + 'Guests' +
        '</div>' +
        '<div class="number_rooms">' +
        '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.number_rooms + 'Bedrooms' +
        '</div>' +
        '<div class="number_bathrooms">' +
        '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.number_bathrooms + 'Bathroom' +
        '</div>' +
        '</div>' +
        '<div class="description">' +
        place.description +
        '</div>' +
        '</article>');
      });
    }
  });
});
