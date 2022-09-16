
// Parameters
const antialias = 2.75;
const moonDistance = 2.3;
const moonSize = 0.1;
const centerSize = 1;
const lineColor = 0x171717
const mainColor = 0xfffbeb
const moonColor = 0x171717
const opacity = 0.85

const mouseDetectionRadius = 0.6;
const mouseInfluence = 0.15;

const animationSpeed = 0.2;
const moonSpeed = 0.8;

const backToDefaultForceSpeed = 0.007;
const defaultForce = new THREE.Vector3(0.75, 0.25, 0.75);







const canvas = document.querySelector("#threejs");

window.addEventListener('resize', onWindowResize, false);
canvas.addEventListener('mousemove', onCanvasMouseMove, false);

let scene, camera, renderer;
let centerObject, tmpParent, orbitObject;

let mouse = new THREE.Vector2();
let clock = new THREE.Clock();
let lastMousePosition = mouse.clone();
let appliedForce = defaultForce.clone();



function init() {
	// Scene
	scene = new THREE.Scene();

	// Camera
	camera = new THREE.PerspectiveCamera(25, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
	camera.position.setZ(7);

	// Render
	renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		alpha: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio * antialias);
	
	// Center Object Wireframe
	const centerObjectWireframe = new THREE.LineSegments(
		new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(1, 0)),
		new THREE.LineBasicMaterial({ color: lineColor, linewidth: 1 })
	);
	centerObjectWireframe.renderOrder = 1;

	// Center Object
	centerObject = new THREE.Mesh(
		new THREE.DodecahedronGeometry(centerSize, 0),
		new THREE.MeshBasicMaterial({ color: mainColor, transparent: true, opacity: 0.85 })
	);
	centerObject.add(centerObjectWireframe)
	scene.add(centerObject);

	// Temporary Parent
	tmpParent = new THREE.Object3D();
	scene.add(tmpParent);

	// Moon
	const moonObject = new THREE.Mesh(
		new THREE.SphereGeometry(moonSize, 32, 16),
		new THREE.MeshBasicMaterial({ color: moonColor })
	);
	moonObject.position.x = moonDistance;

	// Orbit
	const points = new THREE.Path().absarc(0, 0, moonDistance, 0, Math.PI * 2).getPoints(90);
	orbitObject = new THREE.Line(
		new THREE.BufferGeometry().setFromPoints(points),
		new THREE.LineBasicMaterial({color: moonColor, })
	);
	orbitObject.attach(moonObject);
	orbitObject.rotation.x = -1.35;
	orbitObject.rotation.y = -0.3;
	scene.add(orbitObject);

}

function animate() {
	let animationRequest = requestAnimationFrame(animate);
	let delta = clock.getDelta() * animationSpeed;

	// calculate the mouse force
	let diff = lastMousePosition.sub(mouse);
	let mouseForce = new THREE.Vector3(diff.y, -diff.x, 0);
	mouseForce.normalize().multiplyScalar(mouseInfluence);
	lastMousePosition = mouse.clone();

	appliedForce = appliedForce.clone()
		.add(mouseForce).clone()
		.lerp(defaultForce, backToDefaultForceSpeed).clone();


	// animate the main model
	{
		// make sure the mainModel does not have a parent
		scene.attach(centerObject)

		// reset the parent's rotation
		tmpParent.rotation.set(0, 0, 0);

		// attach the mainModel
		tmpParent.attach(centerObject);

		// rotate the parent
		tmpParent.rotation.x += appliedForce.x * delta;
		tmpParent.rotation.y += appliedForce.y * delta;
		tmpParent.rotation.z += appliedForce.z * delta;
	}

	// animate the moon
	{
		orbitObject.rotation.z += moonSpeed * delta;
	}

	renderer.render(scene, camera);
}

function onCanvasMouseMove(event) {
	let pos = new THREE.Vector2();
	pos.x = ((event.clientX - canvas.offsetLeft) / canvas.offsetWidth) * 2 - 1;
	pos.y = - ((event.clientY - canvas.offsetTop) / canvas.offsetHeight) * 2 + 1;
	let distance = new THREE.Vector2(0, 0).distanceTo(pos);

	if (distance <= mouseDetectionRadius) {
		mouse = pos.clone();
	}
}

function onWindowResize() {
	camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
	camera.updateProjectionMatrix();
}

init();
animate();