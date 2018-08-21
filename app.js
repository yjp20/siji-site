const debug = require('debug')('siji-site:app');
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const config = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
app.locals.basedir = path.resolve(__dirname, 'templates');
app.locals.prefix = config.prefix;

app.use(helmet());
app.use(config.prefix, require('./router'));

app.listen(config.port, () => {
  debug(`listening on port ${config.port}`);
});
