<?php
include("accesso_db.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    echo "{messaggio:\"Connessione fallita riprova più tardi\"}";
    die("Connection failed: " . $conn->connect_error);
}
$piano = $_GET['piano'];
$sql = "SELECT * FROM beaconnodo WHERE Piano = $piano";
$result = [];
$stmt = $conn->query($sql);

while($row = $stmt->fetch_assoc()) {
    $result[] = $row;
}

echo json_encode($result);
$conn->close();
?>
