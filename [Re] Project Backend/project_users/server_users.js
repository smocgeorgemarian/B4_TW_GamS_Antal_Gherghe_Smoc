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
    
    if(req.url === '/services/username/rewards' && req.method === 'POST'){
        Controller.servicesUsernameGetRewards(req, res);
    }else if(req.url === '/services/username/rewards/all' && req.method === 'POST'){
        Controller.servicesUsernameGetAllRewards(req, res);
    }else if(req.url === '/services/username/level' && req.method === 'POST'){
        Controller.servicesUsernameGetLevel(req, res);
    }else if(req.url === '/services/username/xp' && req.method === 'POST'){
        Controller.servicesUsernameGetXp(req, res);
    }else if(req.url === '/services/username/update' && req.method === 'PUT'){
        Controller.servicesUsernameUpdateProgress(req, res);
    }else if(req.url === '/services/username/add' && req.method === 'PUT'){
        Controller.servicesUsernameAddToEvent(req, res);
    }else if(req.url === '/services/username/addlevel' && req.method === 'PUT'){
        Controller.servicesUsernameAddToLevel(req, res);
    }else if(req.url === '/services/username/delete' && req.method === 'DELETE'){
        Controller.servicesUsernameDelete(req, res);
    }else{
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }

})

const PORT = 5002
serverServices.listen(PORT, () => console.log(`Server on port ${PORT}`))