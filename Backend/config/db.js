const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL conectado...');
    } catch (err) {
        console.error('❌ Error al conectar a PostgreSQL:', err.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
