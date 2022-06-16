const http = require('http')
const { getProducts } = require('./controllers/productController')
const { connectToDatabase } = require('./database/databaseConnection')

const server = http.createServer((req, res) => {
    if (req.url === '/users/register' && req.method === 'GET') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(`JSON: ${body}`)
        });
        connectToDatabase(body.username, body.password)

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server on port ${PORT}`))