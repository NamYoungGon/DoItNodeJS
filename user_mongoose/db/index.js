const mongoose = require('mongoose')
const User = require('./models/User')

module.exports = (function () {
   
    const databaseUrl = 'mongodb://admin:1234@ds257485.mlab.com:57485/doitnodejs'
    mongoose.Promise = global.Promise

    return () => {
        return mongoose
            .connect(databaseUrl)
            .then(() => console.log('데이터베이스 연결'))
            .catch((e) => console.log('데이터베이스 연결 에러'))
    }

})()