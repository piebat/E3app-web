<?php
$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$messaggio = $_POST['messaggio'];
$topic = $_POST['topic'];
echo $messaggio;
$bulk = new MongoDB\Driver\BulkWrite;
$bulk->insert(['topic' => $topic,'messaggio' => $messaggio]);
$manager->executeBulkWrite('mydb.messaggi', $bulk);

