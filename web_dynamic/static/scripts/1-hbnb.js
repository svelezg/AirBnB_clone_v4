const amenities = {};
$(document).ready(function () {
  $('input[type="checkbox"]').click(function(){
    if($(this).prop("checked") === true){
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if($(this).is(":not(:checked)")){
      delete amenities[$(this).attr('data-id')];
    }
    console.log(amenities.length);
    $('.amenities H4').text('');
    let count = 0
    for (item in  amenities) {
      if (count > 0) {
        $('.amenities H4').append(', ');
      }
      $('.amenities H4').append(amenities[item]);
      count += 1;
    }

  });
});

