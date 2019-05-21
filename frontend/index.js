var express = require('express');
var app = express();

app.set("view options", {
  layout: false
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('/public/user.html');
});

app.listen(8000)