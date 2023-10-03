import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Set the background color to white (0xffffff)
document.body.appendChild(renderer.domElement);

const originalCubeSize = 1;
const cubeSize = originalCubeSize * 2; // Make the cube 2 times bigger

// Create the main cube with purple material
const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const mainMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
const cube = new THREE.Mesh(geometry, mainMaterial);
scene.add(cube);

// Create an outline for the cube using EdgesGeometry and LineBasicMaterial
const edges = new THREE.EdgesGeometry(geometry);
const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
const outline = new THREE.LineSegments(edges, outlineMaterial);
cube.add(outline);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  // Rotate the main cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

