<?php
include ("accesso_db.php");
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo "{messaggio:\"Connessione fallita riprova più tardi\"}";
    die("Connection failed: " . $conn->connect_error);
}
$codiceBiglietto = $_GET['codiceBiglietto'];
$sql = "SELECT * FROM utente WHERE utente.Codice=$codiceBiglietto";
$result = [];
$counter=0;
$stmt = $conn->query($sql);
while ($row = $stmt->fetch_assoc()) {
    $result[] = $row;
    $counter ++;
}

if ($counter == 0) {
    echo ("OK");
} 
$mysqli->close();