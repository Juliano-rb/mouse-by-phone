const express = require('express'),
      server = express(),
      bodyParser = require('body-parser');

const mouseController = require("./mouse-controller.js");

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
         console.log('Go to ' + '\x1b[36m%s\x1b[0m' + ":3000", 'your-ip');  //cyan)
      });
   }

   function listenDeviceData(){
      server.post('/', function (req, res) {
         if(req.body.title == "sensors_data"){
            data = req.body.message;
            console.log(data);
            mouseController.moveMouse(data.rotationRate.x, data.rotationRate.y);
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