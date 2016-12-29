ws = new WebSocket('ws://localhost:8080/questions');
	ws.onmessage = function(data){
		showGreeting(data.data);
	}

