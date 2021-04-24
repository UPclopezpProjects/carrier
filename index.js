'user strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3003;
var mongoDB = 'mongodb://host.docker.internal:27017/carriers';
//var mongoDB = 'mongodb://172.17.0.1:27017/carriers';

mongoose.connect(mongoDB, {useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("Conexión exitosa (Base de datos)...");
		app.listen(port, function(){
			console.log("Microservicio 'Carrier' escuchando en -> http://localhost:"+port);
		});
	}
});
