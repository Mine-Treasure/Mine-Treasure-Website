import mysql from "mysql2/promise";

const createPool = (): mysql.Pool | null => {
     if (process.env.DB_DISABLED === "true") return null;

     return mysql.createPool({
          host: process.env.DB_HOST,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
     });
};

const pool = createPool();

export default pool;