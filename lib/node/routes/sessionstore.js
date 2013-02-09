module.exports = function sessionStoreRouteInit(opts) {
  var routes = {};

  routes.root = function(req, res) {
    res.render('index.jade');
  };

  return routes;
}
