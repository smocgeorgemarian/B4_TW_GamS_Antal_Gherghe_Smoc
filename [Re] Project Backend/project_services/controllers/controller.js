const Database = require('../models/model');

function getStatusCodeForMessage(value) {
    if (value === '0') return 403
    if (value === '404') return 404
    if (value === 'error') return 500
    return 200
}

async function servicesAddEvent(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).event_name || !JSON.parse(body).event_type || (!JSON.parse(body).event_value && JSON.parse(body).event_value != 0) || (!JSON.parse(body).event_xp && JSON.parse(body).event_xp != 0)){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_add_event(JSON.parse(body).hash_code, JSON.parse(body).event_name, JSON.parse(body).event_type, JSON.parse(body).event_value, JSON.parse(body).event_xp);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesAddReward(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).reward_name || !JSON.parse(body).condition || !JSON.parse(body).reward){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_add_reward(JSON.parse(body).hash_code, JSON.parse(body).reward_name, JSON.parse(body).condition, JSON.parse(body).reward);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesAddLevel(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code || !JSON.parse(body).level_name || (!JSON.parse(body).level_value && JSON.parse(body).level_value != 0) || !JSON.parse(body).description){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_add_level(JSON.parse(body).hash_code, JSON.parse(body).level_name, JSON.parse(body).level_value, JSON.parse(body).description);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUpdateReward(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).reward_name || !JSON.parse(body).hash_code || !JSON.parse(body).new_reward){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_update_reward(JSON.parse(body).reward_name, JSON.parse(body).hash_code, JSON.parse(body).new_reward);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesUpdateLevel(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            let new_name
            let new_value
            let new_description
            if(!JSON.parse(body).new_name){
                new_name = 'NULL'
            }else{
                new_name = JSON.parse(body).new_name
            }

            if(!JSON.parse(body).new_value && JSON.parse(body).new_value != 0){
                new_value = -1
            }else{
                new_value = JSON.parse(body).new_value
            }

            if(!JSON.parse(body).new_description){
                new_description = 'NULL'
            }else{
                new_description = JSON.parse(body).new_description
            }

            if(!JSON.parse(body).level_name || !JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_update_level(JSON.parse(body).level_name, JSON.parse(body).hash_code, new_name, new_value, new_description);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesDeleteEvent(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).event_name || !JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_delete_event(JSON.parse(body).event_name, JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesDeleteReward(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).reward_name || !JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_delete_reward(JSON.parse(body).reward_name, JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function servicesDeleteLevel(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).level_name || !JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.services_delete_level(JSON.parse(body).level_name, JSON.parse(body).hash_code);
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
    servicesAddEvent, servicesAddReward, servicesAddLevel, servicesUpdateReward, servicesUpdateLevel, servicesDeleteEvent, servicesDeleteReward, servicesDeleteLevel,
    getStatusCodeForMessage
}