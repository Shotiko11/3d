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
renderer.setClearColor(0xffffff); 
document.body.appendChild(renderer.domElement);

const originalCubeSize = 1;
const cubeSize = originalCubeSize * 2; 

const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const mainMaterial = new THREE.MeshBasicMaterial({ color: 0x800080 });
const cube = new THREE.Mesh(geometry, mainMaterial);
scene.add(cube);

const edges = new THREE.EdgesGeometry(geometry);
const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
const outline = new THREE.LineSegments(edges, outlineMaterial);
cube.add(outline);

camera.position.z = 5;

let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

document.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y
    };

    cube.rotation.x += deltaMove.y * 0.005;
    cube.rotation.y += deltaMove.x * 0.005;

    previousMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }
});

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
