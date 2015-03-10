$(document).ready(function() {
  $(function(){
    var $email = $('#email');
    var $pass = $('password');
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
});
