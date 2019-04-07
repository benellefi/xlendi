/*
* Created on Nov 23 2018 14:04
*
* Copyright (c) 2018 - Lis/Aix-Marseille University/CNRS
*
* @author Mohamed BEN ELLEFI [ben.ellefi@gmail.com] 
* @author Pierre DRAP [pierre.drap@gmail.com]
*/


var currentWindow = null;
var orthoWindow = null;
var newWindow = null;
var XlendiImgSourceAllAttributes ;
var artifact = "";

function init(){
artifact = "";
//document.getElementById("buttonColor").disabled = true;
//document.getElementById("buttonColorSimilarArtifact").disabled = true;
clearTextes();
     
}


function clearTextes(){
document.getElementById("resultsSimilarArtifactNumber").innerHTML = "";
document.getElementById("resultsSimilarArtifactNumber2").innerHTML = "";
document.getElementById("resultsNotMeasuredArtifacts").innerHTML = "";
//document.getElementById("resultsBarycenter").innerHTML = "";
document.getElementById("resultsImgSource").innerHTML = "";
    
var iframe = document.getElementById("orthoPhotoFrameId");
iframe.contentWindow.document.open();
iframe.contentWindow.document.close();
    
var iframe2 = document.getElementById("2DPhotoFrame");
iframe2.contentWindow.document.open();
iframe2.contentWindow.document.close();

//document.getElementById("buttonOriginalImageFullScreen").style.display= "none";
    XlendiImgSourceAllAttributes=null;
}
/**
this is initialisation funtion:
-set color to none for all regions
-disable the color button
-default sparql query
**/
function initColor(){
    
    for (var k = 0; k < regions.length; k++) {
      regions[k].node.style.opacity = 1; 
		 regions[k].node.setAttribute('fill', 'none'); 
     }
   }



init();
initColor();

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = (slider.value)*0.01;

slider.oninput = function() {
  output.innerHTML = (this.value)*0.01;
}


var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = (slider2.value)*0.01;

slider2.oninput = function() {
  output2.innerHTML = (this.value)*0.01;
}



 var arr = new Array();

// Iterate through the regions & change Yorkshire's fill colour to gold
for (var i = 0; i < regions.length; i++) {
    
   
    var ampSelect = document.getElementById("ampSelect");
    var option = document.createElement("option"); 
    option.text = regions[i].data('id');
    ampSelect.add(option); 
    arr.push(regions[i].data('id'));
   
   // alert(regions[i].getBBox().x);
    
  
    //var t = paper.text(, "HTML5ROCKS"); 
    
    // Showing off
	regions[i].mouseover(function(e) {
//		this.node.style.opacity = 0.2; 
//       static|absolute|fixed|relative|sticky|initial|inherit;
     //  document.getElementById('paramArtifact').style.position = "absolute";
      // document.getElementById('paramArtifact').style.left= e.clientX + "px";
      // document.getElementById('paramArtifact').style.top = e.clientY + "px";
       document.getElementById('paramArtifact').innerHTML =  this.data('id') ;
      //regions[i].node.setAttribute('fill', this.data('id') ); 
     //FunctionShowIdArtifact(this);
     var xClt = e.clientX;
     var yClt = e.clientY;
     label.attr({text:  this.data('id'), x: e.clientX, y: e.clientY});
  	}); 
	regions[i].mouseout(function(e) {
      //  label.attr("text","Mouse over an object");
       	//this.node.style.opacity = 1; 
		//this.node.setAttribute('fill', 'none'); 
        document.getElementById('paramArtifact').innerHTML = "";
       // document.getElementById('paramArtifact').style.position = "absolute";
      // document.getElementById('paramArtifact').style.left= e.clientX + "px";
      // document.getElementById('paramArtifact').style.top = e.clientY + "px";
     // paper.text((this.getBBox().x + (this.getBBox().width / 2)), (this.getBBox().y + (this.getBBox().height / 2)), );
      
	}); 
    
    
    

    
 // region onClick   
     regions[i].mouseup( function(e) {
         clearTextes();
         initColor();
        artifact = this.data('id');
         
   FunctionColorArtifacts(artifact, "gold");         
   ShowArtifactYASGUI(artifact);
        
   });
}


function FunctionShowIdArtifact(region){
    var amp = region.data('id');
   amp = amp.replace("Amphore_","");
   paper.text((region.getBBox().x + (region.getBBox().width / 2)), (region.getBBox().y + (region.getBBox().height / 2)), amp).attr({fill: 'blue'});
  }


function FunctionClearMapArtifact(){
  
    window.location.reload();  
}





function FunctionDownloadImageThis(e){
    
 
var a = window.document.createElement('a');
    a.href = e;
a.download = e;

// Append anchor to body.
document.body.appendChild(a);
a.click();

// Remove anchor from body
document.body.removeChild(a);  
    

}


function FunctionDownloadPLY(){
  
  /*   var query= 
    "PREFIX+arp%3A<http%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23>+SELECT+distinct+%3Fname+%3Fx+%3Fy+%3Fz+WHERE+{%3Famp+arp%3AhasName+\""+ artifact+"\"%3B+arp%3AhasMeasuredPointManager+%3Fpts.+%3Fpts+arp%3AhasASetOf3DPointWithObs+%3Fpt.+%3Fpt+arp%3AhasX+%3Fx%3B+arp%3AhasY+%3Fy%3B+arp%3AhasZ+%3Fz.%0A++%3Fpt+arp%3AhasName+%3Fname.}";
    var req = new XMLHttpRequest();
    req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);
  
var plyText="ply \n format ascii 1.0 \n element vertex "+objResults.results.bindings.length +" \n property float x \n property float y \n property float z \n property uchar diffuse_red \n property uchar diffuse_green \n property uchar diffuse_blue \n end_header \n";
    
    
      
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
   var ptName= objResults.results.bindings[j].name.value ;
         
         if(ptName=="Profile" )        
       plyText +=    objResults.results.bindings[j].x.value + " "+ objResults.results.bindings[j].y.value + " "+objResults.results.bindings[j].z.value  + "  255 255 0 \n";
         
         else
              plyText +=    objResults.results.bindings[j].x.value + " "+ objResults.results.bindings[j].y.value + " "+objResults.results.bindings[j].z.value  + "  255 0 0 \n";
   
         
        }
    
var a = window.document.createElement('a');
a.href = window.URL.createObjectURL(new Blob([plyText], {type: 'text/ply'}));
a.download = artifact+'.ply';

// Append anchor to body.
document.body.appendChild(a);
a.click();

// Remove anchor from body
document.body.removeChild(a);  
*/


 
var a = window.document.createElement('a');
    
     
var fileName = artifact+"_m.ply";

var result = doesFileExist("../../models/"+fileName);
if (result == false) {
    fileName = artifact+".ply";
 }

        
    var ahref = "../../models/"+fileName;
  
    a.href = ahref;
a.download = fileName;

// Append anchor to body.
document.body.appendChild(a);
a.click();

// Remove anchor from body
document.body.removeChild(a);  
    
  
    
}




