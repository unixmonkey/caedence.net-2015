module.exports = function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  next();
};
