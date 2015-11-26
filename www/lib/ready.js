$(document).ready(function() {

  BVB.init();

  $(document).on("click", "#menu a", function() {
    href = $(this).attr("href");
    window.location.hash = href;
  });

  $(document).on("click", ".fav-star", function() {
    var recipe_id = $(this).data("recipe-id");
    var fav_span = BVB.getFavSpan(recipe_id);
    $("span[data-recipe-id=" + recipe_id + "]").replaceWith(fav_span);
  });

  $(document).on("click", "#burger_button", function(e) {
    $("#menu").data( "mmenu" ).open();
  });

});
