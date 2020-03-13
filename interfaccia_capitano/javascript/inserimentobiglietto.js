
function inserisciBiglietto() {
	var erroreCodice = $("#erroreCodice").val();
	if(erroreCodice == "OK"){
		var codiceBiglietto = $("#codiceBiglietto").val();

		var nomeBiglietto = $("#nomeBiglietto").val();
		var cognomeBiglietto = $("#cognomeBiglietto").val();
		var gruppoBiglietto = $("#gruppoBiglietto").val();
		var cabinaBiglietto = $("#cabinaBiglietto").val();

		$.ajax({
			dataType: "text",
			type: 'POST',
			url: 'php/inserimentobiglietto.php',
			data:  'codiceBiglietto='+codiceBiglietto+'&nomeBiglietto='+nomeBiglietto+'&cognomeBiglietto='+cognomeBiglietto+'&gruppoBiglietto='+gruppoBiglietto+'&cabinaBiglietto='+cabinaBiglietto,
			beforeSend: function() {
				//$('#load').show();

			},
			success: function(data){
				//$('#load').hide();
				if(data != "[]"){
					customAlert("Utente registrato correttamente"); 
				}

			},

			error: function(xhr, status, error) {
				alert(xhr.responseText);
			},

		});
	}
	else{
		customAlert("Codice biglietto già presente"); 
	}


}

function checkCodiceBiglietto() {

	var codiceBiglietto = $("#codiceBiglietto").val();
	
	$.ajax({
		dataType: "text",
		type: 'GET',
		url: 'php/checkCodice.php',
		data:  'codiceBiglietto='+codiceBiglietto,
		beforeSend: function() {
			//$('#load').show();

		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]"){
				$("#erroreCodice").val("OK");
			}
			else{
				$("#erroreCodice").val("ERRORE");
			}

		},
		error: function(xhr, status, error) {
			//alert(error);
		},

	});
}



