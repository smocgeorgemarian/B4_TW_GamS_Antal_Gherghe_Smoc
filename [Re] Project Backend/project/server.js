const http = require('http')
const {
    users_register, users_login, users_logout, users_events, users_rewards, users_levels, users_top, users_delete
} = require('./database/databaseConnection')

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

const server = http.createServer((req, res) => {
    setCORSPolicy(res)
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }
    //==============================USERS==============================
    res.setHeader("Content-Type", "application/json")
    if (req.url === '/users/register' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password || !JSON.parse(body).site) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_register(JSON.parse(body).username, JSON.parse(body).password, JSON.parse(body).site));
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

    } else if (req.url === '/users/login' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                console.log(body)
                if (!JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_login(JSON.parse(body).username, JSON.parse(body).password));
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

    } else if (req.url === '/users/logout' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_logout(JSON.parse(body).hash_code));
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

    } else if (req.url === '/users/events' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_events(JSON.parse(body).hash_code));
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

    } else if (req.url === '/users/rewards' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_rewards(JSON.parse(body).hash_code));
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

    } else if (req.url === '/users/levels' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_levels(JSON.parse(body).hash_code));
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

    } else if (req.url === '/users/top' && req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).hash_code) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_top(JSON.parse(body).hash_code));
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

    } else if (req.url === '/users/delete' && req.method === 'DELETE') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            new Promise((resolve, reject) => {
                if (!JSON.parse(body).username || !JSON.parse(body).password) {
                    reject('Wrong parameters!')
                } else {
                    resolve(users_delete(JSON.parse(body).username, JSON.parse(body).password));
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

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server on port ${PORT}`))

module.exports = {
    getStatusCodeForMessage,
    setCORSPolicy
}