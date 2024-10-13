import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export const initDatabase = async () => {
  await connection.query(`drop table if exists admins;`);
  await connection.query(`drop table if exists coffe_shops;`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(75) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS coffe_shops (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      rating INT NOT NULL,
      hours_of_operation VARCHAR(255) NOT NULL,
      drinks VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      food_available VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const adminPassword = process.env.ADMIN_PASSWORD;
  bcrypt.hash(adminPassword, 10).then(async (hash) => {
    await connection.query(
      `INSERT INTO admins (username, password) VALUES ('admin', '${hash}');`,
    );
    console.log('Database initialized and admin user created');
  });
};
