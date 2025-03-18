const { Sequelize } = require('sequelize');
const config = require('./config');
const sequelize = new Sequelize(
	config.db.database,
	config.db.username,
	config.db.password,
	{
		host: config.db.host,
		dialect: config.db.dialect,
		logging: false // para evitar que muestre los logs en consola
	}
);

const connectDB = async () => {
	try{
		await sequelize.authenticate();
		console.log('PostgreSQL conectado...');
	}catch(err){
		console.error('Error al conectar a PostgreSQL: ', err.message);
		process.exit(1); // termina el proceso en caso de error
	}
}; 
	
module.exports = { sequelize, connectDB};