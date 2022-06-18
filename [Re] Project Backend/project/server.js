const http = require('http')
const { users_register, users_login, users_logout, users_events, users_rewards, users_delete,
    services_add_event, services_add_reward, services_delete_event, services_delete_reward, services_update_reward,
    services_username_rewards, services_username_update, services_username_add, services_username_delete
} = require('./database/databaseConnection')

const server = http.createServer((req, res) => {

    //==============================USERS==============================

    if (req.url === '/users/register' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password || !JSON.parse(body).site) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_register(JSON.parse(body).username, JSON.parse(body).password, JSON.parse(body).site));
                }
            })

            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/users/login' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_login(JSON.parse(body).username, JSON.parse(body).password));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/users/logout' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_logout(JSON.parse(body).username));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/users/events' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_events(JSON.parse(body).username, JSON.parse(body).password));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/users/rewards' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_rewards(JSON.parse(body).username, JSON.parse(body).password));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/users/delete' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_delete(JSON.parse(body).username, JSON.parse(body).password));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

        //==============================SERVICES==============================

    } else if (req.url === '/services/add/event' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).event_name || !JSON.parse(body).event_type || !JSON.parse(body).event_value) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_add_event(JSON.parse(body).hash_code, JSON.parse(body).event_name, JSON.parse(body).event_type, JSON.parse(body).event_value));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/add/reward' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).reward_name || !JSON.parse(body).condition || !JSON.parse(body).reward || !JSON.parse(body).is_repeatable) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_add_reward(JSON.parse(body).hash_code, JSON.parse(body).reward_name, JSON.parse(body).condition, JSON.parse(body).reward, JSON.parse(body).is_repeatable));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/delete/event' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).event_name || !JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_delete_event(JSON.parse(body).event_name, JSON.parse(body).username, JSON.parse(body).password));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/delete/reward' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).reward_name || !JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_delete_reward(JSON.parse(body).reward_name, JSON.parse(body).username, JSON.parse(body).password));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/update/reward' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).reward_name || !JSON.parse(body).hash_code || !JSON.parse(body).new_reward) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_update_reward(JSON.parse(body).reward_name, JSON.parse(body).hash_code, JSON.parse(body).new_reward));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

        //==============================SERVICES_USERNAME==============================

    } else if (req.url === '/services/username/rewards' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_rewards(JSON.parse(body).hash_code, JSON.parse(body).username));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/username/update' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).event_name || !JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    var update_value
                    if (!JSON.parse(body).value_update) {
                        update_value = 1;
                    } else {
                        update_value = JSON.parse(body).value_update;
                    }
                    resolve(services_username_update(JSON.parse(body).event_name, JSON.parse(body).hash_code, JSON.parse(body).username, update_value));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else if(value === 'error'){
                    res.statusCode = 500
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/username/add' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).event_name || !JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_add(JSON.parse(body).event_name, JSON.parse(body).hash_code, JSON.parse(body).username));
                }
            })
            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else if (req.url === '/services/username/delete' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const promise = new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_delete(JSON.parse(body).hash_code, JSON.parse(body).username));
                }
            })

            .then(value => {
                if(value === '0'){
                    res.statusCode = 403
                }else if(value === '404'){
                    res.statusCode = 404
                }else{
                    res.statusCode = 200
                }
                res.write(JSON.stringify({ message: value }))
                res.end()
            })
            .catch(err =>{
                res.statusCode = 400
                res.write(JSON.stringify({ message: err }))
                res.end()
            })
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server on port ${PORT}`))