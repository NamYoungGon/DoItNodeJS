const echo = (params, callback) => {
    console.log(`PARAMS -> ${JSON.stringify(params)}`)

    callback(null, params)
}

module.exports = echo