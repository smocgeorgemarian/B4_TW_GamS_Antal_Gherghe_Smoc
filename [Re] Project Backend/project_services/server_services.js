const http = require('http')

const {
    services_add_event, services_add_reward, services_delete_event, services_delete_reward, services_update_reward, getStatusCodeForMessage, setCORSPolicy
} = require('./database/databaseConnection')

const serverServices = http.createServer((req, res) => {
    setCORSPolicy(res)
    res.setHeader('Access-Control-Max-Age', 2592000) // 30 days
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }
    //==============================SERVICES==============================
    res.setHeader("Content-Type", "application/json")
    if (req.url === '/services/add/event' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).event_name || !JSON.parse(body).event_type || !JSON.parse(body).event_value) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_add_event(JSON.parse(body).hash_code, JSON.parse(body).event_name, JSON.parse(body).event_type, JSON.parse(body).event_value));
                }
            })
                .then(value => {
                    res.statusCode = getStatusCodeForMessage(value)
                    res.write(JSON.stringify({ message: value }))
                    res.end()
                })
                .catch(err => {
                    res.statusCode = 400
                    res.write(JSON.stringify({ message: err }))
                    res.end()
                });
        });

    } else if (req.url === '/services/add/reward' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).reward_name || !JSON.parse(body).condition || !JSON.parse(body).reward || !JSON.parse(body).is_repeatable) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_add_reward(JSON.parse(body).hash_code, JSON.parse(body).reward_name, JSON.parse(body).condition, JSON.parse(body).reward, JSON.parse(body).is_repeatable));
                }
            })
                .then(value => {
                    res.statusCode = getStatusCodeForMessage(value)
                    res.write(JSON.stringify({ message: value }))
                    res.end()
                })
                .catch(err => {
                    res.statusCode = 400
                    res.write(JSON.stringify({ message: err }))
                    res.end()
                });
        });

    } else if (req.url === '/services/delete/event' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).event_name || !JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_delete_event(JSON.parse(body).event_name, JSON.parse(body).hash_code));
                }
            })
                .then(value => {
                    res.statusCode = getStatusCodeForMessage(value)
                    res.write(JSON.stringify({ message: value }))
                    res.end()
                })
                .catch(err => {
                    res.statusCode = 400
                    res.write(JSON.stringify({ message: err }))
                    res.end()
                });
        });

    } else if (req.url === '/services/delete/reward' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).reward_name || !JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_delete_reward(JSON.parse(body).reward_name, JSON.parse(body).hash_code));
                }
            })
                .then(value => {
                    res.statusCode = getStatusCodeForMessage(value)
                    res.write(JSON.stringify({ message: value }))
                    res.end()
                })
                .catch(err => {
                    res.statusCode = 400
                    res.write(JSON.stringify({ message: err }))
                    res.end()
                });
        });

    } else if (req.url === '/services/update/reward' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).reward_name || !JSON.parse(body).hash_code || !JSON.parse(body).new_reward) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_update_reward(JSON.parse(body).reward_name, JSON.parse(body).hash_code, JSON.parse(body).new_reward));
                }
            })
                .then(value => {
                    res.statusCode = getStatusCodeForMessage(value)
                    res.write(JSON.stringify({ message: value }))
                    res.end()
                })
                .catch(err => {
                    res.statusCode = 400
                    res.write(JSON.stringify({ message: err }))
                    res.end()
                });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }
})

const PORT = 5001
serverServices.listen(PORT, () => console.log(`Server on port ${PORT}`))