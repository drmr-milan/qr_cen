import mysql from "mysql2";

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export default pool.promise();