function FunctionDownloadTypology(){
   
  var typoName = getTypologyName(artifact)

  var a = window.document.createElement('a');


      
       typoName = typoName.replace("Pithecusse_", "Pithec_T");
       typoName = typoName.replace("Ramon", "RAMON");
        
      var ahref = "../../article/AmphoraeData/"+typoName+".rar";
    
      a.href = ahref;
  a.download = typoName+".rar";
  
  // Append anchor to body.
  document.body.appendChild(a);
  a.click();
  
  // Remove anchor from body
  document.body.removeChild(a);  
         
  }


  function getTypologyName(art)
  {


    var query='PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0A+%0A+SELECT+distinct+%3Ftypo+WHERE+%7B+%0A++%3Fsub+arp%3AhasName+%22'+art+'%22%3B+arp%3AhasTypologyName+%3Ftypo.%7D' ;
   
    var req = new XMLHttpRequest();
    
    req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);
   
   
    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
      return (objResults.results.bindings[j].typo.value);
    
         }
      
         return (null);
  }




function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}


function FunctionRunLOD(){


    var query="PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0ASELECT+*+WHERE+%7B%0A++%3Famp+a+%3Fconcept%3B+arp%3AhasName+\""+artifact+"\".%0A+%3Fconcept+skos%3AcloseMatch+%3Fexternal+.%0A%7D+";

     var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
   
    var objResults = JSON.parse(req.responseText);
    
    for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
        var externalURI = objResults.results.bindings[j].external.value;
        //alert(externalURI);
        window.open(externalURI, '_blank');
    }

}




function FunctionRunAriadne(){


    if(artifact.startsWith("Amp")){
       window.open('http://ariadne2.isti.cnr.it/index.php/search?derivedSubject=amphorae+(storage+vessels)', '_blank');
    }
    
    if(artifact.startsWith("gs")){
        window.open('http://ariadne2.isti.cnr.it/index.php/search?derivedSubject=grinding+stones', '_blank');
   }
}


function FunctionShowMapArtifact(){
     for (var k = 0; k < regions.length; k++) {
    
      var amp = regions[k].data('id');
      amp = amp.replace("Amphore_","");
           
         
     paper.text((regions[k].getBBox().x + (regions[k].getBBox().width / 2)), (regions[k].getBBox().y + (regions[k].getBBox().height / 2)), amp).attr({fill: 'blue'});
     }
}




/**
Sort the select element**/
function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

sortSelect(document.getElementById("ampSelect"));
document.getElementById("ampSelect").value = "";

  
/**

Coherence test: if the artifac exist in the site and no in the ontology


*/
function testCoherenceSiteVsOnto(){
 var ListAmpManqueante ='';
   
    
    
  for (var k = 0; k < regions.length; k++) {
    
      var amp = regions[k].data('id');
    
     if(!existArtifact(amp) ) 
           ListAmpManqueante+= "\n-"+amp;
    }
    alert(ListAmpManqueante);
}



//testCoherenceSiteVsOnto();
//testCoherenceOntoVsSite();


/**

Coherence test: if the artifac exist in the ontology and non in the site


*/
function testCoherenceOntoVsSite(){
 var ListAmpManqueante ='';
   var query='PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0A+%0A+SELECT+distinct+*+WHERE+%7B+%0A++%3Famp+a+arp%3AAmphorae%3B+arp%3AhasName+%3Fname.%0A+%7D' ;
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
   
    var objResults = JSON.parse(req.responseText);
    
    for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
        var amp = objResults.results.bindings[j].name.value;
       var ind = arr.indexOf(amp);
       
       if(ind<0)
  // alert(amp+ "   "+ ind);
           ListAmpManqueante+= "\n-"+amp;
    }
    alert(ListAmpManqueante);
}


function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    yasqe.query();
}

/**
This function fill YASQUI with the artifact properties information
**/
function ShowArtifactYASGUI(artifact) {
 //     alert (artifact);
       if(artifact.startsWith("Amp") || artifact.startsWith("gs")){
        //document.getElementById("divSparql").innerHTML = "<iframe src=\'"+query+"' height=100% width=100%></iframe>";
 
       // document.getElementById('divSparql').innerHTML="";
       // document.getElementById('divSparql').innerHTML="<div id=\"yasr\"></div>";
           
        //alert("here");
        var queryYs = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n PREFIX arp: <http://www.arpenteur.org/ontology/Arpenteur.owl#> \nSELECT ?property ?value ?info WHERE { \n ?sub ?relation ?object; arp:hasName \""+artifact+"\". \n ?relation rdfs:label ?label. \n BIND( STR(?label) AS ?string ). \n BIND( REPLACE( ?string,\"has \",\"\" ) AS ?property ). \nBIND( if(?property=\"volume\", ?object*1000, ?object  ) AS ?obj2 ) .\n BIND( if(isNumeric(?obj2), REPLACE(STR((Round(?obj2*1000))/1000),\"e0\",\"\" ),if(isLiteral(?obj2), STR(?obj2), ?obj2)) AS ?value ). \n optional {?relation rdfs:comment ?unitComment.} \n BIND( STR(?unitComment) AS ?info ). \n ?sub a ?artifact. \n Filter(?artifact IN (arp:Amphorae, arp:GrindingStone))  Filter(?property != \"mass\")  Filter(?property != \"bounding box\") Filter(?property != \"MeasuredPointManager\") Filter(?property != \"3D transformation\") Filter(?property != \"internal volume\")  Filter(?property != \"idn\").}";
     
          yasqe.setValue(queryYs);
         yasqe.query();
     
         document.getElementById('sourceArtifact').innerHTML =  "<b> "+artifact+"</b>" ; 
   
           FunctionColorArtifacts(artifact, "gold");
          document.getElementById("ampSelect").value = artifact;
           $("#ampSelect").select2();        
       
            if(!existArtifact(artifact) ) 
           {
               swal ("We are sorry ! the selected amphora is not measured yet :/");
               init();
           }
            
           
       }
     else{ swal ('Please select a valid artifact !');}
  

     
     document.getElementById("ImageTabId").src = "../../models/2D/"+artifact+".jpg";


     var artifactOriginURL = "../../models/"+artifact+"_m.ply";

var result = doesFileExist(artifactOriginURL);
if (result == false) {
    artifactOriginURL = "../../models/"+artifact+"_t.ply"
    result = doesFileExist(artifactOriginURL);
    if(result == false){
    artifactOriginURL = "../../models/"+artifact+".ply"
    }
 }

     //alert(artifactOriginURL);
     init3dhop();
     setup3dhop(artifactOriginURL);
     sectiontoolInit();
    // resizeCanvas(400, 600);
}






function FunctionModel_3D_Situ() {
    var artifactOriginURL = "../../models/"+artifact+"_t.ply";

    init3dhop();
    setup3dhop(artifactOriginURL);
    sectiontoolInit();
    //resizeCanvas(400, 600);
    
}


