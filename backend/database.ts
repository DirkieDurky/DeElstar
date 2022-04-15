import mysql2 from "mysql2";
const util = require('util');

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

const query = util.promisify(connection.query).bind(connection);

export default query;