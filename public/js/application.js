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

  $('#elementary').on('click', '.graphite-flat-button', function showElementary(event) {
    event.preventDefault();
    var elemIdentifier = $(this).attr('p');
    $.ajax({
      url: '/s/books/elementary',
      type: 'GET',
      dataType: 'json',
      data: {id: elemIdentifier}
    })
    .done(function(data) {
      console.log("success", data);
      $("#book_container").empty();
      for (var i = 0; i < data.length; ++i) {
        $('#book_container').append("<img src='" +  data[i].img_url + " 'id = '"+ data[i].id +"'>" );
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  })

  $('#teens').on('click', '.graphite-flat-button', function showTeens(event){
    event.preventDefault();
    var teenIdentifier = $(this).attr('p');
    $.ajax({
      url: '/s/books/teens',
      type: 'GET',
      dataType: 'json',
      data: {id: teenIdentifier},
    })
    .done(function(data) {
      console.log("success");
      $("#book_container").empty();
      for (var i=0; i < data.length; ++i) {
        $("#book_container").append("<img src='" + data[i].img_url + " 'id = '"+ data[i].id + "' class='img_widget'>" );
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    $('#book_container').on('click', 'img', function teenWidget(event){
      event.preventDefault();
      var widgetFinder = $(this).attr('id')
      console.log(widgetFinder);
      $.ajax({
        url: '/s/books/widget',
        type: 'GET',
        dataType: 'JSON',
        data: {id: widgetFinder},
      })
      .done(function(data) {
        console.log("success", data.widget);
        $("#widget").append(data.widget)
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });

    })

  })



// documentready close
});
