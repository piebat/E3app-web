function inviaMessaggio()
{
	var topic = document.getElementById("topic").value;
	var messaggio = document.getElementById("messaggio").value;
	var message = new Paho.MQTT.Message(messaggio);
	message.destinationName = topic;

	
	mqttClient.send(message);
	$.ajax({
		dataType: "text",
		type: 'POST',
		url: 'php/messaggi.php',
		data:  'topic='+topic+'&messaggio='+messaggio,
		beforeSend: function() {
			//$('#load').show();

		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]"){
				customAlert("Messaggio inviato"); 
			}


		},

		error: function()
		{
			customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
			//document.getElementById("error_dettagli").innerHTML = "";
		}

	});
}

function inviaMessaggioEmergenza(topic,messaggio)
{
	var topic = topic;
	var messaggio = messaggio;
	var message = new Paho.MQTT.Message(messaggio);
	message.destinationName = topic;

	
	mqttClient.send(message);
	$.ajax({
		dataType: "text",
		type: 'POST',
		url: 'php/messaggi.php',
		data:  'topic='+topic+'&messaggio='+messaggio,
		beforeSend: function() {
			//$('#load').show();

		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]"){
				customAlert("Messaggio inviato"); 
			}


		},

		error: function()
		{
			customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
			//document.getElementById("error_dettagli").innerHTML = "";
		}

	});
}