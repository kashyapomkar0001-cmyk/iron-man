import * as THREE from "three";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let orb: THREE.Mesh;

export function initOrbScene() {
  const canvas = document.getElementById(
    "jarvis-canvas"
  ) as HTMLCanvasElement;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Ambient Light
  const ambient = new THREE.AmbientLight(0xffa500, 1.2);
  scene.add(ambient);

  // Point Light
  const point = new THREE.PointLight(0xff8800, 8);
  point.position.set(3, 3, 5);
  scene.add(point);

  // Orb
  const geometry = new THREE.SphereGeometry(1, 64, 64);

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xff8800,
    emissive: 0xff6600,
    emissiveIntensity: 2,
    roughness: 0.15,
    metalness: 0.85,
    transmission: 0.4,
    transparent: true,
    opacity: 0.9,
  });

  orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  // Wireframe Shell
  const wire = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
  );

  scene.add(wire);

  function animate() {
    requestAnimationFrame(animate);

    orb.rotation.y += 0.01;
    orb.rotation.x += 0.003;

    wire.rotation.y -= 0.004;
    wire.rotation.x += 0.002;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
