const node =
{
		x: 0,
		y: 0,
		isStart: false,
}

const nodeBeacon =
{
		x: 0,
		y: 0,
		beacon: 0,
}

const edge =
{
		id: 0,
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 0,
		weight: 0,
}

var initialNode;
var edgeid = 0;
var nodes = [];
var edges = [];
var beaconsMap = [];

$.fn.clickCanvas = function(){
	$('canvas').mousedown(function(event) { 

		switch (event.which) { 
		case 1: 
			if(initialNode==null) {
				hideAllEdges();
				selectStartNode($(this));
				break;
			}
			if(checkIfThereIsAStrartNode()){
				drawEdge(initialNode.x, initialNode.y, parseInt($(this).css('left'), 10),  parseInt($(this).css('top'), 10));
				resetInitialNode();
				showAllEdges();
				break;
			}
		case 2: 
			break; 
		case 3: 
			if (window.confirm("Vuoi eliminare questo nodo?")) { 
				eliminaNodo($(this));
				assegnaBeacon();
			}
			break; 
		default: 
			break; 
		} 
	}); 
}

function startDrawNodes(){
	var img = document.getElementById("img");
	$(img).css("cursor", "crosshair");

	img.onclick = drawOnMap;
	//alert("Collega un altro nodo prima di aggiugerne altri");

	function drawOnMap(e){

		if(initialNode != null){
			customAlert("Collega un altro nodo prima di aggiugerne altri");
			return;
		}
		cursorX = e.pageX;
		cursorY= e.pageY;
		drawNode(cursorX, cursorY);		
	}
}

function drawNode(x,y){
	var cnvs = document.createElement("canvas");
	cnvs.classList.add("canvas");

	var contenuto = document.getElementById("contenuto");

	contenuto.appendChild(cnvs);
	$(".canvas").unbind('mousedown');
	$('.canvas').clickCanvas();
	$(".canvas").width(10 +"px");
	$(".canvas").height(10 +"px");
	$(".canvas").css("cursor", "pointer");
	cnvs.style.position = "absolute";
	cnvs.style.left = x + "px";
	cnvs.style.top = y + "px";

	fillNodesArray();
	var ctx = cnvs.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = 'rgb(200, 0, 0)';
	ctx.fillRect(1, 1, 500, 500);
	ctx.stroke();

	printAllNodes();
	assegnaBeacon();
}

function eliminaNodo(nodo){

	fillNodesArray();
	var x = parseInt($(nodo).css('left'), 10);
	var y = parseInt($(nodo).css('top'), 10);
	removeEdgesOfANode(nodo);
	for( var i = 0; i < nodes.length; i++){ 
		if ( nodes[i].x === x && nodes[i].y === y) {
			nodes.splice(i, 1); 
			i--;
		}
	}
	$(nodo).remove();
	
}

function removeEdgesOfANode(nodo){
	for(var i = 0; i < edges.length; i++){
		if(checkNodeInEdges(edges[i], nodo)){
			console.log("gio");
			eliminaArco(edges[i].id);
			i = 0;
			numeroArchi();
		}
	}
	
}

function checkNodeInEdges(edge, nodo){
	var x = parseInt($(nodo).css('left'), 10);
	var y = parseInt($(nodo).css('top'), 10);
	if((edge.x1 == x && edge.y1 == y) 
			||(edge.x2 == x && edge.y2 == y)){
		return true;
	}
	return false;
}


function assegnaBeacon(){
	fillNodesArray();
	printAllNodes();
	$("#salvaGrafo").css("visibility","visible");
}

function clearArray(array) {
	while (array.length) {
		array.pop();
	}
}

function printAllNodes(){
	$( ".nodo" ).remove();
	$( ".scritta" ).remove();
	var c = 0;
	for( var i = 0; i < nodes.length; i++){ 
		c++;
		var contenuto = document.getElementById("contenuto");
		var scritta = document.createElement("p");
		contenuto.appendChild(scritta);
		scritta.setAttribute("id", "nodo"+c);
		scritta.classList.add("scritta");
		$(".scritta").width(10 +"px");
		$(".scritta").height(10 +"px");
		$("#nodo"+c).html(c);
		scritta.style.position = "absolute";
		scritta.style.left =  Number(nodes[i].x) + "px";
		var scrittaTop = Number(nodes[i].y) - 40;
		scritta.style.top = scrittaTop + "px";
		beaconAttuale =  "";
		for(var j = 0; j< beaconsMap.length; j++){
			if(beaconsMap[j].x == nodes[i].x &&  beaconsMap[j].y == nodes[i].y){
				beaconAttuale =  beaconsMap[j].beacon;
			}
		}
		$("#listanodi").append("<div class='nodo'>Nodo "+c+", x = " + nodes[i].x + " y = "+ nodes[i].y +"<br> Beacon associato: <input id="+c+" type='text' name='beacons' x= "+nodes[i].x+"  y= "+nodes[i].y+" onchange='assegnaBeaconAlNodo("+nodes[i].x+","+nodes[i].y+ ","+$("#piano").val()+" ,this.value)'  class='beacons' value="+ beaconAttuale+"> </div>"); 
	}
}

