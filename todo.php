<!DOCTYPE html>
<title>E3App</title>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
 <!-- Fonts -->
 <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
 <link href="https://fonts.googleapis.com/css?family=McLaren&display=swap" rel="stylesheet">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.0/baguetteBox.min.css" />
 <link rel="stylesheet" href="css/grid-gallery.css">
 <link rel="stylesheet" href="/css/my.css">

  <body>
    <h1>Test</h1>
    <table id="tabella" class="table">
      <thead>
        <th>WP</th>
        <th>Descrizione del WP</th>
        <th>D#</th>
        <th>Descrizione Deliverable</th>
        <th>Responsabili</th>
      </thead>
    </table>
<script type="text/javascript">

var dati=[];
   dati=<?php
    $dataarray = [];
    if (($handle = fopen("GANTT-E3APP.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
    $dataarray[] = $data;
    }
      echo json_encode($dataarray);
      fclose($handle);
    } ?>;
    for (var i = 0; i < dati.length; i++) {
      $("#tabella").append('<tr class"row" id="'+i+'"></tr>')
      if ((dati[i][dati[i].length-1])=100) {
        $("#"+i).css("background-color","green");
      }
      for (var j = 0; j < dati[i].length; j++) {
        $("#"+i).append('<td class="col-6-md">'+dati[i][j]+'</td>');
      }
    };
</script>

  </body>
</html>
