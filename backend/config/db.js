require('dotenv').config();
const {Sequelize} = require('sequelize');
const colors = require('colors');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log,
})

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL Connected'.cyan.underline);
    } catch (error) {
        console.log('Unable to connect to database', error);
        process.exit(1);
    }
}

module.exports = { sequelize, connectDB };