/*this file is a test server file for the webserver pi
    this file can do things like send data up to the page,
    handle clicks and messages on the page. 
    This code (or what will become of it) will eventually be integrated into Nari's webserver
    to expose server to whole network and not just localhost, listen needs a second argument
    for the hostname='ip address'
    also set the client connect from localhost to the ip address of the other pi
*/ 
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var other_server = require('socket.io-client')('http://localhost:8080');
    other_server.on('connect', function(){
        console.log('Connected!');
        other_server.emit('message', 'test message');
    });
  other_server.on('event', function(data){});
  other_server.on('disconnect', function(){});
other_server.connect();

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){

    for(i = 0; i < 100; i++){
        var rand = Math.floor((Math.random() * 100) + 1);
        io.emit('data', rand);
    }

    socket.on('activate', function(msg){
        //execute code here
        other_server.emit('kill');
        console.log('activation button pressed');
    });

    socket.on('deactivate', function(msg){
        //execute code here
        other_server.emit('message', 'activate');
        console.log('activation button pressed');
    });
    
    socket.on('command', function(msg){
        other_server.emit('message', msg);
        console.log('command: ' + msg);

    });

    other_server.on('message', function(msg){
        console.log('message from pi is: '+msg);
    });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});