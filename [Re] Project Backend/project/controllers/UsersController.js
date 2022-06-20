function getStatusCodeForMessage(value) {
    if (value === '0') return 403
    if (value === '404') return 404
    if (value === 'error') return 500
    return 200
}

function getBody(req) {
    let body = ''
    req.on('data', chunk => {
        body += chunk;
    });
    return body;
}
