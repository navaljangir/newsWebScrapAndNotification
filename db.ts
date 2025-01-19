import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.query('CREATE DATABASE IF NOT EXISTS hacker_news');
        await db.execute(`CREATE TABLE IF NOT EXISTS news(
                    id INT AUTO_INCREMENT PRIMARY KEY, 
                    newsid VARCHAR(50) ,
                    title TEXT,
                    pathLink VARCHAR(255),
                    datePublish DATETIME
                )`)
        console.log('Database Initialized');
        await connection.end();
    } catch (error) {
        console.error('Error creating database:', error);
    }
}

initializeDatabase();
const db = mysql.createPool({
    ...dbConfig,
    database: "hacker_news",
});
export type RowDataPacket = mysql.RowDataPacket;
export default db;