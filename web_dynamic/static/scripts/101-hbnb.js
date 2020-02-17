const amenities = {};
const states = {};
const cities = {};
let places = {};
let reviews = {};
let users = {};
const searchPlaces = {};
let searchID = [];
$(document).ready(function () {
  $('.amenities input[type="checkbox"]').prop('checked', false);
  $('.container .filters h2 input[type="checkbox"]').prop('checked', false);
  $('.container .filters .popover li input[type="checkbox"]').prop('checked', false);
  $('#api_status').addClass('not_available');
  $('.container .filters h2 input[type="checkbox"]').click(function () {
    const select = '.' + $(this).attr('data-id');
    if ($(this).prop('checked') === true) {
      states[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log($(this).attr('data-id'));
      $(select).prop('checked', true);
    } else {
      const newSelect = $(select);
      Object.entries(newSelect).forEach(([key, value]) => {
        console.log($(value).attr('data-id'));
        delete cities[$(value).attr('data-id')];
      });
      delete states[$(this).attr('data-id')];
      $(select).prop('checked', false);
    }
    $('.locations H4').text('');
    let count = 0;
    Object.entries(states).forEach(([key, value]) => {
      if (count === 0) {
        $('.locations H4').append(value);
      } else {
        $('.locations H4').append(', ');
        $('.locations H4').append(value);
      }
      count += 1;
    });
    Object.entries(cities).forEach(([key, value]) => {
      if (count === 0) {
        $('.locations H4').append(value);
      } else {
        $('.locations H4').append(', ');
        $('.locations H4').append(value);
      }
      count += 1;
    });
  });
  $('.container .filters .locations .popover li input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete cities[$(this).attr('data-id')];
    }
    $('.locations H4').text('');
    let count = 0;
    Object.entries(cities).forEach(([key, value]) => {
      if (count === 0) {
        $('.locations H4').append(value);
      } else {
        $('.locations H4').append(', ');
        $('.locations H4').append(value);
      }
      count += 1;
    });
    Object.entries(states).forEach(([key, value]) => {
      if (count === 0) {
        $('.locations H4').append(value);
      } else {
        $('.locations H4').append(', ');
        $('.locations H4').append(value);
      }
      count += 1;
    });
  });
  $('.amenities input[type="checkbox"]').click(function () {
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
  $('.container .filters button').click(function () {
    $('.places').empty();
    searchID = [];
    Object.entries(amenities).forEach(([key, value]) => {
      searchID.push(key);
    });
    searchPlaces.amenities = searchID;
    searchID = [];
    Object.entries(states).forEach(([key, value]) => {
      searchID.push(key);
    });
    searchPlaces.states = searchID;
    console.log(searchPlaces.states);
    searchID = [];
    Object.entries(cities).forEach(([key, value]) => {
      searchID.push(key);
    });
    searchPlaces.cities = searchID;
    console.log(JSON.stringify(searchPlaces));
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      datatype: 'json',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify(searchPlaces),
      success: function (data) {
        console.log(data);
        places = data;
        places.forEach((place, index) => {
          $('.places').append(
            '<article class="' + place.id + '">' +
        '<div class="title">' +
        '<h2>' + place.name + '</h2>' +
        '<div class="price_by_night">' + place.price_by_night +
        '</div>' +
        '</div>' +
        '<div class="information">' +
        '<div class="max_guest">' +
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.max_guest + ' Guests' +
        '</div>' +
        '<div class="number_rooms">' +
        '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.number_rooms + ' Bedrooms' +
        '</div>' +
        '<div class="number_bathrooms">' +
        '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.number_bathrooms + ' Bathroom' +
        '</div>' +
        '</div>' +
        '<div class="description">' +
            place.description +
            '</div>' +
            '</div> ' +
            '<div class="reviews">' +
            '<div class="title">' +
            '<h2>Reviews</h2>' +
            '<span class="show" id="' + place.id + '">show</span>' +
            '</div>' +
            '</div>' +
            '</article>');
        });
      }
    });
  });
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    datatype: 'json',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    success: function (data) {
      console.log(data);
      places = data;
      places.forEach((place, index) => {
        $('.places').append(
          '<article class="' + place.id + '">' +
        '<div class="title">' +
        '<h2>' + place.name + '</h2>' +
        '<div class="price_by_night">' + place.price_by_night +
        '</div>' +
        '</div>' +
        '<div class="information">' +
        '<div class="max_guest">' +
        '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.max_guest + ' Guests' +
        '</div>' +
        '<div class="number_rooms">' +
        '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.number_rooms + ' Bedrooms' +
        '</div>' +
        '<div class="number_bathrooms">' +
        '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
        '<br />' + place.number_bathrooms + ' Bathroom' +
        '</div>' +
        '</div>' +
        '<div class="description">' +
        place.description +
        '</div>' +
          '</div> ' +
          '<div class="reviews">' +
          '<div class="title">' +
          '<h2>Reviews</h2>' +
          '<span class="show" id="' + place.id + '">show</span>' +
          '</div>' +
          '</div>' +
        '</article>');
      });
    }
  });
  $('.places').on('click', 'span.show', function () {
    const selector = $(this);
    const spanSelect = '.' + $(this).attr('id') + ' span.show';
    if ($(spanSelect).text() === 'show') {
      $(spanSelect).text('hide');
      console.log($(this).attr('id'));
      const reviewId = $(this).attr('id');
      $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/places/' + reviewId + '/reviews',
        success: function (data) {
          console.log(data);
          reviews = data;
          $('.' + reviewId + ' .reviews h2').text(
            reviews.length + ' Reviews'
          );
          reviews.forEach((review, index) => {
            console.log(review.user_id);
            $.ajax({
              type: 'GET',
              url: 'http://0.0.0.0:5001/api/v1/users/' + review.user_id,
              success: function (data) {
                users = data;
                console.log('************************');
                console.log(reviews);
                console.log(users);
                console.log(users.first_name);
                console.log(selector);
                $(selector).parent().parent().append(
                  '<div class="reviewsContent>"' +
                  '<ul>' +
                '<li>' +
                '<h3>' + users.first_name + ' ' + users.last_name + ' ' + review.created_at.substring(0, 11) + '</h3>' +
                '<p>' + review.text + '</p>' +
                '</li>' +
                '</ul>' +
                '</div>');
              }
            });
          });
        }
      });
    } else {
      $(spanSelect).text('show');
      $(spanSelect).parent().nextAll().empty();
    }
  });
});
