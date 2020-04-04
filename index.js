var express = require('express'),
  config = require('./config/config');

var app = express();
require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Boogalu listening on port ' + config.port);
});

