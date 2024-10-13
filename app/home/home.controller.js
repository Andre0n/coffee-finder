import { render } from '../utils.js';

export const home = (_, response) => {
  return render(response, 'index.html');
};
