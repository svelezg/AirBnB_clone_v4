const amenities = {};
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
});
