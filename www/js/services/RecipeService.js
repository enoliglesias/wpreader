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

        $.ajax({
             type: 'GET',
             url:"http://beginveganbegun.es/wp-json/wp/v2/posts",
             crossDomain: true,
             dataType: 'json',
             success:function(data){
                recipes = data;
                new RecipeListView(recipes).render().$el;
                $(".splash").hide();
                console.log("Recipes loaded");
             },
             error:function(){
                 console.log("Error loading recipes");
             }
        });
      }else{
        new RecipeListView(recipes).render().$el;
      }
    }
}
