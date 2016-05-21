// mathbox = mathBox({
//   plugins: ['core', 'controls', 'cursor'],
//   controls: {
//     klass: THREE.OrbitControls,
//   },
//   camera: {
//   }
// });
// three = mathbox.three;
// three.controls.maxDistance = 4;
// three.camera.position.set(2.5, 1, 2.5);
// three.renderer.setClearColor(new THREE.Color(0x000000), 1.0);
// view = mathbox
// .set({
//   scale: 720
// })
// .cartesian({
//   range: [[-1, 1], [-1, 1], [-1, 1]],
//   scale: [1, 1, 1],
// })
// var rez = 10;
// view
// .axis({
//   axis: 1,
//   width: 12,
// })
// .axis({
//   axis: 2,
//   width: 12,
// })
// .axis({
//   axis: 3,
//   width: 12,
// })
// .grid({
//   width: 2,
//   axes: [1, 3],
//   divideX: 10,
//   divideY: 10,
// });
//
// view.surface({
//   color: "#9C27B0",
//   points: null;
// });

THREE.WireframeGeometry = function ( geometry ) {

	THREE.BufferGeometry.call( this );

	var edge = [ 0, 0 ], hash = {};

	function sortFunction( a, b ) {

		return a - b;

	}

	var keys = [ 'a', 'b', 'c' ];

	if ( geometry instanceof THREE.Geometry ) {

		var vertices = geometry.vertices;
		var faces = geometry.faces;
		var numEdges = 0;

		// allocate maximal size
		var edges = new Uint32Array( 6 * faces.length );

		for ( var i = 0, l = faces.length; i < l; i ++ ) {

			var face = faces[ i ];

			for ( var j = 0; j < 3; j ++ ) {

				edge[ 0 ] = face[ keys[ j ] ];
				edge[ 1 ] = face[ keys[ ( j + 1 ) % 3 ] ];
				edge.sort( sortFunction );

				var key = edge.toString();

				if ( hash[ key ] === undefined ) {

					edges[ 2 * numEdges ] = edge[ 0 ];
					edges[ 2 * numEdges + 1 ] = edge[ 1 ];
					hash[ key ] = true;
					numEdges ++;

				}

			}

		}

		var coords = new Float32Array( numEdges * 2 * 3 );

		for ( var i = 0, l = numEdges; i < l; i ++ ) {

			for ( var j = 0; j < 2; j ++ ) {

				var vertex = vertices[ edges [ 2 * i + j ] ];

				var index = 6 * i + 3 * j;
				coords[ index + 0 ] = vertex.x;
				coords[ index + 1 ] = vertex.y;
				coords[ index + 2 ] = vertex.z;

			}

		}

		this.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

	} else if ( geometry instanceof THREE.BufferGeometry ) {

		if ( geometry.index !== null ) {

			// Indexed BufferGeometry

			var indices = geometry.index.array;
			var vertices = geometry.attributes.position;
			var groups = geometry.groups;
			var numEdges = 0;

			if ( groups.length === 0 ) {

				geometry.addGroup( 0, indices.length );

			}

			// allocate maximal size
			var edges = new Uint32Array( 2 * indices.length );

			for ( var o = 0, ol = groups.length; o < ol; ++ o ) {

				var group = groups[ o ];

				var start = group.start;
				var count = group.count;

				for ( var i = start, il = start + count; i < il; i += 3 ) {

					for ( var j = 0; j < 3; j ++ ) {

						edge[ 0 ] = indices[ i + j ];
						edge[ 1 ] = indices[ i + ( j + 1 ) % 3 ];
						edge.sort( sortFunction );

						var key = edge.toString();

						if ( hash[ key ] === undefined ) {

							edges[ 2 * numEdges ] = edge[ 0 ];
							edges[ 2 * numEdges + 1 ] = edge[ 1 ];
							hash[ key ] = true;
							numEdges ++;

						}

					}

				}

			}

			var coords = new Float32Array( numEdges * 2 * 3 );

			for ( var i = 0, l = numEdges; i < l; i ++ ) {

				for ( var j = 0; j < 2; j ++ ) {

					var index = 6 * i + 3 * j;
					var index2 = edges[ 2 * i + j ];

					coords[ index + 0 ] = vertices.getX( index2 );
					coords[ index + 1 ] = vertices.getY( index2 );
					coords[ index + 2 ] = vertices.getZ( index2 );

				}

			}

			this.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

		} else {

			// non-indexed BufferGeometry

			var vertices = geometry.attributes.position.array;
			var numEdges = vertices.length / 3;
			var numTris = numEdges / 3;

			var coords = new Float32Array( numEdges * 2 * 3 );

			for ( var i = 0, l = numTris; i < l; i ++ ) {

				for ( var j = 0; j < 3; j ++ ) {

					var index = 18 * i + 6 * j;

					var index1 = 9 * i + 3 * j;
					coords[ index + 0 ] = vertices[ index1 ];
					coords[ index + 1 ] = vertices[ index1 + 1 ];
					coords[ index + 2 ] = vertices[ index1 + 2 ];

					var index2 = 9 * i + 3 * ( ( j + 1 ) % 3 );
					coords[ index + 3 ] = vertices[ index2 ];
					coords[ index + 4 ] = vertices[ index2 + 1 ];
					coords[ index + 5 ] = vertices[ index2 + 2 ];

				}

			}

			this.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

		}

	}

};

THREE.WireframeGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
THREE.WireframeGeometry.prototype.constructor = THREE.WireframeGeometry;

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
  //renderer.shadowMapEnabled = true;

  scene = new THREE.Scene(); //initilize scene
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 250); //add new camera definition (FOV deg, aspect ratio, near, far)
  camera.position.z = 4; //set z axis camera position
  // light = new THREE.AmbientLight(0x888888);
  // scene.add(light);

  //set up variables
  var step = 20;
  var xStart = -1;
  var xEnd = 1;
  var yStart = -1;
  var yEnd = 1;
  var term = "x^2+y^2"

  // calc the variables
  var width = Math.abs(-xStart+xEnd),
      height = Math.abs(-yStart+yEnd);

  var stepsX = width*step, stepsY = height*step;

  var posX = (xStart+xEnd)/2;
  var posY = (yStart+yEnd)/2;

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
      opacity : 1 }));

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
      scope.y = vector.z + posY;
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
  controls.noPan = false;
  controls.staticMoving = false;
  controls.minDistance = 1;
  controls.maxDistance = 15;
  controls.dynamicDampingFactor = 0.25;
}

function animate()
{
  var nowMsec = new Date().getTime();
  var deltaMsec = nowMsec - lastTime;

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
