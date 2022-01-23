const express = require('express');
const cors = require('cors');
//const router = require('../routes/router');
const {dataBase} = require('../db/dbConnection');
const { urlencoded } = require('express');


class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 3000

        this.dbConnection();
        this.middlewares();
        this.routes();
        
    }

    async dbConnection(){
        await dataBase();
    }


    middlewares(){
        this.app.use(express.json());// Entender los archivos JSON
        this.app.use(urlencoded({extended: false}));// Enviar datos desde un formulario html, para convertir a objeto JS
        this.app.use(cors())
    }

    routes(){
        this.app.use('/', require('../routes/router')); // Rutas 
    }

    listen(){
        this.app.listen(this.PORT, ()=>{
            console.log(`Servidor ON! en localhost:${this.PORT}`)
        })
    }

}

module.exports = Server;