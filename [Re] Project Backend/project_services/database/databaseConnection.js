const oracledb = require('oracledb');

function getStatusCodeForMessage(value) {
    if (value === '0') return 403
    if (value === '404') return 404
    if (value === 'error') return 500
    return 200
}

function setCORSPolicy(res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Max-Age', 2592000) // 30 days

}

async function services_add_event(hash_code, event_name, event_type, event_value, event_xp) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        console.log("Hash code: " + hash_code + " event name " + event_name + " event type " + event_type + " event value " + event_value)
        let result = connection.execute(`SELECT api_services.add_event('${hash_code}', '${event_name}', '${event_type}', ${event_value}, ${event_xp}) FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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

async function services_add_reward(hash_code, reward_name, condition, reward) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.add_reward('${hash_code}', '${reward_name}', '${condition}', '${reward}') FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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

async function services_add_level(hash_code, level_name, level_value, description) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.add_level('${hash_code}', '${level_name}', ${level_value}, '${description}') FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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

async function services_delete_event(event_name, hash_code) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.delete_event('${event_name}', '${hash_code}') FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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

async function services_delete_reward(reward_name, hash_code) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.delete_reward('${reward_name}', '${hash_code}') FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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

async function services_delete_level(level_name, hash_code) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.delete_level('${level_name}', '${hash_code}') FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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

async function services_update_reward(reward_name, hash_code, new_reward) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.update_reward('${reward_name}', '${hash_code}', '${new_reward}') FROM DUAL`)

        let response = (await result).rows[0][0];
        return response
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
    services_add_event, services_add_reward, services_add_level, services_delete_event, services_delete_reward, services_delete_level, services_update_reward,
    getStatusCodeForMessage, setCORSPolicy
}
