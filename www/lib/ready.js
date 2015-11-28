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

  $(document).on("click", "#send_contact_form", function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'url',
        dataType: 'json',
        crossDomain: false,
        username:'api',
        password: btoa('mailgun-key'),
        data: {
                from: 'Foo Bar <foo@bar.com>',
                to: "user@email.com",
                subject: 'Hello',
                text: 'Hi!',
              },
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Basic " + btoa("api:mailgun-key"));
        },
        success:function(data){
        },
        error:function(data){
        }
    });
  });

});
