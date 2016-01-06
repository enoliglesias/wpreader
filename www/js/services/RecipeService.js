var RecipeService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        var deferred = $.Deferred();
        var recipe = null;
        var l = recipes.length;
        for (var i=0; i < l; i++) {
            if (recipes[i].id === id) {
                recipe = recipes[i];
                break;
            }
        }
        deferred.resolve(recipe);
        return deferred.promise();
    }

    this.findByName = function(searchKey) {
        var deferred = $.Deferred();
        var results = recipes.filter(function(element) {
            var title = element.title.rendered;
            return title.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        // Return no recipes when search key is empty
        results = searchKey.length === 0 ? [] : results;
        deferred.resolve(results);
        return deferred.promise();
    }


    this.printRecipes = function() {
      $(".splash").show();

      recipes = localStorage.getObj("recipes") || [];
      recipe_images = localStorage.getObj("recipe_images") || [];
      last_updated = localStorage.getObj("last_updated") || "1984-01-01";

      var recipes_filter = "filter[date_query][after]=" + last_updated + "&per_page=3333";
      var recipe_images_filter = "filter[date_query][after]=" + last_updated + "&per_page=3333";
      $.ajaxSetup({
          beforeSend: function(xhr) {
              xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
          }
      });

      var recipes_call = $.ajax({
        type: 'GET',
        url: Settings.wp_posts_endpoint + "?" + recipes_filter,
        crossDomain: true,
        dataType: 'json',
        success:function(data){
          console.log("Recipes loaded");
        },
          error:function(){
          console.log("Error loading recipes");
        }
      });

      var images_call = $.ajax({
           type: 'GET',
           url: Settings.wp_images_endpoint + "?" + recipe_images_filter,
           crossDomain: true,
           dataType: 'json',
           success:function(data){
              console.log("Images loaded");
           },
           error:function(){
               console.log("Error loading images");
           }
      });

      $.when(recipes_call, images_call).then(function (recipes_response, images_response) {
        var new_recipes = recipes_response[0];
        recipes.unshift(new_recipes);
        recipes = _(_(recipes).flatten()).uniq(false, function(recipe){ return recipe.id; });
        localStorage.setObj("recipes", recipes);

        var new_recipe_images = images_response[0];
        recipe_images.unshift(new_recipe_images);
        recipe_images = _(_(recipe_images).flatten()).uniq(false, function(recipe_img){ return recipe_img.id; });
        localStorage.setObj("recipe_images", recipe_images);
      })
      .always(function(){
        var recipes_in_home = Settings.recipes_in_home;
        if(recipes){
          last_updated = moment().subtract(1, "days").format("YYYY-MM-DD");
          localStorage.setObj("last_updated", last_updated);

          new RecipeListView(recipes.slice(0,recipes_in_home - 1)).render().$el;
          $(".splash").hide();
        }else{
          $(".splash-error").fadeIn(800);
        }
      })
      .fail(function(){
        alert("Hubo algún error al intentar actualizar las recetas.");
      });

    }
}
