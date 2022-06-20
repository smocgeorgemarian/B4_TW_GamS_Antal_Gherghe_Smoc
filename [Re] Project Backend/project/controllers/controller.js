const Database = require('../models/model');

function getStatusCodeForMessage(value) {
    if (value === '0') return 403
    if (value === '404') return 404
    if (value === 'error') return 500
    return 200
}

async function userRegister(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).username || !JSON.parse(body).password || !JSON.parse(body).site){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_register(JSON.parse(body).username, JSON.parse(body).password, JSON.parse(body).site);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userLogin(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).username || !JSON.parse(body).password){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_login(JSON.parse(body).username, JSON.parse(body).password);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userLogout(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_logout(JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userGetEvents(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_events(JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userGetRewards(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_rewards(JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userGetLevels(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_levels(JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userGetTop(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).hash_code){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_top(JSON.parse(body).hash_code);
                res.statusCode = getStatusCodeForMessage(response)
                res.write(JSON.stringify({ message: response }))
                res.end()
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function userDelete(req, res) {
    try {

         let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            if(!JSON.parse(body).username || !JSON.parse(body).password){
                res.statusCode = 400
                res.write(JSON.stringify({ message: 'Wrong parameters!' }))
                res.end()
            }else{
                const response = await Database.users_delete(JSON.parse(body).username, JSON.parse(body).password);
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
    userRegister, userLogin, userLogout, userGetEvents, userGetRewards, userGetLevels, userGetTop, userDelete,
    getStatusCodeForMessage
}