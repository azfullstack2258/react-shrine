const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const { createServer } = require('http');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const User = require('./models/user');
const schema = require('./graphql/schema');
const pubsub = require('./graphql/pubSub');
const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const WS_PORT = 5000;
const WS_GQL_PATH = '/subscriptions';

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

const app = express();
app.use(cookieParser());
app.use(cors(), bodyParser.json());

app.use(
  '/graphql',
  expressGraphQL(async request => ({
    schema,
    context: await (async () => {
      const { token } = request.cookies;
      const user = await User.findByToken(token);
      return { user, pubsub };
    })(),
    graphiql: true
  }))
);
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '../client/public'),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
