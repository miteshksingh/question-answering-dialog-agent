const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const socket = io();



recognition.lang = 'en-US';
recognition.interimResults = false;

/***** Question Answering System *************/
document.getElementById('submitForm').addEventListener('click',
	() => {

       var passage = document.getElementById("passage").value;
       var question = document.getElementById("question").value;
       var url = 'http://localhost:1234?passage='+passage+'&question='+question;
       socket.emit('submit btn clicked', url);
	});

socket.on('answer received', function(replyText) {
	document.getElementById("answer").innerHTML = replyText;
});


/*************** Chatbot **************************/
document.getElementById('userSpeak').addEventListener('click',
	() => {

		var elem = document.querySelector('i');
		elem.style.color = "#28a745";
        console.log("Recognized your voice");
		recognition.start();
	})

recognition.addEventListener('result', (e) => {

	console.log("Received response");
	let last = e.results.length - 1;
	let text = e.results[last][0].transcript;

    console.log(text);
	console.log('Confidence: '+e.results[0][0].confidence);

	var elem = document.getElementById("user-speech");
	elem.innerHTML = text + '\n (Confidence: '+ e.results[0][0].confidence.toFixed(2) + ' )';
	//Socket.IO
	socket.emit('chat message', text);
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  //utterance.voice = voices[54];

  synth.speak(utterance);

}

socket.on('bot reply', function(replyText) {

	var elem = document.getElementById("bot-speech");
	elem.innerHTML = replyText;

	var elem = document.querySelector('i');
	elem.style.color = "black";

    synthVoice(replyText);
});



