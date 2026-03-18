const params = {
    "style": {
        "antialias": 2,
        "moonDistance": 2.3,
        "moonSize": 0.1,
        "planetSize": 1,
        "planetOpacity": .85,
        "lineWidth": 1,
        "lineColor": 0x171717,
        "mainColor": 0xfffbeb,
        "moonColor": 0x171717,
    },
    "interaction": {
        /** Scale of the mouse interaction relative to the planet size. 1.0 is planet size, 0.0 is none, 0.5 is inside, 1.5 is outside */
        "planetInteractionScale": 1.1,
        "mouseInfluence": 0.18,
    },
    "animation": {
        "speed": 0.2,
        "moonSpeed": 0.8,
        /** How long does it take to get back to default force  */
        "backToDefaultForceSpeed": 0.007,
        "defaultForce": new THREE.Vector3(0.75, 0.25, 0.75),
    }
};


const canvas = document.querySelector("#threejs");

window.addEventListener('resize', onWindowResize, false);
canvas.addEventListener('mousemove', onCanvasMouseMove, false);

let scene, camera, renderer;
let planetObject, orbitObject;

let mouse = new THREE.Vector2();
let clock = new THREE.Clock();
let lastMousePosition = mouse.clone();
let appliedForce = params.animation.defaultForce.clone();


function init() {
    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(25, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    camera.position.setZ(7);

    // render
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio * params.style.antialias);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);

    // planet wireframe
    const planetObjectWireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(params.style.planetSize, 0)),
        new THREE.LineBasicMaterial({ color: params.style.lineColor, linewidth: params.style.lineWidth })
    );
    planetObjectWireframe.renderOrder = 1;

    // planet
    planetObject = new THREE.Mesh(
        new THREE.DodecahedronGeometry(params.style.planetSize, 0),
        new THREE.MeshBasicMaterial({ color: params.style.mainColor, transparent: true, opacity: params.style.planetOpacity })
    );
    planetObject.add(planetObjectWireframe)
    scene.add(planetObject);

    // moon
    const moonObject = new THREE.Mesh(
        new THREE.SphereGeometry(params.style.moonSize, 32, 16),
        new THREE.MeshBasicMaterial({ color: params.style.moonColor })
    );
    moonObject.position.x = params.style.moonDistance;

    // orbit
    const points = new THREE.Path().absarc(0, 0, params.style.moonDistance, 0, Math.PI * 2).getPoints(90);
    orbitObject = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: params.style.moonColor, linewidth: params.style.lineWidth })
    );
    orbitObject.attach(moonObject);
    orbitObject.rotation.x = -1.35;
    orbitObject.rotation.y = -0.3;
    scene.add(orbitObject);
}


function animate() {
    let animationRequest = requestAnimationFrame(animate);
    let delta = clock.getDelta() * params.animation.speed;

    // calculate the mouse force
    let diff = lastMousePosition.clone().sub(mouse);
    let mouseForce = new THREE.Vector3(diff.y, -diff.x, 0);
    mouseForce.normalize().multiplyScalar(params.interaction.mouseInfluence);
    lastMousePosition = mouse.clone();

    appliedForce = appliedForce.clone()
        .add(mouseForce).clone()
        .lerp(params.animation.defaultForce, params.animation.backToDefaultForceSpeed).clone();


    // animate the planet
    {
        const rotationAxis = new THREE.Vector3(appliedForce.x, appliedForce.y, appliedForce.z).normalize();
        const deltaQuaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, appliedForce.length() * delta);
        planetObject.quaternion.premultiply(deltaQuaternion);
    }

    // animate the moon
    {
        orbitObject.rotation.z += params.animation.moonSpeed * delta;
    }

    renderer.render(scene, camera);
}


function onCanvasMouseMove(event) {
    const canvas_rect = canvas.getBoundingClientRect();

    let pos = new THREE.Vector2();

    pos.x = ((event.clientX - canvas_rect.left) / canvas_rect.width) * 2 - 1;
    pos.y = -((event.clientY - canvas_rect.top) / canvas_rect.height) * 2 + 1;

    const aspect = canvas.offsetWidth / canvas.offsetHeight;
    const distance = Math.sqrt((pos.x * aspect) ** 2 + pos.y ** 2);

    if (distance <= getPlanetInteractionRadius()) {
        mouse = pos.clone();
    }
}


function onWindowResize() {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
}


function getPlanetInteractionRadius() {
    const fovRad = (camera.fov * Math.PI) / 180;
    const halfHeightAtPlanet = Math.tan(fovRad / 2) * camera.position.z;
    return (params.style.planetSize / halfHeightAtPlanet) * params.interaction.planetInteractionScale;
}


init();
animate();