function FunctionModel_3D_Lab() {
    var artifactOriginURL = "../../models/"+artifact+"_m.ply";

    var result = doesFileExist(artifactOriginURL);
    if (result == false) {
    
        artifactOriginURL = "../../models/"+artifact+".ply"
       
     }
    
    init3dhop();
    setup3dhop(artifactOriginURL);
    sectiontoolInit();
    //resizeCanvas(400, 600);
}

/**
This function is the onchange function related to the combobox Select
**/
function ampSelectFunction() {
      
    initColor();
    
    artifact = document.getElementById("ampSelect").value;
   //FunctionColorArtifacts(artifact, "gold");
    
// FunctionSparqlCloseTypo();
  document.getElementById('sourceArtifact').innerHTML =  artifact;   
 ShowArtifactYASGUI(artifact);
 
}




/**
This function is the onchange function related to the combobox Select
**/
function propSelectFunction (){
    
    var prop = document.getElementById("propSelect").value;
    
     if(prop =="hasVolume"){
         
          document.getElementById("measure").innerHTML =' Liter '; 
   var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = (slider2.value);

slider2.oninput = function() {
  output2.innerHTML = (this.value);
}
     }
    
    
    else{
 document.getElementById("measure").innerHTML =' Meter '; 
var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo2");
output2.innerHTML = (slider2.value)*0.01;

slider2.oninput = function() {
  output2.innerHTML = (this.value)*0.01;
}

    }
}





//get similar artifact corresponding to the selected property
function FunctionSimilarArtifactByProp(){
  var  resultsSimilarArtifact2 = 0; 
   
     document.getElementById("loader2").innerHTML = ' <div class="loader"></div> <span style="background-color:greenyellow;border-style: outset;">Please wait ... We are searching for similar artifacts ... </span>';
    
    initColor();
    clearTextes();
    FunctionColorArtifacts( artifact, "gold");
 
    var prop = document.getElementById("propSelect").value;
    
   var query='PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0A+%0A+SELECT+distinct+*+WHERE+%7B+%0A++%3Famp1+a+%3Ftype%3B+arp%3AhasName+%22'+artifact+'%22%3B+arp%3A'+prop+'+%3Fh1.%0A++%3Fsimilar+a+%3Ftype%3B+arp%3AhasName+%3Famp2%3B+arp%3A'+prop+'+%3Fh2.%0A++BIND(ABS(%3Fh1+-+%3Fh2)+AS+%3Fdistance).%0A++Filter(%3Ftype+IN+(arp%3AAmphorae%2C+arp%3AGrindingStone)).%0A+}' ;
   
    var req = new XMLHttpRequest();
    
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);
           var  threshold2 = parseFloat(slider2.value) ;
           //  if(threshold2 != 0.0)
             threshold2 = threshold2 *0.01;
      
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
       var dist =   parseFloat(objResults.results.bindings[j].distance.value);
     //  alert(dist);
         if(prop =="hasVolume"){
         dist= dist * 1000;
        threshold2 = parseFloat(slider2.value) ;
         }
         
      if((dist >0) & (dist < threshold2))
          {
         resultsSimilarArtifact2 ++;
         FunctionColorArtifacts( objResults.results.bindings[j].amp2.value, "blue");
      // alert(objResults.results.bindings[j].amp2.value + "  " +dist+ "        "+ threshold);
    //        
           
          }
     }
      document.getElementById("resultsSimilarArtifactNumber2").innerHTML = '<span style="background-color:powderblue;border-style: outset;">We found <b>'+  resultsSimilarArtifact2 + '</b> similar artifatcts colored in blue :) </span>';
    document.getElementById("loader2").innerHTML = '';
 }

/* // Sets up the scene.
  function initScene() {

   var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var c1 = get3DMeasuredPoints_ThreeJsVectors("Amphore_A63");
var geometry = new THREE.ConvexGeometry( c1 );
var material = new THREE.MeshPhongMaterial( {
    color: 0xff0000,
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1
} );
      
    // Create a light, set its position, and add it to the scene.
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100,200,100);
    scene.add(light);
      
var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
 // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera);

    // More code goes here next...


  }
    
initScene();
animate();

function animate() {

    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}
*/

/**
Function to query the ontology with the selected region
**/
function FunctionSparqlCloseTypo(){
      
 //   initColor();
    
   // document.getElementById('paramArtifact').innerHTML =  artifact ;
    
    var closeSameTypologyQuery =   " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>PREFIX arp: <http://www.arpenteur.org/ontology/Arpenteur.owl#> \n PREFIX afn: <http://jena.hpl.hp.com/ARQ/function#> \n SELECT distinct ?name ?typology ?EuclidienDistance WHERE { \n ?sub arp:hasName \""+artifact+"\"; arp:hasTypologyName ?typo; arp:hasTransformation3D ?tr1. \n ?tr1 arp:hasTranslation ?p1. \n ?p1 arp:hasX ?x1; arp:hasY ?y1; arp:hasZ ?z1. \n ?similar arp:hasName ?amp; arp:hasTypologyName ?typo; arp:hasTransformation3D ?tr2. \n ?tr2 arp:hasTranslation ?p2. \n ?p2 arp:hasX ?x2; arp:hasY ?y2; arp:hasZ ?z2. \n BIND( STR(?amp) AS ?name ). \n BIND( STR(?typo) AS ?typology ). \n BIND(afn:sqrt(((?x2-?x1)*(?x2-?x1)) + ((?y2-?y1)*(?y2-?y1)) + ((?z2-?z2)*(?z2-?z1))) AS ?dis). \n BIND(REPLACE(STR((Round(?dis*1000))/1000),\"e0\",\"\")  AS ?EuclidienDistance ). } Order By ?dis";
        

 
         yasqe.setValue(closeSameTypologyQuery);
         yasqe.query();
  //       yasr.store();
    
   //      alert(yasr.results.getOriginalResponseAsString());
    if(yasr.results)
    if(yasr.results.getOriginalResponseAsString())          {
        
  //          document.getElementById("buttonColor").disabled = false;
        document.getElementById("ampSelect").value = artifact;
FunctionColorCloseTypo(artifact);
   

         
      }
}



/**
This function will color regions based on the SPARQL results
**/
function FunctionColorCloseTypo(artifact){
     
    initColor();

    FunctionColorArtifacts( artifact, "gold");
 
   var query='PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0A+%0A+SELECT+distinct+%3Famp+WHERE+%7B+%0A++%3Fsub+arp%3AhasName+%22'+artifact+'%22%3B+arp%3AhasTypologyName+%3Ftypo.%0A++%3Fsimilar+arp%3AhasName+%3Famp%3B+arp%3AhasTypologyName+%3Ftypo%3B%7D' ;
   
    var req = new XMLHttpRequest();
    
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);


    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
        FunctionColorArtifacts( objResults.results.bindings[j].amp.value, "gold");

     
         }
     
}




    
    
/**
This function fill a given artifact with a color

param: 
- art the artifact to color
- color 
**/
function FunctionColorArtifacts(art, color){
    
         for (var k = 0; k < regions.length; k++) {
     //       alert(regions[k].data('id') + "  ?  " + artifactCloseTypo);
            if(regions[k].data('id') == art){
    //           alert(regions[k].data('id') + "  ==  " + artifactCloseTypo);
          //  regions[k].node.style.opacity = 0.2; 
             regions[k].node.setAttribute('fill', color);   
          //      alert("done");
            }
        }
}

