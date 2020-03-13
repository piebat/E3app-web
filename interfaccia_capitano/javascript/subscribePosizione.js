mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived =  MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;

var subscription = "pos/+";
var arrayUtenti = [];

Connect();


function mostraUtenti(numero){
	alert("Attualmente ci sono " + numero + " utenti in questa posizione");
}

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
	var topic = message.destinationName;
	var codice = topic.substring(4);
	var posizione = message.payloadString;
	var arr = posizione.split(" ");

	var x = parseInt(arr[0]);
	var y = parseInt(arr[1]);
	var utente = {
			'codice' : codice, 
			'x': x, 
			'y': y
	};
	var coordinate = cambiaCoordinate(utente);
	
	if(coordinate.nuove){
		incrementaDimensione(coordinate.x, coordinate.y);
		return;
	}

	if((utente.x != coordinate.x) || (utente.y != coordinate.y)){
		decrementaDimensione(coordinate.x, coordinate.y);
		incrementaDimensione(utente.x, utente.y);
	}
	
}

/***********************************************************************************
 * Questa funzione cambia le coordinate di ogni utente presente 
 * all'interno dell'array e restituisce l'ultima coordinata in cui l'utente è stato 
 ***********************************************************************************/
function cambiaCoordinate(utente){
	
	/*
	 * Se l'array non è vuoto, controlliamo che l'utente sia presente all'interno
	 * Se non è presente, dunque alla fine del for non è mai fatto il return, 
	 * esce fuori dall'if e inserisce il nuovo utente
	 */
	
	if(arrayUtenti.length != 0){
		for(var i = 0;  i < arrayUtenti.length; i++){
			console.log(arrayUtenti[i].codice);
			if(utente.codice == arrayUtenti[i].codice){
				
				var x = arrayUtenti[i].x;
				var y = arrayUtenti[i].y;

				arrayUtenti[i].x = utente.x;
				arrayUtenti[i].y = utente.y;

				return {
					"nuove": false,
					"x": x, 
					"y": y 
				};

			}
		}

	}
	/*
	 * Questo vien efatto nel caso in cui l'array è
	 *  vuoto o l'utente non è presente all'interno di esso
	 */
	arrayUtenti.push(utente);
	return {
		"nuove": true,
		"x": utente.x, 
		"y": utente.y 
	};

}

function incrementaDimensione(x,y){

	var canvas = document.getElementById(""+x+"-"+y);
	
	/*
	 * Con questo IF controlliamo che il nodo che stiamo per disegnare non sia presente già
	 * */
	if(canvas ==  null){
		
		var cnvs = document.createElement("canvas");
		cnvs.setAttribute('id', x+"-"+y);
		cnvs.setAttribute('data-x', x);
		cnvs.setAttribute('data-y', y);
		cnvs.setAttribute('num-utenti', 1);
		cnvs.setAttribute('onclick', 'mostraUtenti('+1+')');
		cnvs.classList.add("canvas");
		var contenuto = document.getElementById("contenuto");
		contenuto.appendChild(cnvs);
		cnvs.style.width = (10 +"px");
		cnvs.style.height = (10 +"px");
		cnvs.style.position = "absolute";
		cnvs.style.left = x + "px";
		cnvs.style.top = y + "px";
		var ctx = cnvs.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = 'rgb(200, 0, 0)';
		ctx.fillRect(1, 1, 500, 500);
		ctx.stroke();
	}

	/**
	 * Questo else viene fatto se sono gia presenti utenti all'interno di questo vertice
	 */
	else{
		var canvasAttuale = $("#"+x+"-"+y);
		var num_utenti = parseInt(canvasAttuale.attr('num-utenti'));
		num_utenti = num_utenti + 1;
		canvasAttuale.remove();
		var cnvs = document.createElement("canvas");
		cnvs.setAttribute('id', x+"-"+y);
		cnvs.setAttribute('data-x', x);
		cnvs.setAttribute('data-y', y);
		cnvs.setAttribute('num-utenti', num_utenti);
		cnvs.setAttribute('onclick', 'mostraUtenti('+num_utenti+')');
		cnvs.classList.add("canvas");		
		var contenuto = document.getElementById("contenuto");
		contenuto.appendChild(cnvs);
		cnvs.style.width = ((10 + (num_utenti * 2)) +"px");
		cnvs.style.height = ((10 + (num_utenti * 2)) +"px");
		cnvs.style.position = "absolute";
		cnvs.style.left = x + "px";
		cnvs.style.top = y + "px";
		var ctx = cnvs.getContext("2d");
		ctx.beginPath();
		ctx.fillStyle = 'rgb(200, 0, 0)';
		ctx.fillRect(1, 1, 500, 500);
		ctx.stroke();
	}
}

function decrementaDimensione(x,y){


	var canvas = document.getElementById(""+x+"-"+y);

	if(canvas != null){

		var canvasAttuale = $("#"+x+"-"+y);
		var num_utenti = parseInt(canvasAttuale.attr('num-utenti'));
		num_utenti = num_utenti -1;
		canvasAttuale.remove();
		if(num_utenti > 0){
			var cnvs = document.createElement("canvas");
			cnvs.setAttribute('id', x+"-"+y);
			cnvs.setAttribute('data-x', x);
			cnvs.setAttribute('data-y', y);
			cnvs.setAttribute('num-utenti', num_utenti);
			cnvs.setAttribute('onclick', 'mostraUtenti('+num_utenti+')');
			cnvs.classList.add("canvas");		
			var contenuto = document.getElementById("contenuto");
			contenuto.appendChild(cnvs);
			cnvs.style.width = ((10 + (num_utenti * 2)) +"px");
			cnvs.style.height = ((10 + (num_utenti * 2)) +"px");
			cnvs.style.position = "absolute";
			cnvs.style.left = x + "px";
			cnvs.style.top = y + "px";
			var ctx = cnvs.getContext("2d");
			ctx.beginPath();
			ctx.fillStyle = 'rgb(200, 0, 0)';
			ctx.fillRect(1, 1, 500, 500);
			ctx.stroke();
		}
	}
}




