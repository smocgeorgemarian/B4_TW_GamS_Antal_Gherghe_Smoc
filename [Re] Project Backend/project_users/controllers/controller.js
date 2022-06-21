const Database = require('../models/model');

function getStatusCodeForMessage(value) {
    if (value === '0') return 403
    if (value === '404') return 404
    if (value === 'error') return 500
    return 200
}

async function servicesUsernameGetRewards(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_username_rewards(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameGetAllRewards(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_username_all_rewards(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameGetLevel(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_username_level(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameGetXp(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_username_xp(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameGetDescription(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_username_description(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameUpdateProgress(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).event_name || !JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                var update_value
                if (!JSON.parse(body).value_update) {
                    update_value = 1;
                } else {
                    update_value = JSON.parse(body).value_update;
                }
                const response = await Database.services_username_update(JSON.parse(body).event_name, JSON.parse(body).hash_code, JSON.parse(body).username, update_value);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameAddToEvent(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).event_name || !JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                var update_value
                if (!JSON.parse(body).value_update) {
                    update_value = 1;
                } else {
                    update_value = JSON.parse(body).value_update;
                }
                const response = await Database.services_username_add(JSON.parse(body).event_name, JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameAddToLevel(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                var update_value
                if (!JSON.parse(body).value_update) {
                    update_value = 1;
                } else {
                    update_value = JSON.parse(body).value_update;
                }
                const response = await Database.services_username_add_level(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUsernameDelete(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).username){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                var update_value
                if (!JSON.parse(body).value_update) {
                    update_value = 1;
                } else {
                    update_value = JSON.parse(body).value_update;
                }
                const response = await Database.services_username_delete(JSON.parse(body).hash_code, JSON.parse(body).username);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    servicesUsernameGetRewards, servicesUsernameGetAllRewards, servicesUsernameGetLevel, servicesUsernameGetXp, servicesUsernameGetDescription, servicesUsernameUpdateProgress, servicesUsernameAddToEvent, servicesUsernameAddToLevel, servicesUsernameDelete,
    getStatusCodeForMessage
}