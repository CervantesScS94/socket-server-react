class Socket{
    constructor(io){
        this.io = io;
        this.socketsEvent();
    }

    socketsEvent(){
        this.io.on("connection", (socket) => {
            socket.emit("mensaje-bienvenido", [
                {
                    ok: true,
                    mensaje: "HOLA MUNDO!!",
                },
            ]);

            socket.on("mensaje-to-server", (data) => {
                this.io.emit("mensaje-from-server", data);
            });
        });
    }
}

module.exports = Socket;