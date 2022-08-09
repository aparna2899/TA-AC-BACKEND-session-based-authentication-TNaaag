var express = require('express');
var cookieparser = require('cookie-parser');

var app = express();

app.use(cookieparser());

app.use('/', (req, res) => {
  res.cookie('name', 'Aparna');
  res.end('Welcome');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
