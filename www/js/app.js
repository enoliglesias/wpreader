(function () {

    // Variables

    var service = new RecipeService();

    // Templates

    RecipeListView.prototype.template =  Handlebars.compile($("#recipe-list-tpl").html());
    RecipeView.prototype.template = Handlebars.compile($("#recipe-tpl").html());
    FavListView.prototype.template = Handlebars.compile($("#fav-list-tpl").html());

    // Helpers

    Handlebars.registerHelper('recipeImage', function(image_id) {
      var recipe = _.find(recipe_images, function(recipe){ return recipe.id == image_id; })
      var recipe_url = recipe ? recipe.source_url : null;
      return recipe_url ? '<img class="list-image-recipe" src="' + recipe_url +'"/>' : "";
    });

    Handlebars.registerHelper('recipeImageUrl', function(image_id) {
      var recipe = _.find(recipe_images, function(recipe){ return recipe.id == image_id; })
      var recipe_url = recipe ? recipe.source_url : null;
      return recipe_url ? recipe_url : "";
    });

    Handlebars.registerHelper('recipeFav', function(recipe_id) {
      return BVB.getFavSpanOnLoad(recipe_id);
    });

    // Routes


    service.initialize().done(function () {
      router.addRoute('', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        service.printRecipes();
      });

      router.addRoute('recipes/:id', function(id) {
          service.findById(parseInt(id)).done(function(recipe) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            $('#content').html(new RecipeView(recipe).render().$el);
          });
      });

      router.addRoute('search', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#content').load("search.html");
      });

      router.addRoute('about', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#content').load("about.html");
      });

      router.addRoute('salad-recipe-list', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#content').load("recipe-list.html");
      });

      router.addRoute('contact', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#content').load("contact.html");
      });

      router.addRoute('favs', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        new FavListView(recipes).render().$el;
      });

      router.start();
    });

}());
