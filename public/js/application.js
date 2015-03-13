$(document).ready(function() {
  //registration styling
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

  //registration slidetoggle
  $("#registration").hide(function(){
    $(".index_register button").on('click', function(){
      $('#registration').slideToggle('slow');
    })
  });

  // display book covers for elementary
  $('#sidebar').on('click', '#elementary', function showElementary(event) {
    event.preventDefault();
    var elemIdentifier = $(this).attr('span');
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
        $("#book_container").append("<img src='" + data[i].img_url + " 'id = '"+ data[i].id + "' class='img_widget'>" );
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  })

  //display book covers for teens
  $('#sidebar').on('click', '#teens', function showTeens(event){
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
    })
  });

  //popular
  $('#sidebar').on('click', '#popular', function showPop(event){
    event.preventDefault();
    var popIdentifier = $(this).attr('p');
    $.ajax({
      url: '/s/books/popular',
      type: 'GET',
      dataType: 'json',
      data: {id: popIdentifier},
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
    })
  });

    //detective display
    $('#sidebar').on('click', '#detective', function showDet(event){
    event.preventDefault();
    var detIdentifier = $(this).attr('p');
    $.ajax({
      url: '/s/books/detective',
      type: 'GET',
      dataType: 'json',
      data: {id: detIdentifier},
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
    })
  });

  //display widget for all books
  $('#book_container').on('click', 'img', function showWidget(event){
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
      console.log("success");
      $("#widget").empty();
      $("#widget").append(data.widget)
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  })



// documentready close
});
