/*this file is for the satellite pi's attached to each arduino.
    there isnt any code yet to support receiving data from arduino via UART
    to expose server to whole network and not just localhost, listen needs a second argument
    for the hostname='ip address'
    also set the client connect from localhost to the ip address of the other pi
*/ 
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/*var SerialPort = require("serialport");

var serialPort = new SerialPort("", {
    baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log(data);
  });
});
*/
app.get('/', function(req, res){
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>404</h1>');
});

var other_server = require('socket.io-client')('http://localhost:3000');
    other_server.on('connect', function(){
        console.log('Connected!');
        other_server.emit('message', 'test message');
    });
  other_server.on('event', function(data){});
  other_server.on('disconnect', function(){});
other_server.connect();
console.log('connected to other server');


io.on('connection', function(other_server){
    //for now just echo code
    other_server.on('message', function(msg){
        console.log('message is: '+msg);
        other_server.emit('message', 'received');
    });
   
    other_server.on('kill', function(){
        other_server.emit('message', 'kill command received');
        console.log('KILL SWITCH PRESSED ON WEB PAGE');
    });
    other_server.on('activate', function(){
        other_server.emit('message', 'activate command received');
        console.log('ACTIVATION SWITCH PRESSED ON WEB PAGE');
    });

    //can add code here that will be triggered by socket events from other server
});




http.listen(8080, function(){
  console.log('listening on *:8080');
});