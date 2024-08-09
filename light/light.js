import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color({ color: 0xffffff });

const fov = 47;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.5;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 2, 5);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0xf08080 });

const box = new THREE.Mesh(geometry, material);
box.rotation.y = 4;
box.rotation.x = 0.5;

const geometry1 = new THREE.PlaneGeometry(20, 20, 1, 1);
const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(geometry1, material1);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;

scene.add(box, plane, light);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

camera.position.z = 3;
camera.lookAt(new THREE.Vector3(0, 0, 0));
const animate = function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
