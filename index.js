var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
io.on("connection", function(socket){
  console.log('a user connected');
  io.emit('chat message', 'Somone Joined the chat');
  socket.on("chat message", function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on("disconnect", function(){
    console.log('user disconnected');
    io.emit('chat message', 'user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listenting on *:3000');
});