function fillNodesArray(){
	var newx = 0;
	var newy = 0;
	clearArray(nodes);
	$(".canvas").each(function() {
		newx = parseInt($(this).css('left'), 10);
		newy = parseInt($(this).css('top'), 10);

		nodes.push({
			x: newx,
			y: newy
		});
	});
}

function insertNewEdge(id, x1,y1,x2,y2,weight){
	edges.push({
		id: id,
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2,
		weight: weight
	});
}

function clearGraph(){
	$( ".nodo" ).remove();
	$( ".canvas" ).remove();
	$( ".scritta" ).remove();
	$( ".bottoneEdge" ).remove();
	$( ".canvasEdge" ).remove();
	clearArray(nodes);
	clearArray(edges);
}

function selectStartNode(nodo){
	var x = parseInt($(nodo).css('left'), 10);
	var y = parseInt($(nodo).css('top'), 10);
	var savedInitialNode = $("#initialNode");

	for( var i = 0; i < nodes.length; i++){ 
		if ( nodes[i].x === x && nodes[i].y === y) {
			nodes[i].isStart = true;
			if(initialNode == null){
				initialNode = nodes[i];
				savedInitialNode.html(initialNode);
			}
		}
	}

}

function assegnaBeaconAlNodo(x,y,piano,beacon){
	for (var i = 0; i < beaconsMap.length; i++){
		if(beaconsMap[i].x == x && beaconsMap[i].y == y){
			beaconsMap[i].beacon = beacon;
			return;
		}
	}
	beaconsMap.push({
		x: x,
		y: y,
		piano: piano,
		beacon: beacon,
	});
	//se non presente aggiungi altrimenti cambia
}

function checkIfIsStart(nodo){

	var x = parseInt($(nodo).css('left'), 10);
	var y = parseInt($(nodo).css('top'), 10);

	for( var i = 0; i < nodes.length; i++){ 
		if ( nodes[i].x === x && nodes[i].y === y) {
			return nodes[i].isStart;
		}
	}
}

function drawEdge(x1,y1,x2,y2){
	edgeid++;
	insertNewEdge(edgeid, x1, y1, x2, y2, 100);

	var img = document.getElementById("img");
	var cnvs = document.createElement("canvas");
	var contenuto = document.getElementById("contenuto");
	var minx = x1
	var miny = y1;
	var maxx = x2;
	var maxy = y2;

	if( Number(x2) <=  Number(x1)){
		minx = x2;
		maxx = x1;  
	}

	if( Number(y2) <= Number(y1)){
		miny = y2;
		maxy = y1; 
	}

	contenuto.appendChild(cnvs);
	cnvs.classList.add("canvasEdge");
	$(cnvs).attr("id", "canvasEdge"+edgeid);
	cnvs.style.position = "absolute";

	var left =  minx + 10;
	var top =  miny + 10;
	var width =  maxx -  minx - 5;
	var height =  maxy -  miny - 5 ;

	if(width<5){
		width = 5;
	}
	if(height < 5 ){
		height = 5;
	}

	cnvs.style.left = left +"px";
	cnvs.style.top = top +"px";	
	cnvs.width = width;
	cnvs.height = height;

	var bottoneEdge = document.createElement("button");

	$(bottoneEdge).html("x");
	$(bottoneEdge).attr("id", edgeid);

	bottoneEdge.classList.add("bottoneEdge");
	bottoneEdge.style.left = ( Number(minx) + Number(maxx))/2 +"px";
	bottoneEdge.width = width/10;
	bottoneEdge.height = height/10;
	bottoneEdge.style.top = ( Number(miny) +  Number(maxy))/2 +"px";
	$(contenuto).append(bottoneEdge); 
	$(bottoneEdge).attr('onClick', 'bottoneArco(this);');

	var ctx = cnvs.getContext("2d");
	ctx.strokeStyle = 'blue';

	ctx.beginPath();
	if(x1<x2 && y1<y2){
		ctx.moveTo(width, height);
		ctx.lineTo(0,0);
	}
	else if(x1<x2 && y1>y2){
		ctx.moveTo(0, height);
		ctx.lineTo(width, 0);
	}
	else if(x1>x2 && y1<y2){
		ctx.moveTo(width, 0);
		ctx.lineTo(0, height);
	}
	else{
		ctx.moveTo(width, height);
		ctx.lineTo(0,0);
	}
	ctx.stroke();
}

function checkIfThereIsAStrartNode(){
	for( var i = 0; i < nodes.length; i++){ 
		if (nodes[i].isStart) {
			return nodes[i].isStart;
		}
	}
	return false;
}

function hideAllEdges(){
	$(".canvasEdge").each(function() {
		$(this).css("visibility","hidden");
	});
	$(".bottoneEdge").each(function() {
		$(this).css("visibility","hidden");
	});
}

