<?php
include ("accesso_db.php");
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (! $conn) {
    die("Connection failed: " . mysqli_connect_error());
}

/*$codiceBiglietto = mysqli_real_escape_string($conn, $_REQUEST['Codice']);
$nomeBiglietto = mysqli_real_escape_string($conn, $_REQUEST['Nome']);
$cognomeBiglietto = mysqli_real_escape_string($conn, $_REQUEST['Cognome']);
$gruppoBiglietto = mysqli_real_escape_string($conn, $_REQUEST['Gruppo']);
$cabinaBiglietto = mysqli_real_escape_string($conn, $_REQUEST['Cabina']);*/
$codiceBiglietto = $_POST['codiceBiglietto'];
$nomeBiglietto =  $_POST['nomeBiglietto'];
$cognomeBiglietto =  $_POST['cognomeBiglietto'];
$gruppoBiglietto =  $_POST['gruppoBiglietto'];
$cabinaBiglietto =  $_POST['cabinaBiglietto'];


$toinsert = "INSERT INTO utente(Codice,Nome,Cognome,Gruppo,Cabina) 
        VALUES('$codiceBiglietto','$nomeBiglietto','$cognomeBiglietto','$gruppoBiglietto','$cabinaBiglietto')";
if (mysqli_multi_query($conn, $toinsert)) {
    echo ("Inserimento riuscito");
} else {
    echo (mysqli_error($conn) . "" . $toinsert);
    die("Inserimento non riuscito, riprova più tardi!");
}

mysqli_close($conn);
