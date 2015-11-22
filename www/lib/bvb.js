var BVB = (function () {

    "use strict";

    function getFavSpanOnLoad(recipe_id){
        var fav_action = _.contains(favs, recipe_id) ? "unfav" : "fav";
        var fav_image = _.contains(favs, recipe_id) ? "img/fav.png" : "img/unfav.png";

        return '<span class="fav-star" data-action="' + fav_action
      +'" data-recipe-id="' + recipe_id + '"><img id="fav-star-img" src="' + fav_image + '"/></span>'
    }

    function getFavSpan(recipe_id){
        var action = $("span[data-recipe-id=" + recipe_id + "]").data("action")
        var fav_action = (action === "fav") ? "unfav" : "fav";
        var fav_image = (action === "fav") ? "img/fav.png" : "img/unfav.png";

        return '<span class="fav-star" data-action="' + fav_action
      +'" data-recipe-id="' + recipe_id + '"><img id="fav-star-img" src="' + fav_image + '"/></span>'
    }

    return {
        getFavSpanOnLoad: getFavSpanOnLoad,
        getFavSpan: getFavSpan
    };

}());
