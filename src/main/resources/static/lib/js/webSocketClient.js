
var ws;
var isconnected = false;
function setConnected(connected) {
    isconnected = connected;
}

function connect() {
	ws = new WebSocket('ws://localhost:8090/connect');
	ws.onmessage = function(data){
		showGreeting(data.data);
	}
	 setConnected(true);
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	var data = JSON.stringify({'name': 'world'})
    ws.send(data);
}

function showGreeting(message) {
    alert('test :'+ message)
    console.log('log :', message)
}