function FunctionYearChange(){
       initColor();
 clearTextes();
 FunctionColorArtifacts( artifact, "gold");
}


/**get Img Source onclick event for buttonImgSourceArtifact**/
function FunctionGetImgSource(){
    initColor();
 clearTextes();
 FunctionColorArtifacts( artifact, "gold");
   
   var listImg =new Array();
    
    var year = document.getElementById("yearSelect").value;
    
    var URL = "http://www.lsis.org/groplan/survey";
    
if(XlendiImgSourceAllAttributes==null)
    XlendiImgSourceAllAttributes = getXlendiImgSourceAllAttributes(artifact, "xlendi"+year+"Survey");
    
            URL += "/"+year;
       
     // alert(URL);
    for(var j = 0 ; j < XlendiImgSourceAllAttributes.results.bindings.length ; j++ ){
           
             var fileName = XlendiImgSourceAllAttributes.results.bindings[j].fileName.value;
          
               if(listImg.indexOf(fileName) == -1)
                   {
            
                       // \139.124.41.203\Xlendi\timeLine3D\photo\20090409\jpg\CRW_1647.jpg
                       // \139.124.41.203\Xlendi\timeLine3D\photo\20160915\jpg\20160915_2_858.jpg
                       // \139.124.41.203\Xlendi\timeLine3D\photo\20170914\jpg\Xlendi_20170914_C1_500ms_724.jpg
                       //\139.124.41.203\Xlendi\timeLine3D\photo\20180904\jpg\20180904_C1_500ms_CC-480.jpg
                       // \139.124.41.203\Xlendi\2018\Xlendi 2018 Work in Progress\20180913\20180913_C3_CC_500ms\20180913_C3_CC_500ms_-590.jpg
                       // \139.124.41.203\Xlendi\timeLine3D\photo\20180921\jpg\20180921_Kari_Stills_CC-57.jpg
                       
                       listImg.push(fileName);
                       
                       fileName = fileName.replace(/\\/g, "");
                       fileName= fileName.substr(46);
                                    

                      // alert(fileName);
        
                       
                      var URLThumbnail = URL+"/thumbnail/"+fileName;
        
                       document.getElementById("resultsImgSource").innerHTML += '<img  id="'+fileName+'" src='+URLThumbnail+'  onclick=swipe(this)>';
                   document.getElementById("resultsImgSource").innerHTML += '</br>';
                       document.getElementById("resultsImgSource").innerHTML += '</br>';
                       document.getElementById("resultsImgSource").innerHTML += '</br>';
                       
                   }
          }

    if(XlendiImgSourceAllAttributes.results.bindings.length == 0)
        swal("No artifact images for the selected source :/ ");
   
    else{
        
         var orthoImageSrc = "http://www.lsis.org/groplan/survey/data/orthophoto/"+year+"_ortho_1mmpp_red.jpg";
       
  //   orthoImage = new window.Image();
  // orthoImage.style.display = 'block';
  // orthoImage.src = orthoImageSrc;
      if ((orthoWindow == null) || (orthoWindow.closed))
  orthoWindow = window.open("",'orthoPhotoFrame', 'width=650px,height=900px;');
   else
      orthoWindow.document.clear() ;
    
   // orthoWindow.document.write(orthoImage.outerHTML); 
   
      orthoWindow.document.write( '<img src="'+orthoImageSrc+'" id="orthoImage">');
     
   //   alert(orthoWindow.document.getElementById("orthoImage").offsetLeft + "    "+orthoWindow.document.getElementById("orthoImage").offsetTop)
        
         for(var j = 0 ; j < XlendiImgSourceAllAttributes.results.bindings.length ; j++ ){
            var xOrtho = parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].x.value);
              var yOrtho = parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].y.value);

       xOrtho=((xOrtho+6)*50)+orthoWindow.document.getElementById("orthoImage").offsetLeft;
             yOrtho=  ((yOrtho-14)*-50)-orthoWindow.document.getElementById("orthoImage").offsetTop;
                orthoWindow.document.write( '<font  color="red" style="position:absolute;left:'+xOrtho+';top:'+yOrtho+'; z-index:2;">.</font>');           

          }
        
        var coordinates = get3DMeasuredPoints (artifact);
        for(var j = 0 ; j < coordinates.length; j++ ){
            var xOrtho = parseFloat(coordinates[j].x);
              var yOrtho = parseFloat(coordinates[j].y);

          xOrtho=((xOrtho+6)*50)+orthoWindow.document.getElementById("orthoImage").offsetLeft;
             yOrtho=  ((yOrtho-14)*-50)-orthoWindow.document.getElementById("orthoImage").offsetTop;
             orthoWindow.document.write( '<font  color="yellow" style="position:absolute;left:'+xOrtho+';top:'+yOrtho+'; z-index:2;">.</font>');           

       // alert(xOrtho + "     "+yOrtho);
        }
        
        
        orthoWindow.document.close();
    }
}



var imgId=null;
var image2DWidth = 640;
var image2DHeight = 512;
function swipe(element) {
    
    
var largeImageSrc = element.src.replace("/thumbnail","");
     
    if ((currentWindow == null) || (currentWindow.closed))
  currentWindow = window.open("",'2DPhotoFrame', 'width=650px,height=550px;');
   else
      currentWindow.document.clear() ;
    
   //  currentWindow.document.write(largeImage.outerHTML);
     
    currentWindow.document.write( '<img src="'+largeImageSrc+'" id="LargeImage" width="640px",height="512px">');

        var xArray = new Array();
          var yArray = new Array();
 
    
          var xArrayOriginal = new Array();
          var yArrayOriginal = new Array();
 
        for(var j = 0 ; j < XlendiImgSourceAllAttributes.results.bindings.length ; j++ ){
             var fileName = XlendiImgSourceAllAttributes.results.bindings[j].fileName.value;
               if(fileName.endsWith(element.id))
                   {
                           xArray.push(parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].xImg.value)/parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].width.value));
                       yArray.push(parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].yImg.value)/parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].height.value));
                     
                      xArrayOriginal.push(parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].xImg.value));
                       yArrayOriginal.push(parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].yImg.value));
                  
                   }
          }



    for(k=0; k< xArray.length; k++){
      var   largeImageX = (xArray[k]*image2DWidth)+ currentWindow.document.getElementById("LargeImage").offsetLeft;
      var   largeImageY = (yArray[k]*image2DHeight)- currentWindow.document.getElementById("LargeImage").offsetTop;
         
      //  alert(largeImageX + "             " +largeImageY );
     currentWindow.document.write( '<font size="200%" color="red" style="position:absolute;left:'+largeImageX+'px;top:'+largeImageY+'px; z-index:2;">.</font>');
 
    }
    
    currentWindow.document.close();

    currentWindow.document.getElementById("LargeImage").onclick = function()
    {
  
        
   //var  OriginalImage = new window.Image();
  // OriginalImage.style.display = 'block';
  // OriginalImage.src = element.src.replace("/thumbnail","");
  // OriginalImage.id=element.id;
        
      if ((newWindow == null) || (newWindow.closed))
  newWindow = window.open('', '_blank','toolbar=no');
   else
      newWindow.document.clear() ;
 
        
  //  newWindow.document.write(OriginalImage.outerHTML);
  newWindow.document.write( '<img src="'+largeImageSrc+'" id="OriginalImage">');
        
//var imageElmt = document.getElementById(OriginalImage.id);
        
 for(k=0; k< xArray.length; k++){
 
     var OriginalImageX = xArrayOriginal[k]+newWindow.document.getElementById("OriginalImage").offsetLeft;
 
     var OriginalImageY = yArrayOriginal[k]-newWindow.document.getElementById("OriginalImage").offsetTop;
     
         newWindow.document.write( '<font size:"200%" color="red" style="font-size:100px;position:absolute;left:'+OriginalImageX+'px;top:'+OriginalImageY+'px; z-index:2;"><b>.</b></font>');

    } 
     
    newWindow.document.close();
 }
}





