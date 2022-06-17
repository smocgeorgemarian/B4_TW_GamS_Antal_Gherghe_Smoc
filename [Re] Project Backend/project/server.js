const http = require('http')
const { users_register, users_login, users_logout, users_delete } = require('./database/databaseConnection')

const server = http.createServer((req, res) => {
    if (req.url === '/users/register' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            users_register(JSON.parse(body).username, JSON.parse(body).password, JSON.parse(body).site)
        });

    }else if(req.url === '/users/login' && req.method === 'GET'){
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            users_login(JSON.parse(body).username, JSON.parse(body).password)
        });

    }else if(req.url === '/users/logout' && req.method === 'GET'){
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            users_logout(JSON.parse(body).username)
        });

    }else if(req.url === '/users/delete' && req.method === 'DELETE'){
        let body = ''
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            users_delete(JSON.parse(body).username, JSON.parse(body).password)
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server on port ${PORT}`))