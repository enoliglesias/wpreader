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

  $(document).on("click", "#close_menu_cross", function(){
    var api = $("#menu").data( "mmenu" );
    api.close();
  });

  $(document).on("click", "#send_contact_form", function(e){
    var attributes_arr = _($("#contact_form").serializeArray())
    var value_arr = attributes_arr.pluck("value");
    if (_(value_arr).includes("")){
      alert("Por favor, rellena todos los campos.");
      return false;
    }
    e.preventDefault();

    $.ajaxSetup({
       beforeSend: function(xhr) {
           xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
           xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
       }
    });

    $.ajax({
       type: 'GET',
       url: 'endpoint',
       data: {
               name: _(attributes_arr).find({name: "name"}).value,
               from: _(attributes_arr).find({name: "email"}).value,
               comment: _(attributes_arr).find({name: "comment"}).value,
             },
    })
    .always(function(){
      $("input[type=text], textarea").val("");
      alert("¡Tu mensaje ha sido enviado, gracias!");
    });
  });

});