//getXlendiImgSource("Amphore_A66", "xlendi2014Survey.min");

/**get Img Source for a given artifact and a given base name**/
function getXlendiImgSource(artifact, baseName)
{
 
   
   var bbox =  getXlendiBBox(artifact) ;
      var query= "PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0ASELECT+Distinct+%3FfileName+WHERE+%7B%0A++%3Fpt3D+arp%3AhasX+%3Fx%3B+arp%3AhasY+%3Fy%3B+arp%3AhasZ+%3Fz%3B+arp%3AhasImagePointManager%2Farp%3AhasASetOfObservation+%3FsetObs.%0A+%3FsetObs+arp%3AhasX+%3FxImg+%3B+++arp%3AhasY+%3FyImg+%3B+arp%3AhasPhotograph+%3Fphotograph.+%0A%3Fphotograph++arp%3AhasFullFileName+%3FfileName%3B+arp%3AhasCamera+%3Fcam.%0A++%3Fcam+arp%3AhasFrameHeigthInPixel+%3Fheight%3B+arp%3AhasFrameWidthInPixel+%3Fwidth.%0A++Filter(%3Fx+%3E+"+bbox[0]+"+%26%26+%3Fx+%3C+"+bbox[1]+"+%26%26+%3Fy+%3E++"+bbox[2]+"+%26%26+%3Fy+%3C+"+bbox[3]+"+%26%26+%3Fz+%3E++"+bbox[4]+"+%26%26+%3Fz+%3C++"+bbox[5]+").%0A%7D";
    
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/"+baseName+"?output=json&query="+query,false); 
    req.send();
    var objResults = JSON.parse(req.responseText);
  //  alert(req.responseText);
    var listImg = new Array();
    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         var fileName = objResults.results.bindings[j].fileName.value;
         if(listImg.indexOf(fileName) == -1){
         listImg.push(fileName);
         }
     }
    return listImg;
  }


/**get all attributes in the responseText (JSON object) for a given artifact and a given base name**/
function getXlendiImgSourceAllAttributes(artifact, baseName)
{
 
   var bbox =  getXlendiBBox(artifact) ;
 
var query= "PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0ASELECT+Distinct+*+WHERE+%7B%0A++%3Fpt3D+arp%3AhasX+%3Fx%3B+arp%3AhasY+%3Fy%3B+arp%3AhasZ+%3Fz%3B+arp%3AhasImagePointManager%2Farp%3AhasASetOfObservation+%3FsetObs.%0A+%3FsetObs+arp%3AhasX+%3FxImg+%3B+++arp%3AhasY+%3FyImg+%3B+arp%3AhasPhotograph+%3Fphotograph.+%0A%3Fphotograph++arp%3AhasFullFileName+%3FfileName%3B+arp%3AhasCamera+%3Fcam.%0A++%3Fcam+arp%3AhasFrameHeigthInPixel+%3Fheight%3B+arp%3AhasFrameWidthInPixel+%3Fwidth.%0A++Filter(%3Fx+%3E+"+bbox[0]+"+%26%26+%3Fx+%3C+"+bbox[1]+"+%26%26+%3Fy+%3E++"+bbox[2]+"+%26%26+%3Fy+%3C+"+bbox[3]+"+%26%26+%3Fz+%3E++"+bbox[4]+"+%26%26+%3Fz+%3C++"+bbox[5]+").%0A%7D";
    
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/"+baseName+"?output=json&query="+query,false); 
    req.send();
    var objResults = JSON.parse(req.responseText);
  
    return objResults;
  }
 




function FunctionExistanceYearArtifact()
{
    if(XlendiImgSourceAllAttributes == null){
    var year = document.getElementById("yearSelect").value;
    XlendiImgSourceAllAttributes = getXlendiImgSourceAllAttributes(artifact, "xlendi"+year+"Survey");
    }
    
    
    var radius = (parseFloat(getDiameter(artifact)))/2;
    var raised = false;
    var coordinates = get3DMeasuredPoints (artifact);
   var minDistance2D = 1000000;
    var minDistance2DGlobal = 100000;
    var ThreesholdDistance = 0.02;
    var distanceZ =0; 
        pt3D =  new Array();
  var maxZ = 0;
    
    var x1 = 0;
    var y1 = 0;
    var z1 = 0;
    
    var x2 = 0;
    var y2 = 0;
    var z2 = 0;
    
    var x3 = 0;
    var y3 = 0;
    var z3 = 0;
       document.getElementById("resultsImg").innerHTML +=" ---------"+year+"-----------</br>";
        for(var j = 0 ; j < XlendiImgSourceAllAttributes.results.bindings.length ; j++ ){
      var cor1 = new jsts.geom.Coordinate ( parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].x.value),  parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].y.value));

               var minDistance2D = 1000000;
             for(var i=0; i< coordinates.length;i++){   
     
                    var cor2 = new jsts.geom.Coordinate ( parseFloat(coordinates[i].x),  parseFloat(coordinates[i].y));     
       
                var distance2D = cor1.distance(cor2);
     
         //   alert(cor1+" - " + cor2+"  = "+distance2D +"  ");
         
            if(distance2D < minDistance2D)
         {
               minDistance2D = distance2D ;
             x2=parseFloat(coordinates[i].x);
             y2=parseFloat(coordinates[i].y);
             z2=parseFloat(coordinates[i].z);
          }
      }
  

         if(minDistance2D < minDistance2DGlobal)  
            {
             minDistance2DGlobal = minDistance2D;
             distanceZ = parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].z.value) - z2; 
                x1=parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].x.value); 
                y1=parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].y.value);
                z1=parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].z.value);
                
                 x3=x2; y3=y2; z3=z2;
             }
           
               
            
            /*if(minDistance2D <ThreesholdDistance){
                 distanceZ = parseFloat(XlendiImgSourceAllAttributes.results.bindings[j].z.value) - z2;
                         
             document.getElementById("resultsImg").innerHTML += "minDistance2D=" + minDistance2D+"  ||   " +x2+"      ;     "+ y2+"    ;     "+ z2 + "  ||  "+  XlendiImgSourceAllAttributes.results.bindings[j].x.value+ "   ;    "+  XlendiImgSourceAllAttributes.results.bindings[j].y.value+ "   ;  "+XlendiImgSourceAllAttributes.results.bindings[j].z.value+"</br>";
                  
             }*/
            
       /*   if(distanceZ > maxZ)
             {
               maxZ = distanceZ;
    
             }*/
 
         }
    
   
    
   document.getElementById("resultsImg").innerHTML += x3+ "   "+ y3+ "   "+ z3 + "  ||  "+  x1+ "   "+ y1+ "   "+z1+"</br>";
 /*                 
   if(maxZ > 0.05 )
        swal("the selected artifact has been raised in the selected year: "+"  " + maxZ +"  " + radius);
    
    else
    swal("the selected artifact has not been raised in the selected year "+"  " + maxZ +"  " + radius);*/
