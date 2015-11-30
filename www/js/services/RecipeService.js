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
        results = searchKey.length == 0 ? [] : results;
        deferred.resolve(results);
        return deferred.promise();
    }


    this.printRecipes = function() {
      if(recipes === null){
        $(".splash").show();
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
            }
        });

        var recipes_call = $.ajax({
          type: 'GET',
          url:"http://beginveganbegun.es/wp-json/wp/v2/posts?per_page=3333",
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
             url:"http://beginveganbegun.es/wp-json/wp/v2/media?per_page=3333",
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
          recipes = recipes_response[0];
          recipe_images = images_response[0];
          new RecipeListView(recipes.slice(0,9)).render().$el;
          $(".splash").hide();

        });
      }else{
        new RecipeListView(recipes).render().$el;
      }

    }
}
