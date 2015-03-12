$(document).ready(function() {
  $(function(){
    var $email = $('#email');
    var $pass = $('#password');
    var $button = $('.index_main_body input[type=submit]');

    $button.click(function(){
      var e = $email.val();
      var p = $pass.val();
      if (e && p) //only testing they've been entered
      {
        $email.removeClass('invalid');
        $pass.removeClass('invalid');
      } else {
        $email.addClass('invalid');
        $pass.addClass('invalid');
      }
    });
  });

  $('body').on('click', 'table', function showWidget(event){
    event.preventDefault();
    var id = $(this).attr('id');
    $.ajax({
      url: '/s/books/elementary/widget',
      type: 'GET',
      dataType: 'json',
      data: {id: id},
    })
    .done(function(data) {
      console.log("success", data.widget);
      // $("#"+data.widget+"")

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  });

  $('#elementary').on('click', '.btn', function showBooks(event) {
    event.preventDefault();
    console.log(this);
    $.ajax({
      url: '/s/books/elementary',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      console.log("success", data);

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  })




});
