import { home } from "./home/home.controller.js";
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

  if (urlFilePattern.test(url)) {
    return staticFiles(request, response);
  }

  const route = routes.find(
    (route) => route.name === url && route.method === method,
  );

  if (route) {
    return route.handler(request, response);
  }

  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Route not found');
  response.end();
};

export default router;
