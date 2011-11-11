var app = require('express').createServer()
,io = require('socket.io').listen(app);

app.get('/', function(req, res, next){
  res.sendfile(__dirname + '/public/index.html');
});

app.listen(8333, "127.0.0.1");

console.log('Server running at http://127.0.0.1:8833/');


var allClients = 0;
var clientId = 1;

io.sockets.on('connection', function(client) {
  var my_client = {"id": clientId, "obj": client};
  clientId += 1;
  allClients += 1;
  
  io.sockets.emit('message', JSON.stringify({"clients": allClients}));
  
  client.on('message', function(data) {
    io.sockets.emit('message', JSON.stringify({message: my_client.id + " a dit : " + data}));
    console.log(data);
  });
  
  client.on('disconnect', function() {
    allClients -= 1;
    io.sockets.emit('message', JSON.stringify({"clients": allClients}));
  });
});

