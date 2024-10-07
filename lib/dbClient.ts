import dotenv from "dotenv";
import { Pool } from "pg";


dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 30,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 2000,
    // ssl: {
    //     rejectUnauthorized: true,
    // },

});

export default pool;