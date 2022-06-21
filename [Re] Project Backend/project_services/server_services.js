const http = require('http')
const Controller = require('./controllers/controller')

function setCORSPolicy(res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Max-Age', 2592000) // 30 days

}

const serverServices = http.createServer((req, res) => {
    setCORSPolicy(res)
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
        return
    }
    
    if(req.url === '/services/add/event' && req.method === 'PUT'){
        Controller.servicesAddEvent(req, res);
    }else if(req.url === '/services/add/reward' && req.method === 'PUT'){
        Controller.servicesAddReward(req, res);
    }else if(req.url === '/services/add/level' && req.method === 'PUT'){
        Controller.servicesAddLevel(req, res);
    }else if(req.url === '/services/update/reward' && req.method === 'PUT'){
        Controller.servicesUpdateReward(req, res);
    }else if(req.url === '/services/update/level' && req.method === 'PUT'){
        Controller.servicesUpdateLevel(req, res);
    }else if(req.url === '/services/delete/event' && req.method === 'DELETE'){
        Controller.servicesDeleteEvent(req, res);
    }else if(req.url === '/services/delete/reward' && req.method === 'DELETE'){
        Controller.servicesDeleteReward(req, res);
    }else if(req.url === '/services/delete/level' && req.method === 'DELETE'){
        Controller.servicesDeleteLevel(req, res);
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }

})

const PORT = 5001
serverServices.listen(PORT, () => console.log(`Server on port ${PORT}`))