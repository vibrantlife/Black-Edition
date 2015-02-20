$(document).ready(function() {
//end ajax call
});


function appendTosomeShit() {
  $.get('/arson', function(data) {
    $('#section').append(data)
  });

}
