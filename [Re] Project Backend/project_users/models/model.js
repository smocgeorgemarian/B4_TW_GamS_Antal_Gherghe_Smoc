const oracledb = require('oracledb');

function services_username_rewards(hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.get_rewards('${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];

            if (response[0] != '[') {
                resolve(response);
            }else{
                resolve(JSON.parse(response));
            }
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_all_rewards(hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.get_all_rewards('${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];

            if (response[0] != '[') {
                resolve(response);
            }else{
                resolve(JSON.parse(response));
            }
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_level(hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.get_level('${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response);
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_xp(hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.get_xp('${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response);
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_update(event_name, hash_code, user_name, value_update) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.update_event('${event_name}', '${hash_code}', '${user_name}', ${value_update}) FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response);
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_add(event_name, hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.add_user_to_event('${event_name}', '${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response);
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_add_level(hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.add_user_to_level('${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response);
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

function services_username_delete(hash_code, user_name) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services_username.remove_user('${hash_code}', '${user_name}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response);
        } catch (err) {
            console.error(err);
            resolve('error');
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    })
}

module.exports = {
    services_username_rewards, services_username_all_rewards, services_username_level, services_username_xp, services_username_update, services_username_add, services_username_add_level, services_username_delete
}