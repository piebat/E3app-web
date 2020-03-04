mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived =  MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;

Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
	mqttClient.connect({
		onSuccess: Connected,
		onFailure: ConnectionFailed,
		keepAliveInterval: 10,
		userName: username,
		useSSL: true,
		password: passWord	
	});
}

/*Callback for successful MQTT connection */
function Connected() {
  console.log("Connected");
  document.getElementById("stato_connessione").innerHTML= "Connessione avvenuta... ";
  mqttClient.subscribe(subscription);
}

/*Callback for failed connection*/
function ConnectionFailed(res) {
	console.log("Connect failed:" + res.errorMessage);
	document.getElementById("stato_connessione").innerHTML= "Connessione fallita...  " + res.errorMessage ;
}

/*Callback for lost connection*/
function ConnectionLost(res) {
  if (res.errorCode != 0) {
	console.log("Connection lost:" + res.errorMessage);
	document.getElementById("stato_connessione").innerHTML= "Connessione persa...  " + res.errorMessage ;
	Connect();
  }
}

/*Callback for incoming message processing */
function MessageArrived(message) {
	console.log(message.destinationName +" : " + message.payloadString);
	document.getElementById("messaggi").value = document.getElementById("messaggi").value +"\n"+ message.destinationName +" : " + message.payloadString;
	
}