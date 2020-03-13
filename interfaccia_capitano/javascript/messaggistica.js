

function changeTopic(topic){
	if(topic=="*"){
		$("#pannelloGruppi").html(""); 
		$("#pannelloSingolo").html("");
	}

	$("#topic").val("msg/"+topic);
}

function caricaGruppi(){
	$.ajax({
		dataType: "text",
		type: 'POST',
		url: 'php/caricaGruppi.php',
		beforeSend: function() {
			//$('#load').show();
		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]"){
				stampaGruppi(data);
			}
			else{
				customAlert("Non sono presenti gruppi");
			}
		},

		error: function()
		{
			customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
			//document.getElementById("error_dettagli").innerHTML = "";
		}
	});
}

function stampaGruppi(gruppi){
	$("#pannelloGruppi").html(""); 
	var array = JSON.parse(gruppi);
	for(var i = 0; i < array.length; i++){
		var newElement = '<input type="radio" name="gruppo" value="'+array[i].Gruppo+'" onclick="changeTopic(this.value),caricaSingolo(this.value)"> <i class="radio-destinatari"> '+array[i].Gruppo+'</i>' 
		$("#pannelloGruppi").html($("#pannelloGruppi").html()+" "+newElement);
	}
}

function caricaSingolo(gruppo){
	if($('#singolo').is(':checked')){
		$.ajax({
			dataType: "text",
			type: 'POST',
			url: 'php/caricaSingoli.php',
			data: 'gruppo='+gruppo,
			beforeSend: function() {
				//$('#load').show();
			},
			success: function(data){
				//$('#load').hide();
				if(data != "[]"){
					stampaSingolo(data, gruppo);
				}
				else{
				}
			},
			error: function()
			{
				customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
				//document.getElementById("error_dettagli").innerHTML = "";
			}

		});
	}
	else{
		$("#pannelloSingolo").html("");
	}
}

function stampaSingolo(data, gruppo) {
	$("#pannelloSingolo").html("");
	var array = JSON.parse(data);
	for(var i = 0; i < array.length; i++){
		var newElement = '<input type="radio" name="singolo" value="'+gruppo+'/'+array[i].Codice+'" onclick="changeTopic(this.value)"> <i class="radio-destinatari"> Codice: '+array[i].Codice+'Cognome: '+array[i].Cognome+' Nome: '+array[i].Nome+'</i>' 
		$("#pannelloSingolo").html($("#pannelloSingolo").html()+" "+newElement);
	}
}

function svuotaSingolo(){
	$("#pannelloSingolo").html("");
	$("#pannelloGruppo").html("");
}