<?php

class node
{
    public $x;
    public $y;
    public $beacon;
}

class edge
{

    public $id;

    public $x1;

    public $y1;

    public $x2;

    public $y2;

    public $weight;
}

$piano = $_POST['piano'];

/* ELIMINAZIONE PRECEDENTI NODI, ARCHI E BEACON */
include ("accesso_db.php");
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (! $conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "DELETE FROM arco WHERE Piano1='$piano'";

if (mysqli_multi_query($conn, $sql)) {
    $toinsert = "";
} else {
    echo (mysqli_error($conn) . "" . $sql);
    die("Eliminazione non riuscita, riprova più tardi!");
}

mysqli_close($conn);

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (! $conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "DELETE FROM nodo WHERE Piano='$piano'";

if (mysqli_multi_query($conn, $sql)) {
    $toinsert = "";
} else {
    echo (mysqli_error($conn) . "" . $sql);
    die("Eliminazione non riuscita, riprova più tardi!");
}

mysqli_close($conn);
 
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (! $conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "DELETE FROM beaconnodo WHERE Piano='$piano'";

if (mysqli_multi_query($conn, $sql)) {
    $toinsert = "";
} else {
    echo (mysqli_error($conn) . "" . $sql);
    die("Eliminazione non riuscita, riprova più tardi!");
}

mysqli_close($conn);

/* INSERIMENTO NODI */
include ("accesso_db.php");
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (! $conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$toinsert = "";
// Leggo alcune variabili presenti nella post

$Nodes = json_decode($_POST['nodes']);
//$Beacons = json_decode($_POST['nodes']);
$Edges = json_decode($_POST['edges']);

$Beacons = json_decode($_POST['beacons']);

foreach ($Nodes as $node) {
    $toinsert .= "INSERT INTO nodo(X, Y, Piano)
    VALUES('$node->x','$node->y','$piano');";
}

// Eseguo la query

if (mysqli_multi_query($conn, $toinsert)) {
    $toinsert = "";
} else {
    echo (mysqli_error($conn) . "" . $toinsert);
    die("Inserimento non riuscito, riprova più tardi!");
}

mysqli_close($conn);

/*INSERIMENTO BEACONS*/

if (count($Beacons) > 0) {
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (! $conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $toinsert = "";
    
    foreach ($Beacons as $node) {
        $toinsert .= "INSERT INTO beaconnodo(X, Y, Piano, IDBeacon)
        VALUES('$node->x','$node->y','$piano','$node->beacon');";
    }
    if (mysqli_multi_query($conn, $toinsert)) {
        $toinsert = "";
    } else {
        echo (mysqli_error($conn) . "" . $toinsert);
        die("Inserimento non riuscito, riprova più tardi!");
    }
    
    mysqli_close($conn);
}

/* INSERIMENTO ARCHI */

if (count($Edges) > 0) {
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (! $conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $toinsert = "";

    foreach ($Edges as $edge) {
        $toinsert .= "INSERT INTO arco(Id, X1, Y1, Piano1, X2, Y2, Piano2)
        VALUES('$edge->id','$edge->x1','$edge->y1','$piano','$edge->x2','$edge->y2','$piano');";
    }
    if (mysqli_multi_query($conn, $toinsert)) {
        echo ("Inserimento avvenuto correttamente");
    } else {
        echo (mysqli_error($conn) . "" . $toinsert);
        die("Inserimento non riuscito, riprova più tardi!");
    }

    mysqli_close($conn);
}
