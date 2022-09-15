const { connect } = require('http2');
const { connection } = require('websocket');

var express = require('express'),
    path = require('path'),
    app = express(),
    mormalmidi = require('mormalmidi'),
    websocketserver = require('websocket').server,
    http = require('http');

var clientConnection;

  const server = http.createServer(function(request,response){
    console.log((new Date()) + ' Recieved request for ' + request.url);
    response.writeHead(404);
    response.end();
  }); 

  server.listen(8081, function(){
    console.log((new Date()) + ' Server is listening on port 8081');
  });

  const wsServer = new websocketserver({
      httpServer: server,
      autoAcceptConnections: false
  });

  function originIsAllowed(origin){
    return true;
  }

  wsServer.on('request', function(request){
    if (!originIsAllowed(request.origin)){
      request.reject();
      console.log((new Date()) + ' Connection from Origin' + request.origin + ' not accepted');
      return;
    }
    
    clientConnection = request.accept(null, request.origin);
  
    console.log((new Date()) + ' Connection request from' + request.origin + ' accepted');
  });


  function sendMessage(message){
    clientConnection.send(message);
  }

mormalmidi.init();

mormalmidi.addMapping(80, cc80);

function cc80(value){
  sendMessage(value);
}



app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});