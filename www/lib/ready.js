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
      alert("Por favor, rellena todos los campos :)");
      return false;
    }
    e.preventDefault();

    $.ajax({
       type: 'GET',
       url: 'endpoint',
       beforeSend: function(xhr) {
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
       },
       data: {
               name: _(attributes_arr).find({name: "name"}).value,
               from: _(attributes_arr).find({name: "email"}).value,
               to: "your@email.com",
               comment: _(attributes_arr).find({name: "comment"}).value,
             },
       always:function(data){
        $("input[type=text], textarea").val("");
       },
    });
  });

});
