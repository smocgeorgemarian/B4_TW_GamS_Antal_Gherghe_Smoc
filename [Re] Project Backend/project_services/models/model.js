const oracledb = require('oracledb');

function services_add_event(hash_code, event_name, event_type, event_value, event_xp) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.add_event('${hash_code}', '${event_name}', '${event_type}', ${event_value}, ${event_xp}) FROM DUAL`)
    
            let response = (await result).rows[0][0];
            resolve(response)
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

function services_add_reward(hash_code, reward_name, condition, reward) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.add_reward('${hash_code}', '${reward_name}', '${condition}', '${reward}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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

function services_add_level(hash_code, level_name, level_value, description) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.add_level('${hash_code}', '${level_name}', ${level_value}, '${description}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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

function services_update_reward(reward_name, hash_code, new_reward) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.update_reward('${reward_name}', '${hash_code}', '${new_reward}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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

function services_update_level(level_name, hash_code, new_name, new_value, new_description) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.update_level('${level_name}', '${hash_code}', '${new_name}', ${new_value}, '${new_description}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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

function services_delete_event(event_name, hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.delete_event('${event_name}', '${hash_code}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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

function services_delete_reward(reward_name, hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.delete_reward('${reward_name}', '${hash_code}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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

function services_delete_level(level_name, hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_services.delete_level('${level_name}', '${hash_code}') FROM DUAL`)

            let response = (await result).rows[0][0];
            resolve(response)
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
    services_add_event, services_add_reward, services_add_level, services_update_reward, services_update_level, services_delete_event, services_delete_reward, services_delete_level
}