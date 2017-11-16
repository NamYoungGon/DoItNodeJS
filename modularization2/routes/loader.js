const loader = {}

const config = require('./../config')

loader.init = (app, router) => {
    connect(app, router)
}

function connect(app, router) {
    let curModule

    config.route.forEach((data, index) => {
        curModule = require(data.file)
        router.route(data.path)[data.type](curModule[data.method])
    })

    app.use('/', router)
}

module.exports = loader