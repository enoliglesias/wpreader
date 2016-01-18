var recipes = null;
var recipe_images = null;
var favs = [];
var interval_ready_id = null;
var registered = false;
var last_updated = "1984-01-01";
var application_started = false;
var menu_options = ["home", "search", "favs", "about-me", "contact"];

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};
