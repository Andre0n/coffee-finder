import { URL } from 'node:url';
import { render } from '../utils.js';
import { initDatabase } from '../database.js';

export const home = (request, response) => {
  const { url } = request;
  const { searchParams } = new URL(url, `http://${request.headers.host}`);

  if (searchParams.has('init')) {
    if (
      process.env.NODE_ENV === 'development' &&
      searchParams.get('init') === 'true'
    ) {
      initDatabase();
    }
  }

  return render(response, 'index.html');
};
