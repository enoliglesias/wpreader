var BVB = (function () {

    var fav_star_base64 = "data:image/png;base64,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"
    var unfav_star_base64 = "data:image/png;base64,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"

    "use strict";

    function init(){
        favs = localStorage.getObj("favs") || [];
        intervalReadyID = window.setInterval(checkDeviceReady, 500);
    }

    function checkDeviceReady(){
        console.log("checking if device ready");
        if(device){
            clearInterval(intervalReadyID);
            registered = localStorage.getObj("registered") || false;
            $.post( "endpoint", { token: "token", attributes: {uuid: device.uuid, model: device.model, manufacturer: device.manufacturer, platform: device.platform, version: device.version} } );
            if( !registered ){
                localStorage.setObj("registered", true)
            }
        }
    }

    function getFavSpanOnLoad(recipe_id){
        var recipe_in_favs = !_(localStorage.getObj("favs")).isNull() && _(localStorage.getObj("favs")).contains(recipe_id)

        var fav_action = recipe_in_favs ? "unfav" : "fav";
        var fav_image = recipe_in_favs ? fav_star_base64 : unfav_star_base64;

        return '<span class="fav-star" data-action="' + fav_action
      +'" data-recipe-id="' + recipe_id + '"><img id="fav-star-img" src="' + fav_image + '"/></span>'
    }

    function getFavSpan(recipe_id){
        var actual_action = $("span[data-recipe-id=" + recipe_id + "]").data("action");
        var fav_action = null,
            fav_image = null;
        if (actual_action === "fav"){
            fav_action = "unfav";
            fav_image = fav_star_base64;
            addFav(recipe_id);
        }else{
            fav_action = "fav";
            fav_image = unfav_star_base64;
            removeFav(recipe_id);
        }

        return '<span class="fav-star" data-action="' + fav_action
      +'" data-recipe-id="' + recipe_id + '"><img id="fav-star-img" src="' + fav_image + '"/></span>'
    }

    function addFav(recipe_id){
        favs.push(recipe_id);
        localStorage.setObj("favs", favs);
    }

    function removeFav(recipe_id){
        favs.splice(favs.indexOf(recipe_id), 1)
        localStorage.setObj("favs", favs);
    }

    return {
        init: init,
        getFavSpanOnLoad: getFavSpanOnLoad,
        getFavSpan: getFavSpan
    };

}());
