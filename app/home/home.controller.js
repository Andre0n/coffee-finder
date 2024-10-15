import { render } from '../utils.js';
import { getCoffeShops } from './home.service.js';

export const home = (_, response) => {
  return getCoffeShops(response);
};
