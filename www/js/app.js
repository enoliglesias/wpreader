(function () {

    RecipeListView.prototype.template =  Handlebars.compile($("#recipe-list-tpl").html());
    RecipeView.prototype.template = Handlebars.compile($("#recipe-tpl").html());

    Handlebars.registerHelper('recipe_image', function(image_id) {
      var recipe_url = _.find(recipe_images, function(recipe){ return recipe.id == image_id; }).source_url;
      return '<img src="' + recipe_url +'"/>'
    });

    var service = new RecipeService();
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

      router.addRoute('about', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#content').load("about.html");
      });

      router.addRoute('recipe-list', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        $('#content').load("recipe-list.html");
      });

      router.start();
    });

}());
