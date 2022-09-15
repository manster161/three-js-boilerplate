const serverURL = "ws://localhost:8081";
let socket;

function setup(){
 openSocket(serverURL);
}

function openSocket(url){
	socket = new WebSocket(url);
	socket.addEventListener('open', openConnection);
	socket.addEventListener('close', closeConnection);
	socket.addEventListener('message', messageRecieved);
}

function openConnection() {
	// display the change of state:
	console.log((new Date()) + ' Client connected');
  }
  
function closeConnection() {
	// display the change of state:
	console.log((new Date()) + ' Client connection closer');
  }

  function messageRecieved(message){
	console.log((new Date()) + ' Message recieved ' + message.toString());
  }

function changeConnection(event) {
	// open the connection if it's closed, or close it if open:
	if (socket.readyState === WebSocket.CLOSED) {
	  openSocket(serverURL);
	} else {
	  socket.close();
	}
  }
  

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};

setup();

animate();