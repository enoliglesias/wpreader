var RecipeSearchView = function (recipes, service) {

    var recipeSearchListView;

    this.initialize = function() {
        $(document).on('keyup', '.search-key', this.findByName);
        recipeSearchListView = new RecipeSearchListView();
    };

    this.render = function() {
        // We dont want to load any recipe when view is initialized
        recipeSearchListView.render([])
    };

    this.findByName = function() {
        var that = this;
        service.findByName($('.search-key').val()).done(function(recipes) {
            recipeSearchListView.render(recipes);
        });
    };

    this.initialize();
}
