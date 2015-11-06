var HomeView = function (service) {

  var recipeListView;

  this.initialize = function () {
    // Define a div wrapper for the view (used to attach events)
    this.$el = $('<div/>');
    this.$el.on('keyup', '.search-key', this.findByName);
    recipeListView = new RecipeListView();
    this.render();
  };

  this.render = function() {
    this.$el.html(this.template());
    $('.content', this.$el).html(recipeListView.$el);
    return this;
  };

  this.findByName = function() {
    service.findByName($('.search-key').val()).done(function(recipes) {
      recipeListView.setRecipes(recipes);
    });
  };

  this.initialize();

}
