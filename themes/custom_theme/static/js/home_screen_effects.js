const params = {
    style: {
        antialias: 2,
        moon_distance: 2.3,
        moon_size: 0.1,
        planet_size: 1,
        planet_opacity: .85,
        line_width: 1,
        line_color: 0x171717,
        main_color: 0xfffbeb,
        moon_color: 0x171717,
    },
    interaction: {
        /** Scale of the mouse interaction relative to the planet size. 1.0 is planet size, 0.0 is none, 0.5 is inside, 1.5 is outside */
        planet_interaction_scale: 1.1,
        mouse_influence: 0.18,
    },
    animation: {
        speed: 0.2,
        moon_speed: 0.8,
        /** How long does it take to get back to default force  */
        back_to_default_force_speed: 0.007,
        default_force: new THREE.Vector3(0.75, 0.25, 0.75),
    }
};


const canvas = document.querySelector("#threejs");

window.addEventListener('resize', on_window_resize, false);
canvas.addEventListener('mousemove', on_canvas_mouse_move, false);

let scene, camera, renderer;
let planet_object, orbit_object;

let mouse = new THREE.Vector2();
let clock = new THREE.Clock();
let last_mouse_position = mouse.clone();
let applied_force = params.animation.default_force.clone();


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
    const planet_object_wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(params.style.planet_size, 0)),
        new THREE.LineBasicMaterial({ color: params.style.line_color, linewidth: params.style.line_width })
    );
    planet_object_wireframe.renderOrder = 1;

    // planet
    planet_object = new THREE.Mesh(
        new THREE.DodecahedronGeometry(params.style.planet_size, 0),
        new THREE.MeshBasicMaterial({ color: params.style.main_color, transparent: true, opacity: params.style.planet_opacity })
    );
    planet_object.add(planet_object_wireframe)
    scene.add(planet_object);

    // moon
    const moon_object = new THREE.Mesh(
        new THREE.SphereGeometry(params.style.moon_size, 32, 16),
        new THREE.MeshBasicMaterial({ color: params.style.moon_color })
    );
    moon_object.position.x = params.style.moon_distance;

    // orbit
    const points = new THREE.Path().absarc(0, 0, params.style.moon_distance, 0, Math.PI * 2).getPoints(90);
    orbit_object = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: params.style.moon_color, linewidth: params.style.line_width })
    );
    orbit_object.attach(moon_object);
    orbit_object.rotation.x = -1.35;
    orbit_object.rotation.y = -0.3;
    scene.add(orbit_object);
}


function animate() {
    let animation_request = requestAnimationFrame(animate);
    let delta = clock.getDelta() * params.animation.speed;

    // calculate the mouse force
    let diff = last_mouse_position.clone().sub(mouse);
    let mouse_force = new THREE.Vector3(diff.y, -diff.x, 0);
    mouse_force.normalize().multiplyScalar(params.interaction.mouse_influence);
    last_mouse_position = mouse.clone();

    applied_force = applied_force.clone()
        .add(mouse_force).clone()
        .lerp(params.animation.default_force, params.animation.back_to_default_force_speed).clone();


    // animate the planet
    {
        const rotation_axis = new THREE.Vector3(applied_force.x, applied_force.y, applied_force.z).normalize();
        const delta_quaternion = new THREE.Quaternion().setFromAxisAngle(rotation_axis, applied_force.length() * delta);
        planet_object.quaternion.premultiply(delta_quaternion);
    }

    // animate the moon
    {
        orbit_object.rotation.z += params.animation.moon_speed * delta;
    }

    renderer.render(scene, camera);
}


function on_canvas_mouse_move(event) {
    const canvas_rect = canvas.getBoundingClientRect();

    let pos = new THREE.Vector2();

    pos.x = ((event.clientX - canvas_rect.left) / canvas_rect.width) * 2 - 1;
    pos.y = -((event.clientY - canvas_rect.top) / canvas_rect.height) * 2 + 1;

    const aspect = canvas.offsetWidth / canvas.offsetHeight;
    const distance = Math.sqrt((pos.x * aspect) ** 2 + pos.y ** 2);

    if (distance <= get_planet_interaction_radius()) {
        mouse = pos.clone();
    }
}


function on_window_resize() {
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight, false);
}


function get_planet_interaction_radius() {
    const fovRad = (camera.fov * Math.PI) / 180;
    const halfHeightAtPlanet = Math.tan(fovRad / 2) * camera.position.z;
    return (params.style.planet_size / halfHeightAtPlanet) * params.interaction.planet_interaction_scale;
}


init();
animate();