// alert ("minDistance2DGlobal : "+minDistance2DGlobal+" ||  max z distance: "+distanceZ + " || diameter: "+radius);
}


/**
return a coordinate for 3D pt translation from the ontology

param: artifact
*/
function getDiameter(artifact){
 
   
   var query="PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0A%0ASELECT+distinct+%3Fdiam+WHERE+%7B%0A++%3Famp+arp%3AhasName+%22"+artifact+"%22%3B+arp%3AhasBellyDiameter+%3Fdiam%0A%7D" ;
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);


    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
        return(objResults.results.bindings[j].diam.value);
     }
   
//alert (artifact +" translation "+cor);
    
    return null;
    
}



/**
This function (button run event) that computes similar artifact based on a brute Haussdorf distance and color them
**/
function FunctionSimilarArtifact(){
    
     clearTextes();       
     initColor();
    FunctionColorArtifacts(artifact, "gold");
    document.getElementById("loader").innerHTML = ' <div class="loader"></div> <span style="background-color:greenyellow;border-style: outset;">Please wait ... We are searching for similar artifacts ... </span>';
     var resultsSimilarArtifact= 0;
     var c1 = getTransformed3DMeasuredPoints(artifact);
     for (var k = 0; k < regions.length; k++) {
            var target =  regions[k].data('id'); 
         if( target != artifact){
        var c2 = getTransformed3DMeasuredPoints(target);
//alert(artifact + " vs. " + target + " ? H3D : "+H3D(c2, c1));
             var distance = H3D(c2, c1);
             
             var  threshold = parseFloat(slider.value) ;
             if(threshold != 0.0)
               threshold = (threshold *0.01)/3;
            if(distance <= threshold){
         //   alert(artifact +"  "+ target+" : "+distance+" <= "+ threeshold );
             //  var result =  [target, distance]; 
            //    results.push(result);
                resultsSimilarArtifact ++ ;
                FunctionColorArtifacts(target, "blue");
            }
           //  else alert(artifact +"  "+ target+" : "+distance+" <= "+ threeshold );
            }
     }
 //   alert(resultsSimilarArtifact);
    
 //    document.getElementById("buttonColorSimilarArtifact").disabled = false;
 // swal ("We found "+  resultsSimilarArtifact.length + " similar artifatcts :)");
    document.getElementById("resultsSimilarArtifactNumber").innerHTML = '<span style="background-color:powderblue;border-style: outset;">We found <b>'+  resultsSimilarArtifact + '</b> similar artifatcts colored in blue :) </span>';
    document.getElementById("loader").innerHTML = '';
    
   
}




/**
This function (button run event) that shows not measured artifacts and color them
 
**/

function FunctionNotMeasuredArtifact()
{   
    
    clearTextes();
    initColor();
    
    var notMeasuredAm = 0;
    var notMeasuredGr = 0;
    var nbMeasuredAm = 0;
    var nbMeasuredGr = 0;

    
     var l ='';
   for (var k = 0; k < regions.length; k++) {
       artifact = regions[k].data('id');

       
     if(artifact.startsWith("Amp")){
        if(!artifact.endsWith("Quadra1")) {
       if(!existArtifact(artifact) )  
         {
       regions[k].node.setAttribute('fill', "red");   
         notMeasuredAm++;
           
             l = l +"</br>-"+artifact;
         }
         
      else {
          nbMeasuredAm++;
      }  
            }
        }
       else if(artifact.startsWith("gs"))
  {
      if(!existArtifact(artifact) )  
         {
       regions[k].node.setAttribute('fill', "blue");   
         notMeasuredGr++;
            
             l = l +"</br>-"+artifact;
         }
         
      else {
          nbMeasuredGr++;
      }  
  }
}      

     init(); 
    document.getElementById("resultsNotMeasuredArtifacts").innerHTML = '<span style="background-color:powderblue;border-style: outset;">We found <b>'+ notMeasuredAm + '</b> not measured Amphorae (in red) and <b>'+ notMeasuredGr + '</b> not measured GrindingStone (in blue) </span> </br>';
   
    //alert(nbMeasuredAm + "  \n  " + nbMeasuredGr+" \n We found : \n-"+ notMeasuredGr + " not measured Amphorae (in red)\n-"+ notMeasuredAm + " not measured GrindingStone (in blue)");
  
  //  alert(l);
}








/**
return a coordinate for 3D pt translation from the ontology

param: artifact
*/
function getTranslation(artifact){
 
   var query="PREFIX+arp%3A%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+SELECT+distinct+%3Fx+%3Fy+%3Fz+WHERE+%7B%0A++%3Famp+arp%3AhasName+%22"+artifact+"%22.+%0A++%3Famp+arp%3AhasTransformation3D%2Farp%3AhasTranslation+%3Ftr.+%0A++%3Ftr+arp%3AhasX+%3Fx.+%3Ftr+arp%3AhasY+%3Fy.+%3Ftr+arp%3AhasZ+%3Fz.%0A%7D" ;
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);

var cor;
    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
        cor   = new jsts.geom.Coordinate (objResults.results.bindings[j].x.value, objResults.results.bindings[j].y.value, objResults.results.bindings[j].z.value);
     }
   
//alert (artifact +" translation "+cor);
    
    return cor;
    
}



/**
return if artifac exist in the ontology 

param: artifact
*/
function existArtifact(artifact){
 
   var query="PREFIX+arp%3A%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+SELECT+*+WHERE+%7B%0A++%3Famp+arp%3AhasName+%22"+artifact+"%22.%0A%7D" ;
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
   
    var objResults = JSON.parse(req.responseText);
    
    return (objResults.results.bindings.length >0);
    
}



