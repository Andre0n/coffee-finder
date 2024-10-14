import { dropTables, initDatabase, closeConnection } from './app/database.js';

const migrate = async () => {
  console.log('Running migrations...');
  await dropTables();
  await initDatabase();
  await closeConnection();
  console.log('Migrations complete');
};

await migrate();
