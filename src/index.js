const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('../src/routes/index');

const db = require('../src/models/index');


const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server Started on Port: ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
    });
}

prepareAndStartServer();