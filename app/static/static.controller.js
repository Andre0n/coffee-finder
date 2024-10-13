import { stat, createReadStream } from 'node:fs';
import { extname, resolve } from 'node:path';

const contentTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  json: 'application/json',
};

export const staticFiles = (request, response) => {
  const { url } = request;

  const extension = extname(url).slice(1);
  const path = resolve(`./${url}`);
  console.log(path);

  stat(path, (err, stats) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('File not found');
      response.end();
      return;
    }

    if (stats.isDirectory()) {
      response.writeHead(403, { 'Content-Type': 'text/plain' });
      response.write('Directory access is forbidden');
      response.end();
      return;
    }

    response.writeHead(200, { 'Content-Type': contentTypes[extension] });
    createReadStream(path).pipe(response);
  });
};
