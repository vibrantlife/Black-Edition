$(document).ready(function() {
//end ajax call
$('#id').on('click'(function() {

  $.ajax({
    url: '/',
    type: 'post',
    dataType: 'json',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    },
  })
  .done(function(data) {
    console.log("success", data);
    $('body').prepend(data);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

})



});





