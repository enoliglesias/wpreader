(function () {

    // Variables

    var service = new RecipeService();

    // Templates

    RecipeListView.prototype.template =  Handlebars.compile($("#recipe-list-tpl").html());
    RecipeView.prototype.template = Handlebars.compile($("#recipe-tpl").html());
    FavListView.prototype.template = Handlebars.compile($("#fav-list-tpl").html());

    // Helpers

    Handlebars.registerHelper('recipeDate', function(date) {
     return moment(date).format("DD [de] MMMM [de] YYYY");
    });

    Handlebars.registerHelper('tagCloud', function() {
      var taxonomies = _([this.tags,  this.categories]).flatten();
      taxonomies = _((taxonomies)).pluck("name").sort();
      return _(taxonomies).map(function(tag){
        return '<a href="#search/#' + tag + '" class="tag-link" data-tag-name="' + tag + '"><span class="tag">' + tag + '</span></a>';
      }).join("");
    });

    Handlebars.registerHelper('parsedContent', function(content_text) {
      content_text = content_text.replace("src=\"\/\/", "src=\"https:\/\/");
      content_text = content_text.replace(/(youtube.*width=\")(.*)(\" hei.*)/,"$1100%$3");
      return content_text;
    });

    Handlebars.registerHelper('recipeImage', function(image_id) {
      var recipe_image = _.find(recipe_images, function(image){ return image.id == image_id; });
      var recipe_image_url = recipe_image ? recipe_image.source_url : "img/no-image.jpg";
      return recipe_image_url ? '<img class="list-image-recipe" src="' + recipe_image_url +'"/>' : "";
    });

    Handlebars.registerHelper('recipeImageThumbnail', function(image_id) {
      var recipe_image = _.find(recipe_images, function(image){ return image.id == image_id; });
      var recipe_image_url = "img/no-image.jpg";
      if(recipe_image && recipe_image.media_details.sizes.tinyfeatured){
        recipe_image_url = recipe_image.media_details.sizes.tinyfeatured.source_url;
      }else if (recipe_image && recipe_image.media_details.sizes.thumbnail){
        recipe_image_url = recipe_image.media_details.sizes.thumbnail.source_url;
      }
      return recipe_image_url ? '<img class="list-image-recipe" src="' + recipe_image_url +'"/>' : "";
    });

    Handlebars.registerHelper('recipeImageUrl', function(image_id) {
      var recipe = _.find(recipe_images, function(recipe){ return recipe.id == image_id; });
      var recipe_url = recipe ? recipe.source_url : null;
      return recipe_url ? recipe_url : "";
    });

    Handlebars.registerHelper('recipeFav', function(recipe_id) {
      return BVB.getFavSpanOnLoad(recipe_id);
    });

    // Routes


    service.initialize().done(function () {
      router.addRoute('', function() {
        current_page = 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        BVB.activateMenu("home");
        service.printRecipes();
      });

      router.addRoute('recipes/:id', function(id) {
          service.findById(parseInt(id)).done(function(recipe) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            BVB.deactivateAllMenu();
            BVB.deactivateSettings();
            $('#content').html(new RecipeView(recipe).render().$el);
          });
      });

      router.addRoute('search', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        BVB.activateMenu("search");
        $('#content').load("search.html");
      });

      router.addRoute('search/:tag', function(tag) {
        $('#content').load("search.html");
        BVB.activateMenu("search");
        setTimeout(function(){
          $(".search-key").attr("value", tag);
          $(".search-key").keyup();
         }, 100);
      });

      router.addRoute('about', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        BVB.activateMenu("about-me");
        $('#content').load("about.html");
      });

      router.addRoute('contact', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        BVB.activateMenu("contact");
        $('#content').load("contact.html");
      });

      router.addRoute('favs', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        BVB.activateMenu("favs");
        new FavListView(recipes).render().$el;
      });

      router.addRoute('settings', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        BVB.deactivateAllMenu();
        BVB.activateSettings();
        $('#content').load("settings.html");
      });

      router.start();
    });

}());
