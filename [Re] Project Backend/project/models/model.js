const oracledb = require('oracledb');

async function send_email(user_name, hashcode){
    const SENDGRID_API_KEY = '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'
    const EMAIL_ADRESS = 'gamificationproject2001@gmail.com'

    const fs = require("fs");
    const path = require("path");

    pathToAttachment = `./WSDL.xml`;
    attachment = fs.readFileSync(path.resolve(__dirname, pathToAttachment)).toString("base64");

    let client = require('@sendgrid/mail')
    client.setApiKey(SENDGRID_API_KEY)

    client.send({
        to:{
            email: user_name,
            name:'customer'
        },
        from:{
            email: EMAIL_ADRESS,
            name: 'GameS_Services'
        },
        attachments: [{
            content: attachment,
            filename: "WSDL.xml",
            type: "application/xml",
            disposition: "attachment"
        }],
        templateId: 'd-bdc4821efa32408f863f516ef244e2f2',
        dynamicTemplateData: {
            name: user_name.split('@')[0],
            hash_code: hashcode
        }
    }).then(() => {
        console.log('Email was sent!');
    })
}

function users_register(username, password, site) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_users.owner_register('${username}', '${password}', '${site}') FROM DUAL`)

            let response = (await result).rows[0][0];
            if(response !== '0' && response !== '404'){
                send_email(username, response);
            }

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

function users_login(username, password) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_users.owner_login('${username}', '${password}') FROM DUAL`)

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

function users_logout(hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_users.owner_logout('${hash_code}') FROM DUAL`)

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

function users_events(hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT COUNT(*) FROM OWNERS WHERE hash_code = '${hash_code}'`)
            let status = (await result).rows[0][0];

            if (status < 1) {
                resolve('404');
            }

            result = connection.execute(`SELECT * FROM EVENT_${hash_code}`)
            let response = null;
            for (i = 0; i < (await result).rows.length; i++) {
                if (response === null) {
                    response = '[{ "event_name" : "' + (await result).rows[i][0] + '", "event_type" : "' + (await result).rows[i][1] + '", "event_value" : "' + (await result).rows[i][2] + '", "event_xp" : "' + (await result).rows[i][3] + '"}';
                } else {
                    response = response + ', { "event_name" : "' + (await result).rows[i][0] + '", "event_type" : "' + (await result).rows[i][1] + '", "event_value" : "' + (await result).rows[i][2] + '", "event_xp" : "' + (await result).rows[i][3] + '"}';
                }
            }


            if (response === null) {
                resolve('NULL');
            }else{
                response = response + ']'
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

function users_rewards(hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT COUNT(*) FROM OWNERS WHERE hash_code = '${hash_code}'`)
            let status = (await result).rows[0][0];

            if (status < 1) {
                resolve('404');
            }

            result = connection.execute(`SELECT * FROM REWARD_${hash_code}`)
            let response = null;
            for (i = 0; i < (await result).rows.length; i++) {
                if (response === null) {
                    response = '[{ "reward_name" : "' + (await result).rows[i][0] + '", "condition" : "' + (await result).rows[i][1] + '", "reward" : "' + (await result).rows[i][2] + '"}';
                } else {
                    response = response + ', { "reward_name" : "' + (await result).rows[i][0] + '", "condition" : "' + (await result).rows[i][1] + '", "reward" : "' + (await result).rows[i][2] + '"}';
                }
            }


            if (response === null) {
                resolve('NULL');
            }else{
                response = response + ']'
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

function users_levels(hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT COUNT(*) FROM OWNERS WHERE hash_code = '${hash_code}'`)
            let status = (await result).rows[0][0];

            if (status < 1) {
                resolve('404');
            }

            result = connection.execute(`SELECT * FROM LEVEL_${hash_code} ORDER BY lvalue`)
            let response = null;
            for (i = 0; i < (await result).rows.length; i++) {
                if (response === null) {
                    response = '[{ "level_name" : "' + (await result).rows[i][0] + '", "level_value" : "' + (await result).rows[i][1] + '", "description" : "' + (await result).rows[i][2] + '"}';
                } else {
                    response = response + ', { "level_name" : "' + (await result).rows[i][0] + '", "level_value" : "' + (await result).rows[i][1] + '", "description" : "' + (await result).rows[i][2] + '"}';
                }
            }


            if (response === null) {
                resolve('NULL');
            }else{
                response = response + ']'
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

function users_top(hash_code) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT COUNT(*) FROM OWNERS WHERE hash_code = '${hash_code}'`)
            let status = (await result).rows[0][0];

            if (status < 1) {
                resolve('404');
            }

            result = connection.execute(`SELECT * FROM PLAYER_${hash_code} ORDER BY xp DESC`)
            let response = null;
            for (i = 0; i < (await result).rows.length; i++) {
                if (response === null) {
                    response = '[{ "user_name" : "' + (await result).rows[i][0] + '", "xp" : "' + (await result).rows[i][1] + '", "level" : "' + (await result).rows[i][2] + '"}';
                } else {
                    response = response + ', { "user_name" : "' + (await result).rows[i][0] + '", "xp" : "' + (await result).rows[i][1] + '", "level" : "' + (await result).rows[i][2] + '"}';
                }
            }


            if (response === null) {
                resolve('NULL');
            }else{
                response = response + ']'
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

function users_delete(username, password) {
    return new Promise(async (resolve, reject) => {
        let connection
        try {
            connection = await oracledb.getConnection({ user: "tudor", password: "tudor", connectionString: "localhost/xe" });
            console.log("Successfully connected to Oracle Database");
            let result = connection.execute(`SELECT api_users.owner_delete('${username}', '${password}') FROM DUAL`)

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
    users_register, users_login, users_logout, users_events, users_rewards, users_levels, users_top, users_delete,
    send_email
}