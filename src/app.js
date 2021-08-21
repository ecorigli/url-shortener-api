const http = require('http');
const connectDatabase = require('./config/db');
const express = require('express');
const config = require('./config');
const httpContext = require('express-http-context');
const cors = require('cors');

const { errorHandler } = require('./middleware/errorHandler');
const { notFoundHandler } = require('./middleware/notFoundHandler');

const routes = require('./routes');
const events = require('./events.js');
const bodyParser = require('body-parser');

const { port } = config.server;

const app = express();
app.use(cors());
connectDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(httpContext.middleware);

const server = http.createServer(app);

app.use('/', routes);
app.use('*', notFoundHandler);
app.use(errorHandler);

app.listen(port, async () => events.onListen(port));

server.on('error', events.onServerError);
