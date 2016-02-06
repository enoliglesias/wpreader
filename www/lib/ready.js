$(document).ready(function() {

  BVB.init();

  $(window).scroll(function(){
    if(location.hash === "" && $(window).scrollTop() > $(document).height() - $(window).height() - 150){
      BVB.printNextPage();
    }
  });

  $(document).on("click", ".tag-link", function(e){
    e.preventDefault();
    var tag = $(this).data("tag-name");
    $("#search")[0].click();
    setTimeout(function(){
      $(".search-key").attr("value", "#" + tag);
      $(".search-key").keyup();
     }, 100);
  });

  $(document).on("click", ".toggle-link", function(e) {
    e.preventDefault();
    var image_url = $(".social-toggle-content").is(':visible') ? "img/share.svg" : "img/share_active.svg";
    $(".toggle-link img").attr("src", image_url);
    $(".social-toggle-content").toggle();
  });

  $(document).on("click", ".fav-star", function() {
    var recipe_id = $(this).data("recipe-id");
    var fav_span = BVB.getFavSpan(recipe_id);
    $("span[data-recipe-id=" + recipe_id + "]").replaceWith(fav_span);
  });

  $(document).on("click", "#send_contact_form", function(e){
    var attributes_arr = _($("#contact_form").serializeArray());
    var value_arr = attributes_arr.pluck("value");
    if (_(value_arr).includes("")){
      navigator.notification.alert("Por favor, rellena todos los campos.", BVB.emptyFunction, "Rellenar campos", "Aceptar");
      return false;
    }
    e.preventDefault();
    BVB.showSpinner();
    $.ajaxSetup({
       beforeSend: function(xhr) {
           xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
           xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
       }
    });

    $.ajax({
       type: 'GET',
       url: Settings.send_email_endpoint,
       data: {
               bvb: btoa(Settings.send_email_password + _(attributes_arr).find({name: "email"}).value),
               name: _(attributes_arr).find({name: "name"}).value,
               from: _(attributes_arr).find({name: "email"}).value,
               comment: _(attributes_arr).find({name: "comment"}).value,
             },
    })
    .always(function(){
      $("input[type=text], textarea").val("");
      BVB.hideSpinner();
      navigator.notification.alert("¡Tu mensaje ha sido enviado, gracias!", BVB.emptyFunction, "Mensaje enviado", "Aceptar");
    });
  });

//######## SETTINGS

  $(document).on("click", "#setting-close", function(e){
    e.preventDefault();
    navigator.app.exitApp();
  });

  function onReset(buttonIndex) {
    if (buttonIndex === 1) {
      _(["favs", "recipes", "recipe_images", "registered", "last_updated"]).map(function(item){
        localStorage.removeItem(item);
      });
    }
  }

  $(document).on("click", "#setting-reset", function(e){
    e.preventDefault();
    navigator.notification.confirm(
        '¿Eliminar los datos almacenados?',
         onReset,
        'Eliminar datos',
        ['Aceptar','Cancelar']
    );
  });



  $(document).on("click", "#setting-info", function(e){
    e.preventDefault();
    navigator.notification.alert("Aplicación móvil del blog Begin Vegan Begun.\nVersión: 1.0.0", BVB.emptyFunction, "Sobre la aplicación", "Aceptar");
  });

});
