var express = require('express'),
    path = require('path'),
    app = express(),
    mormalmidi = require('mormalmidi');

mormalmidi.init();

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});