const http = require('http')
const {
    services_username_rewards, services_username_all_rewards, services_username_level, services_username_xp, services_username_update, services_username_add, services_username_add_level, services_username_delete, getStatusCodeForMessage, setCORSPolicy
} = require('./database/databaseConnection')

const serverServices = http.createServer((req, res) => {
    setCORSPolicy(res)
    res.setHeader('Access-Control-Max-Age', 2592000) // 30 days
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }
    res.setHeader("Content-Type", "application/json")
    if (req.url === '/services/username/rewards' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_rewards(JSON.parse(body).hash_code, JSON.parse(body).username));
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

    } else if (req.url === '/services/username/rewards/all' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_all_rewards(JSON.parse(body).hash_code, JSON.parse(body).username));
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

    } else if (req.url === '/services/username/level' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_level(JSON.parse(body).hash_code, JSON.parse(body).username));
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

    } else if (req.url === '/services/username/xp' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_xp(JSON.parse(body).hash_code, JSON.parse(body).username));
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

    } else if (req.url === '/services/username/update' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
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

    } else if (req.url === '/services/username/add' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).event_name || !JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_add(JSON.parse(body).event_name, JSON.parse(body).hash_code, JSON.parse(body).username));
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

    } else if (req.url === '/services/username/addlevel' && req.method === 'PUT') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_add_level(JSON.parse(body).hash_code, JSON.parse(body).username));
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

    } else if (req.url === '/services/username/delete' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code || !JSON.parse(body).username) {
                    reject('Wrong parameters!')
                } else {
                    resolve(services_username_delete(JSON.parse(body).hash_code, JSON.parse(body).username));
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

const PORT = 5002
serverServices.listen(PORT, () => console.log(`Server on port ${PORT}`))