const mongoose = require('mongoose')

let database
let UserSchema
let UserModel

const connectDB = () => {
    const databaseUrl = 'mongodb://admin:1234@ds257485.mlab.com:57485/doitnodejs'

    mongoose.Promise = global.Promise
    mongoose.connect(databaseUrl)
    database = mongoose.connection
    
    // 데이터베이스 연결 시 동작
    database.on('open', () => {
        console.log(`데이터베이스에 연결됨 : ${databaseUrl}`)

        createUserSchema()

        // doTest()
        doTest2()
    })

    database.on('disconnected', () => {
        console.log('데이터베이스 연결 해제')
    })

    database.on('error', console.error.bind(console.log, 'mongoose 연결 에러'))
}

const createUserSchema = () => {
    UserSchema = mongoose.Schema({
        id: { type: String, required: true, unique: true },
        name: { type: String, index: 'hashed' },
        age: { type: Number, default: -1 },
        created_at: { type: Date, index: { unique: false }, default: Date.now() },
        updated_at: { type: Date, index: { unique: false }, default: Date.now() }
    })

    UserSchema.virtual('info')
        .set(function (info) {
            const splitted = info.split(' ')
            const [id, name] = splitted
            this.id = id
            this.name = name

            console.log(`virtual info 속성 설정됨 : ${id} ${name}`)
        })
        .get(function () {
            return `${this.id} ${this.name}`
        })

    UserModel = mongoose.model('user4', UserSchema)
}

const doTest = () => {
    const user = new UserModel({'info': 'test03 소녀시대3'})
    user.save((err) => {
        if (err) {
            console.log('에러 발생')
            return false
        }

        console.log('데이터 추가')
    })
}

const doTest2 = () => {
    const a = UserModel.findOne({ 'id': 'test01' }, function () {
        console.dir(arguments)
    })
}

connectDB()


