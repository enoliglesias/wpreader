var RecipeView = function(recipe) {

  this.initialize = function() {
    this.$el = $('<div/>');
  };

  this.render = function() {
    this.$el.html(this.template(recipe));
    return this;
  };

  this.initialize();

}
