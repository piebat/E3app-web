<?php
include ("accesso_db.php");
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo "{messaggio:\"Connessione fallita riprova più tardi\"}";
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT Gruppo FROM utente WHERE 1 GROUP BY Gruppo";
$result = [];
$stmt = $conn->query($sql);
while ($row = $stmt->fetch_assoc()) {
    $result[] = $row;
}
echo json_encode($result);
$conn->close();