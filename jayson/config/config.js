
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
    jsonrpc_api_path: '/api'
}