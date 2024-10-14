import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

export const dropTables = async () => {
  await connection.query('DROP TABLE coffe_shops');
  await connection.query('DROP TABLE admins');
};

export const createAdmin = async () => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
  const hash = await bcrypt.hash(adminPassword, 10);
  await connection.query(`
    INSERT INTO admins (username, password)
    VALUES ('admin', '${hash}');
  `);
};

export const initDatabase = async () => {
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

  await createAdmin();
};

export const closeConnection = async () => {
  await connection.end();
};
