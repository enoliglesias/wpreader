var BVB = (function () {

    "use strict";

    function emptyFunction(){
      return true;
    }

    function init(){
        favs = localStorage.getObj("favs") || [];
        registered = localStorage.getObj("registered") || false;
        if( Settings.register_devices && !registered ){
            interval_ready_id = window.setInterval(checkDeviceReady, 500);
        }
    }

    function checkDeviceReady(){
        if(device){
            clearInterval(interval_ready_id);
            if( !registered ){
                $.post( Settings.pushificator_endpoint, { token: Settings.pushificator_token, attributes: {uuid: device.uuid, model: device.model, manufacturer: device.manufacturer, platform: device.platform, version: device.version} } )
                .success(function(){
                    registered = true;
                    localStorage.setObj("registered", true);
                });
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

    function deactivateMenu(menu_point){
        $(".menu-option." + menu_point + " > img").attr("src", "img/" + menu_point + ".svg");
    }

    function deactivateAllMenu(){
        _(menu_options).each(function(point){
            deactivateMenu(point);
        });
    }

    function deactivateSettings(){
        $(".settings-link > img").attr("src", "img/settings.svg");
    }

    function activateMenu(menu_point){
        deactivateAllMenu();
        deactivateSettings();
        $(".menu-option." + menu_point + " > img").attr("src", "img/" + menu_point + "_active.svg");
    }

    function activateSettings(){
        deactivateAllMenu();
        $(".settings-link > img").attr("src", "img/settings_active.svg");
    }

    function printNextPage(){
        var first_index = Settings.recipes_in_home * current_page;
        var last_index = first_index + Settings.recipes_in_home - 1;
        var template = Handlebars.compile("{{#each this}}<li class='table-view-cell media recipe-row'><div class='media-body'><p><a class='large-title-link' href='#recipes/{{ id }}'>{{ title.rendered }}</a>{{{ recipeFav id }}}</p><a href='#recipes/{{ id }}'>{{{ recipeImage featured_image }}}</a><span class='recipe-date-home'>{{ recipeDate date }}</span></div></li>{{/each}}");
        var recipes_to_print = recipes.slice(first_index, last_index);
        var raw_recipes_html = template(recipes_to_print);
        $(".table-view.recipe-table.large").append(raw_recipes_html);
        current_page += 1;
    }

    function showSpinner(){
        $(".loading").show();
    }

    function hideSpinner(){
        $(".loading").hide();
    }

    return {
        init: init,
        getFavSpanOnLoad: getFavSpanOnLoad,
        getFavSpan: getFavSpan,
        activateMenu: activateMenu,
        deactivateMenu: deactivateMenu,
        deactivateAllMenu: deactivateAllMenu,
        printNextPage: printNextPage,
        deactivateSettings: deactivateSettings,
        activateSettings: activateSettings,
        emptyFunction: emptyFunction,
        showSpinner: showSpinner,
        hideSpinner: hideSpinner
    };

}());
