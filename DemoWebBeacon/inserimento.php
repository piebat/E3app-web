<?php
   	
	include("accesso_db.php");

	echo("file php<br>");
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	if (!$conn) {
		   die("Connection failed: " . mysqli_connect_error());
	}
	
	//Leggo alcune variabili presenti nella post
	$Nome = $_POST['nome'];
	$Cognome = $_POST['cognome'];
	$Codice = $_POST['codice'];
	$Gruppo = $_POST['gruppo'];
	$Cabina = $_POST['cabina'];
	
	$toinsert = "INSERT INTO utente(Codice, Nome, Cognome, Gruppo, Cabina)VALUES('$Codice','$Nome','$Cognome','$Gruppo','$Cabina')";
	//$toinsert = "INSERT INTO utente(Codice, Nome, Cognome, Gruppo, Cabina)VALUES('4','ome','ognome','uppo','abina')";
	//Eseguo la query
	if (mysqli_query($conn, $toinsert)) {
	   $last_id_RIS = mysqli_insert_id($conn);
	   echo("Inserimento avvenuto correttamente <br>");
	} else{
		echo("Inserimento non riuscito della risorsa, riprova più tardi!".$toinsert."<br>");
		die("Inserimento non riuscito, riprova più tardi!<br>");
	}
                    
                   
    


