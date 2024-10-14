import { render } from '../utils.js';

export const home = (_, response) => {
  const data = {
    page: 'Home',
  };

  return render(response, 'index.ejs', data);
};
