const amenities = {};
$(document).ready(function () {
  $('input[type="checkbox"]').click(function () {
    if ($(this).prop('checked') === true) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
        delete amenities[$(this).attr('data-id')];
    }
       $('.amenities H4').text('');
        let count = 0;
        Object.entries(amenities).forEach(([key, value]) => {
            if (count === 0){
            $('.amenities H4').append(value);
            } else {
                $('.amenities H4').append(', ');
                $('.amenities H4').append(value);
            }
            count += 1;

    });
  });
});
