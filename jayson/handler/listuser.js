const listuser = (params, callback) => {
    console.log(`PARAMS -> ${JSON.stringify(params)}`)

    const database = global.database;

    const error = {
        code: 410,
        message: 'database 객체 없음'
    }

    if (!database) {
        console.log('database 객체 없음')

        callback(error, null)

        return false
    } 

    if (database.db) {
        database.UserModel.findAll((err, results) => {
            if (err) {
                callback(error, null)

                return false
            }

            if (results) {
                const output = []
                results.forEach({ id, name } = result => {
                    output.push({ id, name })
                })

                callback(null, output)
            } else {
                callback(error, null)

                error.message = 'database 조회 결과가 없습니다'
                
                return false
            }
        })
    }
}

module.exports = listuser