/**
return a rotation matrix of a given artifact from the ontology

param: artifact
*/
function getRotationMatrix(artifact){
  
    
    
   var query = "PREFIX+arp%3A<http%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23>+SELECT+distinct+*+WHERE+{%0A++%3Famp+arp%3AhasName%22"+artifact+"%22.%0A++%3Famp+arp%3AhasTransformation3D%2Farp%3AhasRotationMatrix+%3Frot.+%0A++%3Frot+arp%3Ahas_m00+%3Fm00.%0A++%3Frot+arp%3Ahas_m01+%3Fm01.%0A++%3Frot+arp%3Ahas_m02+%3Fm02.%0A++%3Frot+arp%3Ahas_m10+%3Fm10.%0A++%3Frot+arp%3Ahas_m11+%3Fm11.%0A++%3Frot+arp%3Ahas_m12+%3Fm12.%0A++%3Frot+arp%3Ahas_m20+%3Fm20.%0A++%3Frot+arp%3Ahas_m21+%3Fm21.%0A++%3Frot+arp%3Ahas_m22+%3Fm22.%0A}" ;
    
     
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false);  
    req.send(null);
    var objResults = JSON.parse(req.responseText);
 
    
    //create empty matrix
    
   var matrix = [],
    H = 3, //  rows
    W = 3; // of 9 cells

for ( var y = 0; y < H; y++ ) {
    matrix[ y ] = [];
    for ( var x = 0; x < W; x++ ) {
        matrix[ y ][ x ] = "";
    }
}

  
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
         var m00 = objResults.results.bindings[j].m00.value;
         var m01 = objResults.results.bindings[j].m01.value;
         var m02 = objResults.results.bindings[j].m02.value;
         var m10 = objResults.results.bindings[j].m10.value;
         var m11 = objResults.results.bindings[j].m11.value;
         var m12 = objResults.results.bindings[j].m12.value;
         var m20 = objResults.results.bindings[j].m20.value;
         var m21 = objResults.results.bindings[j].m21.value;
         var m22 = objResults.results.bindings[j].m22.value;
    
         matrix[ 0 ][ 0 ] = m00;
         matrix[ 0 ][ 1 ] = m01;
         matrix[ 0 ][ 2 ] = m02;
         matrix[ 1 ][ 0 ] = m10;
         matrix[ 1 ][ 1 ] = m11;
         matrix[ 1 ][ 2 ] = m12;
         matrix[ 2 ][ 0 ] = m20;
         matrix[ 2 ][ 1 ] = m21;
         matrix[ 2 ][ 2 ] = m22;
    
     }
  
   //create empty matrix
    
   var matrixTr = [];
   

for ( var y = 0; y < H; y++ ) {
    matrixTr[ y ] = [];
    for ( var x = 0; x < W; x++ ) {
        matrixTr[ y ][ x ] = "";
    }
}
    
    for(var i=0; i< 3;i++){
        for(var j=0; j< 3;j++)
        {
    matrixTr[j][i] = matrix[ i ][ j ];
  
        }
}
 //   alert (matrix + " \n MatrixTR : \n "+ matrixTr);
    return matrixTr;
    
}



/**
return computed new set of 3D pts (transformed by translation + rotation matrix)

param: pt, rotation matrix, 3D pt(translation)
*/
function getComputed3DPoint(p, rotationMatrix, translation){
 // alert("pt3D : " +p+"\n\nrotationMatrix : " +rotationMatrix+"\n\ntranslation : " +translation);
    
      
   var x =  p.x - parseFloat(translation.x);
   var y =  p.y - parseFloat(translation.y);
   var z =  p.z - parseFloat(translation.z);
 //   alert("translation Computed pt3D : " +new jsts.geom.Coordinate(x,y,z));
   
   
    var xx = (rotationMatrix[0][0] * x) + (rotationMatrix[0][1] * y) + (rotationMatrix[0][2] * z);
    var yy = (rotationMatrix[1][0] * x) + (rotationMatrix[1][1] * y) + (rotationMatrix[1][2] * z);
    var zz = (rotationMatrix[2][0] * x) + (rotationMatrix[2][1] * y) + (rotationMatrix[2][2] * z);
    
  //  alert("rotationMatrix Computed pt3D : " +new jsts.geom.Coordinate(xx,yy,zz)); 
  
    return new jsts.geom.Coordinate(xx,yy,zz);
}


/**return a BBox Array of [xMin, xMax, yMin, yMax, zMin, zMax] **/
function getXlendiBBox(artifact){
    

    var query= "PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0ASELECT+distinct+*++WHERE+%7B%0A+%3Famp+arp%3AhasName+\""+ artifact+"\"%3B+arp%3AhasBoundingBox+%3Fbb.%0A%3Fbb+arp%3AhasXMax+%3FxMax%3B+arp%3AhasXMin+%3FxMin+%3B+arp%3AhasYMax+%3FyMax+%3B+arp%3AhasYMin+%3FyMin+%3B+arp%3AhasZMax+%3FzMax+%3B+arp%3AhasZMin+%3FzMin+%0A%7D";
    
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);

    
  var Bbox =  new Array();
    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
         Bbox[0] = parseFloat(objResults.results.bindings[j].xMin.value);
         Bbox[1] = parseFloat(objResults.results.bindings[j].xMax.value);
         Bbox[2] = parseFloat(objResults.results.bindings[j].yMin.value);
         Bbox[3] = parseFloat(objResults.results.bindings[j].yMax.value);
         Bbox[4] = parseFloat(objResults.results.bindings[j].zMin.value);
         Bbox[5] = parseFloat(objResults.results.bindings[j].zMax.value);
         
         }
   
//alert (coordinates);
 return Bbox;
    
}




/**
return a set of 3D measured pts of a given artifact from the ontology

param: artifact
*/
function get3DMeasuredPoints(artifact){
   
    var query= 
    "PREFIX+arp%3A<http%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23>+SELECT+distinct+%3Fx+%3Fy+%3Fz+WHERE+{%3Famp+arp%3AhasName+\""+ artifact+"\"%3B+arp%3AhasMeasuredPointManager+%3Fpts.+%3Fpts+arp%3AhasASetOf3DPointWithObs+%3Fpt.+%3Fpt+arp%3AhasX+%3Fx%3B+arp%3AhasY+%3Fy%3B+arp%3AhasZ+%3Fz.}";
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);

    //var coordinates = [];
    
  var coordinates =  new Array();
    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
          var cor = new jsts.geom.Coordinate (objResults.results.bindings[j].x.value, objResults.results.bindings[j].y.value, objResults.results.bindings[j].z.value);
   //    var pt = geometryFactory.createPoint(cor);
   //       alert(pt);
   //alert (cor.x);
//var a = new (objResults.results.bindings[j].x.value, objResults.results.bindings[j].y.value, objResults.results.bindings[j].z.value);
       //coordinates[j] = cor;
       coordinates.push(cor);
     
         }
   
//alert (coordinates);
 return coordinates;
}



