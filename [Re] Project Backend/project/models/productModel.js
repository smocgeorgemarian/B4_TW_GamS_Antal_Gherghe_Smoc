const products = require('../test-data/products')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

module.exports = {
    findAll
}
