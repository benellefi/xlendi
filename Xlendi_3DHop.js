var presenter = null;

function setup3dhop(artifactOriginURL) { 
	
	presenter = new Presenter("draw-canvas");
 
	presenter.setScene({
		meshes: {
		    "artifact_Origin" : { url: artifactOriginURL},
			                    
		},                                           
		modelInstances : {                           
			"artifact_Origin" : {                         
				mesh : "artifact_Origin",                 
			},                                       
		},   
		trackball: {
			type : TurnTableTrackball,
			trackOptions: {
				//startPanX: 1.0,
				//startPanY: -0.5,
				//startDistance: 2.5,
			}
		}
	
	});
	
	
	presenter.setSpotVisibility(HOP_ALL, false, true);
	
	presenter._onPickedSpot = onPickedSpot;
//	presenter._onPickedInstance = onPickedInstance;
	presenter._onEndPickingPoint = onEndPick;
	presenter._onEndMeasurement = onEndMeasure;
	
}

 
    
function actionsToolbar(action) {
	if(action=='home') presenter.resetTrackball(); 
	else if(action=='zoomin') presenter.zoomIn();
	else if(action=='zoomout') presenter.zoomOut(); 
	else if(action=='lighting' || action=='lighting_off') { presenter.enableSceneLighting(!presenter.isSceneLightingEnabled()); lightingSwitch(); }
	else if(action=='light' || action=='light_on') { presenter.enableLightTrackball(!presenter.isLightTrackballEnabled()); lightSwitch(); } 
	else if(action=='hotspot'|| action=='hotspot_on') { presenter.toggleSpotVisibility(HOP_ALL, true); presenter.enableOnHover(!presenter.isOnHoverEnabled()); hotspotSwitch(); }
	else if(action=='measure' || action=='measure_on') { presenter.enableMeasurementTool(!presenter.isMeasurementToolEnabled()); measureSwitch(); } 
	else if(action=='pick' || action=='pick_on') { presenter.enablePickpointMode(!presenter.isPickpointModeEnabled()); pickpointSwitch(); } 
    else if(action=='perspective' || action=='orthographic') { presenter.toggleCameraType(); cameraSwitch(); }	
	else if(action=='sections' || action=='sections_on') { sectiontoolReset(); sectiontoolSwitch(); } 
	else if(action=='full'  || action=='full_on') fullscreenSwitch(); 
}


function onPickedSpot(id) {
  switch(id) {
     case 'a02' : alert("Amphorare A02 Clicked"); break;
     case 'a03' : alert("Amphorare A03 Clicked"); break;
	 case 'a11' : alert("Amphorare A11 Clicked"); break;
	 case 'a21' : alert("Amphorare A21 Clicked"); break;
  }
}


function onEndPick(point) {
	// point.toFixed(2) sets the number of decimals when displaying the picked point
	var x = point[0].toFixed(2);
	var y = point[1].toFixed(2);
	var z = point[2].toFixed(2);
	$('#pickpoint-output').html("[ "+x+" , "+y+" , "+z+" ]");
}


function onEndMeasure(measure) {
	// measure.toFixed(2) sets the number of decimals when displaying the measure
	// depending on the model measure units, use "mm","m","km" or whatever you have
	$('#measure-output').html(measure.toFixed(2) + " m");
}


$(document).ready(function(){

	init3dhop();
//	setup3dhop("models/gs6.ply" );
sectiontoolInit();
//	resizeCanvas(400, 600);
});


