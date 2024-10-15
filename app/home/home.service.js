import { CoffeShop } from '../../models/coffeshop.js';
import { render } from '../utils.js';

export const getCoffeShops = async (response) => {
  const coffeShops = await CoffeShop.findAll();
  return render(response, 'index.ejs', { coffeShops });
};
