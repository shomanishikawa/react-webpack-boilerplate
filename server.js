var fs = require('fs');
var path = require('path');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var app = express();

var isDevelopment = (process.env.NODE_ENV !== 'production');
var config = require('./webpack.config');
var compiler = webpack(config)

var STATIC_PATH = path.join(__dirname, 'public');
var COMMENTS_FILE = path.join(__dirname, 'comments.json');


if (isDevelopment) {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

app.use(express.static(STATIC_PATH));

// app.get('/', function (req, res) {
//     res.sendFile('index.html', {
//       root: STATIC_PATH
//     });
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.listen(process.env.PORT || 1979, function (err) {
  if (err) { console.log(err) };
  console.log('server listening on port', process.env.PORT || 1979);
});
