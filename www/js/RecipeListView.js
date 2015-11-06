var RecipeListView = function () {

    var recipes;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setRecipes = function(list) {
        recipes = list;
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(recipes));
        return this;
    };

    this.initialize();

}
