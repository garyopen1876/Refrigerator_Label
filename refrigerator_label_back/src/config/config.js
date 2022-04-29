require("dotenv").config();
module.exports = {
    "development": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "logging": process.env.DB_LOGGING,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {"ssl": {"require": true,"rejectUnauthorized": false}},
    },
    "test": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "logging": process.env.DB_LOGGING,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {"ssl": {"require": true,"rejectUnauthorized": false}} 
    },
    "production": {
        "username": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "logging": process.env.DB_LOGGING,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {"ssl": {"require": true,"rejectUnauthorized": false}} 
    }
};
