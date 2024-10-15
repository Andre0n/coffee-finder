import sql from 'sql-bricks';
import { execute } from '../app/database.js';

export class CoffeShop {
  static async findAll() {
    const query = sql.select().from('coffe_shops').toString();
    const result = await execute(query);
    return result;
  }
}
