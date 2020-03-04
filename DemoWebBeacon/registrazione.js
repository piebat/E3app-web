//funzione ajax per la ricerca della risorsa 
function inserisci()
{
	alert("sono qua");
			var codice = $("#codice").val();
			var nome = $("#nome").val();
			var cognome = $("#cognome").val();
			var gruppo = $("#gruppo").val();
			var cabina = $("#cabina").val();
			alert("sono qua1");
			$.ajax({
			dataType: "text",
			type: 'POST',
			url: 'inserimento.php',
			data:  'nome='+nome+'&codice='+codice+'&cognome='+cognome+'&groppo='+gruppo+'&cabina='+cabina,
			beforeSend: function() {
					//$('#load').show();
					alert("beforeSend");
				},
			success: function(data){
				//$('#load').hide();
				if(data.length > 0) {
					//$("#risultatiRicerca").html(data);
					alert(data);
				}
				
				else{
					alert("risposta vuota"); //sempre meglio impostare una callback in caso di fallimento
				}
				
			},
			
			error: function()
			{
				alert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
				//document.getElementById("error_dettagli").innerHTML = "";
			}
		});
		alert("sono qua2");
}
