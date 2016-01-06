var BVB = (function () {

    "use strict";

    function init(){
        favs = localStorage.getObj("favs") || [];
        registered = localStorage.getObj("registered") || false;
        if( !registered ){
            interval_ready_id = window.setInterval(checkDeviceReady, 500);
        }
    }

    function checkDeviceReady(){
        if(device){
            clearInterval(interval_ready_id);
            if( !registered ){
                $.post( Settings.pushificator_endpoint, { token: Settings.pushificator_token, attributes: {uuid: device.uuid, model: device.model, manufacturer: device.manufacturer, platform: device.platform, version: device.version} } );
                registered = true;
                localStorage.setObj("registered", true);
            }
        }
    }

    function getFavSpanOnLoad(recipe_id){
        var recipe_in_favs = !_(localStorage.getObj("favs")).isNull() && _(localStorage.getObj("favs")).contains(recipe_id);

        var fav_action = recipe_in_favs ? "unfav" : "fav";
        var fav_image = recipe_in_favs ? Settings.fav_star_base64 : Settings.unfav_star_base64;

        return '<span class="fav-star" data-action="' + fav_action +
        '" data-recipe-id="' + recipe_id + '"><img id="fav-star-img" src="' + fav_image + '"/></span>';
    }

    function getFavSpan(recipe_id){
        var actual_action = $("span[data-recipe-id=" + recipe_id + "]").data("action");
        var fav_action = null,
            fav_image = null;
        if (actual_action === "fav"){
            fav_action = "unfav";
            fav_image = Settings.fav_star_base64;
            addFav(recipe_id);
        }else{
            fav_action = "fav";
            fav_image = Settings.unfav_star_base64;
            removeFav(recipe_id);
        }

        return '<span class="fav-star" data-action="' + fav_action +
        '" data-recipe-id="' + recipe_id + '"><img id="fav-star-img" src="' + fav_image + '"/></span>';
    }

    function addFav(recipe_id){
        favs.push(recipe_id);
        localStorage.setObj("favs", favs);
    }

    function removeFav(recipe_id){
        favs.splice(favs.indexOf(recipe_id), 1);
        localStorage.setObj("favs", favs);
    }

    return {
        init: init,
        getFavSpanOnLoad: getFavSpanOnLoad,
        getFavSpan: getFavSpan
    };

}());
