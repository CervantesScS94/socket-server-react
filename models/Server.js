const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Socket = require('./Socket');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //httpServer
        this.server = http.createServer(this.app);

        //configuraciones de socket
        this.io = socketIO(this.server,{
            // configuraciones
        });
    }

    middlewares(){
        this.app.use(express.static(path.resolve( __dirname,'../public')));
    }

    // Incializar la aplicacion
    execute(){
        this.middlewares();
        
        this.server.listen(this.port,() => {
            console.log(`Escuchando en el puerto: ${this.port}`);
        });

        this.initSocket();
    }

    initSocket(){
        new Socket(this.io);
    }
}

module.exports = Server;