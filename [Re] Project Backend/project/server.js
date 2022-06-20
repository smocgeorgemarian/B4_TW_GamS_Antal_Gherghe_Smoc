const http = require('http')
const Controller = require('./controllers/controller')

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

    if (req.url === '/users/register' && req.method === 'POST'){
        Controller.userRegister(req, res);
    }else if(req.url === '/users/login' && req.method === 'POST'){
        Controller.userLogin(req, res);
    }else if(req.url === '/users/logout' && req.method === 'POST'){
        Controller.userLogout(req, res);
    }else if(req.url === '/users/events' && req.method === 'POST'){
        Controller.userGetEvents(req, res);
    }else if(req.url === '/users/rewards' && req.method === 'POST'){
        Controller.userGetRewards(req, res);
    }else if(req.url === '/users/levels' && req.method === 'POST'){
        Controller.userGetLevels(req, res);
    }else if(req.url === '/users/top' && req.method === 'POST'){
        Controller.userGetTop(req, res);
    }else if(req.url === '/users/delete' && req.method === 'DELETE'){
        Controller.userDelete(req, res);
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }

});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server on port ${PORT}`))

module.exports = {
    setCORSPolicy
}