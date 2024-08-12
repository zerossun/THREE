import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color({ color: 0xffffff });

const fov = 120;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.5;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffa500, 0.1);
ambient.position.set(0, 2, 5);

const direction = new THREE.DirectionalLight(0xffffff, 0.5);
direction.position.set(-1, 1, 1);
const dlHelper = new THREE.DirectionalLightHelper(direction, 0.2, 0x0000ff);
const hemis = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);

const point = new THREE.PointLight(0xffffff, 1);
point.position.set(-0.5, 0.5, 0.5);
const piHelper = new THREE.PointLightHelper(point, 0.5);

const point1 = new THREE.PointLight(0xffffff, 1);
point1.position.set(0.5, 5, 0.5);
const piHelper2 = new THREE.PointLightHelper(point, 0.1);

const RectArea = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
// 가로,세로,강도
RectArea.position.set(0.5, 0.5, 1);
RectArea.lookAt(-10, 0, 0);

const spot = new THREE.SpotLight(0xffffff, 0.5);

const geometry = new THREE.SphereGeometry(0.5, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xf08080 });

const box = new THREE.Mesh(geometry, material);
box.rotation.y = 0.5;
box.position.y = 0.2;

const geometry1 = new THREE.PlaneGeometry(20, 20, 1, 1);
const material1 = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(geometry1, material1);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;

scene.add(box, plane, spot);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1.8;
camera.lookAt(new THREE.Vector3(0, 0, 0));
const animate = function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

/**
AmbientLight : 모든 오브젝트를 전역에서 빛을 비춤. 그림자가 생기지 않음.
DirectionalLight : 특정방향으로 빛을 방출. 해같은 느낌. 그림자도 가능
HemisphereLight : 지정한 하늘과 땅의 색을 비춰줌
PointLight
RectAreaLight
SpotLight
 */
