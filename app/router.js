import { URL } from 'node:url';
import { home } from './home/home.controller.js';
import { staticFiles } from './static/static.controller.js';

const urlFilePattern = /\/public\/([\w-]+\/)*[\w-]+\.[a-z]+$/;

const routes = [
  {
    name: '/',
    method: 'GET',
    handler: home,
  },
];

const router = (request, response) => {
  const { url, method } = request;
  const { pathname } = new URL(url, `http://${request.headers.host}`);

  if (urlFilePattern.test(url)) {
    return staticFiles(request, response);
  }

  const route = routes.find(
    (route) => route.name === pathname && route.method === method,
  );

  if (route) {
    return route.handler(request, response);
  }

  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Route not found');
  response.end();
};

export default router;