/**
return a set of 3D measured pts of a given artifact from the ontology
as an array of THREE.JS Vectors3D
param: artifact
*/
function get3DMeasuredPoints_ThreeJsVectors(artifact){
   
    var query= 
    "PREFIX+arp%3A<http%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23>+SELECT+distinct+%3Fx+%3Fy+%3Fz+WHERE+{%3Famp+arp%3AhasName+\""+ artifact+"\"%3B+arp%3AhasMeasuredPointManager+%3Fpts.+%3Fpts+arp%3AhasASetOf3DPointWithObs+%3Fpt.+%3Fpt+arp%3AhasX+%3Fx%3B+arp%3AhasY+%3Fy%3B+arp%3AhasZ+%3Fz.}";
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);

    //var coordinates = [];
    
  var coordinates =  new Array();
    
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
 var a = new THREE.Vector3(objResults.results.bindings[j].x.value, objResults.results.bindings[j].y.value, objResults.results.bindings[j].z.value);
       
       coordinates[j] = a;
     
         }
   
return coordinates;
}




function FunctionShowBarycenter(){
    var bar = getBarycenter(artifact);
    document.getElementById("resultsBarycenter").innerHTML = '<span style="background-color:powderblue;border-style: outset;"> <b>The barycenter corresponding to the source = </br> <b>'+bar+'</br></span> ';
    
    
}


/**
return a 3D coordinate pt of a the barycenter corresponding to given artifact from the ontology

param: artifact
*/
function getBarycenter(artifact){
   
    var query= 
    "PREFIX+arp%3A<http%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23>+SELECT+distinct+%3Fx+%3Fy+%3Fz+WHERE+{%3Famp+arp%3AhasName+\""+ artifact+"\"%3B+arp%3AhasMeasuredPointManager+%3Fpts.+%3Fpts+arp%3AhasASetOf3DPointWithObs+%3Fpt.+%3Fpt+arp%3AhasX+%3Fx%3B+arp%3AhasY+%3Fy%3B+arp%3AhasZ+%3Fz.}";
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);

     
    var avgX =0;
    var avgY =0;
    var avgZ =0;
   
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         
         avgX+= parseFloat(objResults.results.bindings[j].x.value) ;
         avgY+= parseFloat(objResults.results.bindings[j].y.value) ;
         avgZ+= parseFloat(objResults.results.bindings[j].z.value) ;
         
           }
 // alert (avgX +"    "+avgY +"    "+avgZ+"    ");  
    avgX = avgX /  objResults.results.bindings.length ;
    avgY = avgY /  objResults.results.bindings.length ;
    avgZ = avgZ /  objResults.results.bindings.length ;
   
//alert (avgX +"    "+avgY +"    "+avgZ+"    ");
 return (new jsts.geom.Coordinate (avgX, avgY, avgZ));

}







/**
alert(names barycentres)
*/
function getAllBarycenterGr(){
   
    var query= 'PREFIX+arp%3A+%3Chttp%3A%2F%2Fwww.arpenteur.org%2Fontology%2FArpenteur.owl%23%3E+%0ASELECT+distinct+%3Fname+%0AWHERE+%7B+%0A++%3Fart+a+arp%3AAmphorae%3B+arp%3AhasName+%3Fname.%0A%7D';
    var req = new XMLHttpRequest();
	req.open("GET","http://139.124.41.79:8080/fuseki/xlendi?output=json&query="+query,false); 
    req.send(null);
    var objResults = JSON.parse(req.responseText);

     
var msg ='';
   
     for(var j = 0 ; j < objResults.results.bindings.length ; j++ ){
         var nameGr = objResults.results.bindings[j].name.value;
       msg+= "\n-"+ nameGr+" " +getBarycenter(nameGr) ;
           }
}








/**
**
return oriented array of 3D points (coordinates)

param artifact name
*/
function getTransformed3DMeasuredPoints(artifact){
    
var rot = getRotationMatrix(artifact);
var tr = getTranslation(artifact);
var coordinates = get3DMeasuredPoints (artifact);
var coordinatesTransformed =  new Array();

    for(var j = 0 ; j < coordinates.length ; j++ ){
        
coordinatesTransformed[j] = getComputed3DPoint(coordinates[j],rot,tr);
//         alert (coordinates[j]+" \n\n"+p);

}
    
//    alert (coordinates [10]+" \n\n"+coordinatesTransformed[j][10]);
    return coordinatesTransformed;
}






/**
**
return brute Hausdorff 2D distance (based on euclidien 2D)

param coordinates1, coordinates2 of two different artifacts
*/
function bruteHausdorff2D(coordinates1, coordinates2){
var max = 0;

    for(var i=0; i < coordinates1.length; i++){
 var min =1;
    for(var j=0; j < coordinates2.length; j++){
    distance = coordinates1[i].distance(coordinates2[j]);
        if(distance < min)
            min = distance;
}
        if (min > max)
            max = min;
    }
    return max;
}




/**
**
return brute Hausdorff 3D distance (based on euclidien 3D)

param coordinates1, coordinates2 of two different artifacts
*/
function bruteHausdorff3D(coordinates1, coordinates2){
    

var max = 0;

    for(var i=0; i < coordinates1.length; i++){
 var min =10000;
    for(var j=0; j < coordinates2.length; j++){
    distance = coordinates1[i].distance3D(coordinates2[j]);
        if(distance < min)
            min = distance;
}
        if (min > max)
            max = min;
    }
    return max;
}


/**
symetric Hausdorff*/
function H2D(coordinates1, coordinates2){
    return Math.max(bruteHausdorff2D(coordinates1, coordinates2), bruteHausdorff2D(coordinates2, coordinates1));
}



/**
symetric Hausdorff*/
function H3D(coordinates1, coordinates2){
     return Math.max(bruteHausdorff3D(coordinates1, coordinates2), bruteHausdorff3D(coordinates2, coordinates1));
}


//var rot = getRotationMatrix("Amphore_A61");
//var tr = getTranslation("Amphore_A61");
//var c1 = get3DMeasuredPoints ("Amphore_A61");
//var p = getComputed3DPoint(c1[0],rot,tr);
//var c1 = getBarycenter("Amphore_A61");
//var c1 = getTransformed3DMeasuredPoints("Amphore_A60");
//var c2 = getTransformed3DMeasuredPoints("Amphore_A53");
//var c3 = getTransformed3DMeasuredPoints("Amphore_A17");
//var c4 = getTransformed3DMeasuredPoints("gs2");


//alert("bruteHausdorff2D : "+bruteHausdorff2D(c1, c2) + " \nbruteHausdorff3D : "+bruteHausdorff3D(c1, c2) + "\n\nbruteHausdorff2D : "+bruteHausdorff2D(c2, c1) + " \nbruteHausdorff3D : "+bruteHausdorff3D(c2, c1)     + "\n\nH2D : "+H2D(c2, c1) + " \nH3D : "+H3D(c2, c1)+ "\n\nH2D : "+H2D(c2, c1) + " \nH3D : "+H3D(c2, c1));


//alert ("H2D : "+H2D(c2, c3) + "\n\nH3D : "+H3D(c2, c3));

//alert ("H2D : "+H2D(c4, c2) + "\n\nH3D : "+H3D(c4, c2));
//alert(p1.equals3D(p2));
//var dist = new jts.algorithm.distance.DiscreteHausdorffDistance(p1 , p2) ;
//alert(dist.distance());



