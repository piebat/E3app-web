function inviaMessaggio()
{
	var stringa = document.getElementById("messaggio").value;
	var message = new Paho.MQTT.Message(stringa);
	message.destinationName = "test/pc";
	mqttClient.send(message);
}