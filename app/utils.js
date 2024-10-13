import { join } from 'node:path';
import { createReadStream } from 'node:fs';

export const render = (response, view) => {
  const filePath = join('views', view);
  response.writeHead(200, { 'Content-Type': 'text/html' });
  return createReadStream(filePath).pipe(response);
};
