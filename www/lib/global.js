var recipes = null;
var recipe_images = null;
var favs = [];
var interval_ready_id = null;
var registered = false;

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
}
