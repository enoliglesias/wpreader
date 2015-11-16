var RecipeListView = function (recipes) {

    this.initialize = function() {
        this.$el = $('#content');
        if(recipes[0] !== undefined)
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
