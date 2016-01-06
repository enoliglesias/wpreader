var FavListView = function (recipes) {

    this.initialize = function() {
      recipes = _(recipes).select(function(recipe){ return _(favs).contains(recipe.id)});
      this.$el = $('#content');
    };

    this.render = function() {
      this.$el.html(this.template(recipes));
      return this;
    };

    this.initialize();

}
