import ejs from 'ejs';
import { join } from 'node:path';

const viewsPath = join(process.cwd(), 'views');
const options = {
  root: process.cwd(),
  views: [viewsPath],
};

export const render = (response, view, data) => {
  const filePath = join(viewsPath, view);

  ejs.renderFile(filePath, data, options, function (err, str) {

    if (err) {
      console.error(err);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.write('Internal Server Error');
      response.end();
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(str);
    response.end();
  });
};
