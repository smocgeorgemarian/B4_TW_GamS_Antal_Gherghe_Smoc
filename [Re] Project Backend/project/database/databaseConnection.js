const oracledb = require('oracledb');

async function connectToDatabase(username, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "PA", password: "PA", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        connection.execute(`begin api_users.owner_register('care1', 'care1'); commit; end;`)
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


module.exports = {
    connectToDatabase
}
