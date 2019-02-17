const express = require('express');
const app = express();
const request = require('request');

//Starting app server
app.use(express.static(__dirname + '/views')); //html
app.use(express.static(__dirname + '/public')); //css, images

console.log("Debugging");
const server = app.listen(5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

//Starting a socket connection whenever a user connects
const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')('45d0a4d05f57497ebcf69ac38f0fb4e5');

io.on('connection', function(socket) {
	socket.on('chat message', (text) => {


		let apiaiReq = apiai.textRequest(text, {
			sessionId: "firstUser"
		});


        apiaiReq.on('response', (response) => {
        	let aiText = response.result.fulfillment.speech;
        	socket.emit('bot reply', aiText);
        });

        apiaiReq.on('error', (error) => {
			console.log(error);
		});

		apiaiReq.end();
	});


	socket.on('submit btn clicked', (url) => {
        request(
        	{
    			method: 'GET',
   				uri: url
   			},
			function (error, response, body) 
			{
			    if (error) {
			      socket.emit('answer received', error);
			      return console.error(error);
			    }

			    socket.emit('answer received', body);
			}
		)
	});


	


});