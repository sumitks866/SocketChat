const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname));

const Server = app.listen(8000);
const io = socketio(Server);

const opn = require('opn')
opn('http://localhost:8000/index.html')

io.on('connect',(socket)=>{
    socket.emit('confirm','server is live');
    socket.on('reply',(data)=>{
        console.log(data);
    })
    socket.on('chatmsg',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('forward',msg);
    })
})
