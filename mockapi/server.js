const pause = require('connect-pause');
const jsonServer = require('json-server');
const server = jsonServer.create();
const routes = require('./router')();
const router = jsonServer.router(routes);
const middlewares = jsonServer.defaults();
const moreMiddlewares = require('./middleware');
const rewriterRoutes = require('./rewriter.json');
const rewriter = jsonServer.rewriter(rewriterRoutes);

const APP_PORT = process.env.PORT || 8080;
const APP_HOST = process.env.HOST || 'localhost';

server.use(middlewares);
server.use(moreMiddlewares);
server.use(rewriter);
server.use(router);
server.use(pause(500));

server.listen(APP_PORT);

console.log(`Mock Server started at http://${APP_HOST}:${APP_PORT}/api`);
