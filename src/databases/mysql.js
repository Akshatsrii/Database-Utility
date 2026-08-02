import mysql from "mysql2/promise";

export async function mysqlModule() {

    let connection;

    try {

        connection = await mysql.createConnection({

            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE

        });

        const [rows] = await connection.query(
            "SELECT NOW() AS currentTime;"
        );

        console.log("Current MySQL Time:");
        console.log(rows[0].currentTime);

    }

    catch (error) {

        console.log("MySQL Connection Failed!");
        console.log(error.message);

    }

    finally {

        if (connection) {

            await connection.end();
            console.log("MySQL Connection Closed Successfully!");

        }

    }

}