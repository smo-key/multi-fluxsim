//*** RUN EVERYTHING ***//
if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}
else
{
  init();
  var lastTime = new Date().getTime();
  render();
}

function init()
{
  //Prepare 3D renderer using three.js
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  //Maximize renderer to window
  renderer.setSize(window.innerWidth, window.innerHeight);
  //Activate the three.js DOM render element
  renderer.setClearColor(0x000000, 1.0);
  document.body.appendChild(renderer.domElement);
  //Allow shadow mapping
  // renderer.shadowMapEnabled = true;

  scene = new THREE.Scene(); //initilize scene
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 250); //add new camera definition (FOV deg, aspect ratio, near, far)
  camera.position.z = 4; //set z axis camera position
  light = new THREE.AmbientLight(0x888888);
  scene.add(light);

  //set up variables
  var step = 1;
  var xStart = -10;
  var xEnd = 10;
  var yStart = -10;
  var yEnd = 10;
  var term = "2x"

  // calc the variables
  var width = Math.abs(-xStart+xEnd),
      height = Math.abs(-yStart+yEnd);

  var stepsX = width*step, stepsY = height*step;

  var posX = (xStart+xEnd)/2;
  var posZ = (yStart+yEnd)/2;

  // add a plane and morph it to a function
  var geometry = new THREE.PlaneGeometry( width, height, stepsX - 1, stepsY - 1 );
  geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

  var size = stepsX * (stepsY),
      data = new Float32Array( size );

  var count = 0, scope = {};

  mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial( {
      side : THREE.DoubleSide,
      transparent: true,
      shading: THREE.SmoothShading,
      opacity : 0.8 }));

  mesh.updateMatrixWorld();

  // calc y value for every vertice
  for ( var i = 0; i < size; i ++ ) {
      // calculate the current values
      // http://stackoverflow.com/questions/11495089/how-to-get-the-absolute-position-of-a-vertex-in-three-js
      var vector = mesh.geometry.vertices[i].clone();
      vector.applyMatrix4(
          mesh.matrixWorld
          );
      // set them into the scope
      scope.x = vector.x + posX;
      scope.y = vector.z + posZ;
      // calculate point and write it in a temp array
      data[i] = math.eval(term, scope);
  }

  // push the new vertice data
  for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
      geometry.vertices[ i ].y = data[ i ];
  }

  // update the new normals
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  // add to scene
  scene.add( mesh );

  //*** CAMERA CONTROLS ***//
  //Trackball Controller
  controls = new THREE.TinyTrackballControls(camera, renderer.domElement);
  controls.rotateSpeed = 0.4;
  controls.noZoom = false;
  controls.noPan = true;
  controls.staticMoving = false;
  controls.minDistance = 1.75;
  controls.maxDistance = 8.5;
  controls.dynamicDampingFactor = 0.25;
}

function animate()
{
  var nowMsec = new Date().getTime();

  //lastTime = lastTime || nowMsec-1000/60;

  var degsec = g_period / 360 ; //s (in simulation) it takes to traverse binsize
  var msframe = 60 * Math.pow(10,(this.speed - deltarealt)); //ms in sim / ms in realtime
  var deltat = nowMsec - lastTime;
  var maxtime = degsec / msframe * 1000 * this.binsize; //maximum msec between frames = ms in sim / ms in realtime
  this.timemax = maxtime;

  var deltaMsec = Math.min(maxtime, deltat);

  lastTime = nowMsec;

  render(deltaMsec / 1000, nowMsec / 1000);
}

function render(delta, now)
{
  //UPDATE CONTROLS
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
