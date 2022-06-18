const oracledb = require('oracledb');

async function users_register(username, password, site) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_users.owner_register('${username}', '${password}', '${site}') FROM DUAL`)

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

async function users_login(username, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_users.owner_login('${username}', '${password}') FROM DUAL`)

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

async function users_logout(username) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_users.owner_logout('${username}') FROM DUAL`)

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

async function users_events(username, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT COUNT(*) FROM OWNERS WHERE oname = '${username}' AND opassword = '${password}'`)
        let hash_code = (await result).rows[0][0];

        if(hash_code < 1){
            return '404'
        }

        result = connection.execute(`SELECT hash_code FROM OWNERS WHERE oname = '${username}' AND opassword = '${password}'`)
        hash_code = (await result).rows[0][0];

        result = connection.execute(`SELECT * FROM EVENT_${hash_code}`)
        let response = null;
        for (i = 0; i < (await result).rows.length; i++) {
            if (response === null) {
                response = '[{ "event_name" : "' + (await result).rows[i][0] + '", "event_type" : "' + (await result).rows[i][1] + '", "event_value" : "' + (await result).rows[i][2] + '"}';
            } else {
                response = response + ', { "event_name" : "' + (await result).rows[i][0] + '", "event_type" : "' + (await result).rows[i][1] + '", "event_value" : "' + (await result).rows[i][2] + '"}';
            }
        }


        if(response === null){
            return 'NULL'
        }

        response = response + ']'
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

async function users_rewards(username, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT COUNT(*) FROM OWNERS WHERE oname = '${username}' AND opassword = '${password}'`)
        let hash_code = (await result).rows[0][0];

        if(hash_code < 1){
            return '404'
        }

        result = connection.execute(`SELECT hash_code FROM OWNERS WHERE oname = '${username}' AND opassword = '${password}'`)
        hash_code = (await result).rows[0][0];

        result = connection.execute(`SELECT * FROM REWARD_${hash_code}`)
        let response = null;
        for (i = 0; i < (await result).rows.length; i++) {
            if (response === null) {
                response = '[{ "reward_name" : "' + (await result).rows[i][0] + '", "condition" : "' + (await result).rows[i][1] + '", "reward" : "' + (await result).rows[i][2] + '", "is_repeatable" : ' + (await result).rows[i][3] + '}';
            } else {
                response = response + ', { "reward_name" : "' + (await result).rows[i][0] + '", "condition" : "' + (await result).rows[i][1] + '", "reward" : "' + (await result).rows[i][2] + '", "is_repeatable" : ' + (await result).rows[i][3] + '}';
            }
        }


        if(response === null){
            return 'NULL'
        }

        response = response + ']'
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

async function users_delete(username, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_users.owner_delete('${username}', '${password}') FROM DUAL`)

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

async function services_add_event(hash_code, event_name, event_type, event_value) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.add_event('${hash_code}', '${event_name}', '${event_type}', ${event_value}) FROM DUAL`)

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

async function services_add_reward(hash_code, reward_name, condition, reward, is_repeatable) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.add_reward('${hash_code}', '${reward_name}', '${condition}', '${reward}', ${is_repeatable}) FROM DUAL`)

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

async function services_delete_event(event_name, user_name, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.delete_event('${event_name}', '${user_name}', '${password}') FROM DUAL`)

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

async function services_delete_reward(reward_name, user_name, password) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services.delete_reward('${reward_name}', '${user_name}', '${password}') FROM DUAL`)

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

async function services_username_rewards(hash_code, user_name) {
    let connection
    try {
        connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
        console.log("Successfully connected to Oracle Database");
        let result = connection.execute(`SELECT api_services_username.get_rewards('${hash_code}', '${user_name}') FROM DUAL`)

        let response = (await result).rows[0][0];

        if(response[0] != '['){
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
    users_register, users_login, users_logout, users_events, users_rewards, users_delete,
    services_add_event, services_add_reward, services_delete_event, services_delete_reward, services_update_reward,
    services_username_rewards, services_username_update, services_username_add, services_username_delete
}
