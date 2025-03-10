const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = { sql, connectDB };
