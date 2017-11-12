const fs = require('fs')

const data = fs.readFileSync('./../package.json', 'utf8')
console.log(data)
/*
    {
        "name": "do-it-nodejs",
        "version": "1.0.0",
        "main": "index.js",
        "license": "MIT"
    }
*/