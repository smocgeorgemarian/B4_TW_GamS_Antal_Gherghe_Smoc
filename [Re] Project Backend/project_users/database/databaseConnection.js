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

async function services_username_rewards(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.get_rewards('${hash_code}', '${user_name}') FROM DUAL`)

        let response = (await result).rows[0][0];

        if (response[0] != '[') {
            return response
        }

        return JSON.parse(response)
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

async function services_username_all_rewards(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.get_all_rewards('${hash_code}', '${user_name}') FROM DUAL`)

        let response = (await result).rows[0][0];

        if (response[0] != '[') {
            return response
        }

        return JSON.parse(response)
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

async function services_username_level(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.get_level('${hash_code}', '${user_name}') FROM DUAL`)

        let response = (await result).rows[0][0];

        if (response[0] != '[') {
            return response
        }

        return JSON.parse(response)
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

async function services_username_xp(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.get_xp('${hash_code}', '${user_name}') FROM DUAL`)

        let response = (await result).rows[0][0];

        if (response[0] != '[') {
            return response
        }

        return JSON.parse(response)
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

async function services_username_update(event_name, hash_code, user_name, value_update) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.update_event('${event_name}', '${hash_code}', '${user_name}', ${value_update}) FROM DUAL`)

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

async function services_username_add(event_name, hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.add_user_to_event('${event_name}', '${hash_code}', '${user_name}') FROM DUAL`)

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

async function services_username_add_level(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.add_user_to_level('${hash_code}', '${user_name}') FROM DUAL`)

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

async function services_username_delete(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.remove_user('${hash_code}', '${user_name}') FROM DUAL`)

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
    services_username_rewards, services_username_all_rewards, services_username_level, services_username_xp, services_username_update, services_username_add, services_username_add_level, services_username_delete,
    getStatusCodeForMessage, setCORSPolicy
}
