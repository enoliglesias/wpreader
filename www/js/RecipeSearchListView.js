var RecipeSearchListView = function () {

    this.initialize = function() {
        this.$el = $('#search-content');
    };

    this.render = function(recipes) {
        this.$el.html(this.template(recipes));
        return this;
    };

    this.initialize();

}
