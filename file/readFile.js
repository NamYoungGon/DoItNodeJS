const fs = require('fs')

fs.readFile('./../package.json', 'utf8', (err, data) => {
    console.log(typeof data)
})
/*
    {
        "name": "do-it-nodejs",
        "version": "1.0.0",
        "main": "index.js",
        "license": "MIT"
    }
*/