
/*
 * 설정
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://admin:1234@ds257485.mlab.com:57485/doitnodejs',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
    ],
    jsonrpc_api_path: '/api',
	facebook: {		// passport facebook
		clientID: '503660400000009',
		clientSecret: '55404565d7643a9dfec1b9af1e479f8d',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
    }
    ,
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	}
}