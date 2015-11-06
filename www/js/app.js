// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    RecipeListView.prototype.template =  Handlebars.compile($("#recipe-list-tpl").html());
    RecipeView.prototype.template = Handlebars.compile($("#recipe-tpl").html());

    var service = new RecipeService();
    service.initialize().done(function () {
      router.addRoute('', function() {
          $('body').html(new HomeView(service).render().$el);
      });

      router.addRoute('recipes/:id', function(id) {
          service.findById(parseInt(id)).done(function(recipe) {
              $('body').html(new RecipeView(recipe).render().$el);
          });
      });

      router.start();
    });



    /* --------------------------------- Event Registration -------------------------------- */

    /* ---------------------------------- Local Functions ---------------------------------- */

}());
