import { createServer } from 'node:http';
import router from './app/router.js';

const server = createServer();

server.on('request', router);

server.on('error', (err) => {
  console.error(err);
});

server.listen(3000, () => {
  console.log('Application is running on http://localhost:3000');
});