function showAllEdges(){
	$(".canvasEdge").each(function() {
		$(this).css("visibility","visible");
	});
	$(".bottoneEdge").each(function() {
		$(this).css("visibility","visible");

	});
}

function resetInitialNode(){
	initialNode = null;
}

function bottoneArco(bottone){
	if (window.confirm("Vuoi eliminare questo arco?")) { 
		eliminaArco($(bottone).attr("id"));
	}
}

function eliminaArco(id){
	$("#"+id).remove();

	$("#canvasEdge"+id).remove();

	for (var i  = 0; i < edges.length ; i++) {
		if(edges[i].id == id){
			edges.splice(i, 1); 
		}
	}
}

function numeroArchi(){
	console.log(edges.length);
	for(var i =0; i <edges.length; i++)
	{
		console.log("ID: "+ edges[i].id + " " + edges[i].x1 + " " + edges[i].y1 + " " + edges[i].x2 + " " +edges[i].y2);
	}
}


function caricaGrafo()
{
	var piano = $("#piano").val();
	$.ajax({
		dataType: "text",
		type: 'GET',
		url: 'php/caricaGrafo.php',
		data:  'piano='+piano,
		beforeSend: function() {
			//$('#load').show();

		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]") {
				jsonArrayToNodes(data);
			}

		},

		error: function()
		{
			customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
			//document.getElementById("error_dettagli").innerHTML = "";
		}
	});
}

function jsonArrayToNodes(data){
	var array = JSON.parse(data);
	edgeid = 0;
	for(var i = 0; i < array.length; i++){
		assegnaBeacon();
		if(!checkIfIsPresent(array[i].X1, array[i].Y1)){
			nodes.push({
				x: array[i].X1,
				y: array[i].Y1
			});
			drawNode(array[i].X1, array[i].Y1 );
		}
		if(!checkIfIsPresent(array[i].X2, array[i].Y2)){
			nodes.push({
				x: array[i].X2,
				y: array[i].Y2
			});
			drawNode(array[i].X2, array[i].Y2 );		
		}
	}
	for(var i = 0; i < array.length; i++){
		drawEdge(Number(array[i].X1), Number(array[i].Y1), Number(array[i].X2), Number(array[i].Y2));
	}
}

function checkIfIsPresent(x, y){
	for(var i = 0; i< nodes.length ; i++){
		if(x == nodes[i].x && y == nodes[i].y){
			return true;
		}
	}
	return false;
}

function caricaHashmap()
{
	var piano = $("#piano").val();
	$.ajax({
		dataType: "text",
		type: 'GET',
		url: 'php/caricaHashmap.php',
		data:  'piano='+piano,
		beforeSend: function() {
			//$('#load').show();

		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]") {
				assignBeaconsToNodes(data);
			}

			else{
				customAlert("Non ci sono beacon memorizzati per questo piano"); //sempre meglio impostare una callback in caso di fallimento
			}

		},

		error: function()
		{
			customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
			//document.getElementById("error_dettagli").innerHTML = "";
		}
	});
}

function assignBeaconsToNodes(data){
	var array = JSON.parse(data);
	for(var i = 0; i < array.length; i++){

		for(var j = 0; j< nodes.length ; j++){
			
			if((Number(array[i].X) == Number(nodes[j].x)) && 
					(Number(array[i].Y) == Number(nodes[j].y))){
				beaconsMap.push({
					x: array[i].X,
					y: array[i].Y,
					piano: array[i].Piano,
					beacon: array[i].IDBeacon,
				});
			}
		}
		
	}
	
	var inputs = document.getElementsByClassName("beacons");
	for(var i = 0; i < inputs.length; i++){
		for(var j = 0; j < beaconsMap.length; j++){
			if(inputs[i].x == beaconsMap[j].x &&  inputs[i].y == beaconsMap[j].y ){			
				inputs[i].value = beaconsMap[j].beacon;
			}
		}
	}
	
	assegnaBeacon();
	printAllNodes();
}

/***
 * FUNZIONE PER IL SALVATAGGIO DEL GRAFO ALL'INTERNO DEL DATABASE *
 ***/

function saveGraph(){
	var piano = $("#piano").val();
	$.ajax({
		dataType: "text",
		type: 'POST',
		url: 'php/salvaGrafo.php',
		data:  'piano='+piano+'&nodes='+JSON.stringify(nodes)+'&edges='+JSON.stringify(edges)+'&beacons='+JSON.stringify(beaconsMap),
		beforeSend: function() {
			//$('#load').show();

		},
		success: function(data){
			//$('#load').hide();
			if(data != "[]"){
				customAlert(data); 
			}


		},

		error: function()
		{
			customAlert("Chiamata fallita, si prega di riprovare..."); //sempre meglio impostare una callback in caso di fallimento
			//document.getElementById("error_dettagli").innerHTML = "";
		}

	});

}