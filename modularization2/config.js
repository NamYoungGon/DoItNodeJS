const config = {
    port: 3000,
    db: {
        url: 'mongodb://admin:1234@ds257485.mlab.com:57485/doitnodejs',
        schemas: [
            { 
                file: './user_schema', 
                collection: 'users3', 
                schemaName: 'UserSchema',
                modelName: 'UserModel',

            }
        ]
    },
    route: [
        {
            file: './user', 
            path: '/process/login', 
            method: 'login',
            type: 'post'
        },
        {
            file: './user', 
            path: '/process/adduser', 
            method: 'addUser',
            type: 'post'
        },
        {
            file: './user', 
            path: '/process/listuser', 
            method: 'listUser',
            type: 'post'
        }
    ]
}

module.exports = config