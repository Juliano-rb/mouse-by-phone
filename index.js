const express = require('express'),
      server = express(),
      bodyParser = require('body-parser');

const cors = require('cors')

function startServer(){
   setUpServer();
   listenDeviceData();
   serveClientAplication();

   function setUpServer(){
      server.set('port', process.env.PORT || 3000);
      server.use(bodyParser.json()); // for parsing application/json
      server.use(cors()); 

      server.listen(3000, ()=>{
         console.log('Express server started at port 3000');
      });
   }

   function listenDeviceData(){
      server.post('/', function (req, res) {
         if(req.body.title == "sensors_data"){
             console.log(req.body.message);
         }
         res.send("Server received the message");
     })
   }

   function serveClientAplication(){
      //Basic routes
      server.get('/', (request,response)=>{
         //response.send('Home page');
         response.sendFile(__dirname + '/client/index.html');
      });
      server.get('/js/client.js', (request,response)=>{
         response.sendFile(__dirname + '/client/js/client.js');
      });
      server.get('/js/gyronorm.complete.js', (request,response)=>{
         response.sendFile(__dirname + '/client/js/gyronorm.complete.js');
      });
      server.get('/js/SensorsHandlerAndComunication.js', (request,response)=>{
         response.sendFile(__dirname + '/client/js/SensorsHandlerAndComunication.js');
      });
      server.get('/js/jquery-3.3.1.min.js', (request,response)=>{
         response.sendFile(__dirname + '/client/js/jquery-3.3.1.min.js');
      });
      server.get('/bootstrap-4.3.1-dist/css/bootstrap.min.css', (request,response)=>{
         response.sendFile(__dirname + '/client/bootstrap-4.3.1-dist/css/bootstrap.min.css');
      });
      server.get('/bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js', (request,response)=>{
         response.sendFile(__dirname + '/client/bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js');
      });
   }
}

startServer();