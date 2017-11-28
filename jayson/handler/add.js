const add = (params, callback) => {
    console.log(`PARAMS -> ${JSON.stringify(params)}`)

    const [a, b] = params
    const output = a + b

    callback(null, output)
}

module.exports = add