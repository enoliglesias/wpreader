$(document).ready(function() {

  $(document).on( "click", "#menu a", function() {
    href = $(this).attr("href");
    window.location.hash = href;
  });

});
