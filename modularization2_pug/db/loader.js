const mongoose = require('mongoose')

const loader = {}

loader.init = function (app, config) {
    connect(app, config)
}

function connect(app, config) {
    mongoose.Promise = global.Promise
    mongoose.connect(config.db.url)
    loader.db = mongoose.connection

    // 데이터베이스 연결 시 동작
    loader.db.on('open', () => {
        console.log(`데이터베이스에 연결됨 : ${config.db.url}`)
        
        createSchema(app, config)
    })
    
    loader.db.on('disconnected', () => {
        console.log('데이터베이스 연결 해제')
    })
    
    loader.db.on('error', console.error.bind(console.log, 'mongoose 연결 에러'))
}

function createSchema(app, config) {
    let curSchema
    let curModel
    config.db.schemas.forEach((data, index) => {
        curSchema = require(data.file).createSchema(mongoose)
        curModel = mongoose.model(data.collection, curSchema)

        loader[data.schemaName] = curSchema
        loader[data.modelName] = curModel
    })

    app.set('database', loader)
}

module.exports = loader