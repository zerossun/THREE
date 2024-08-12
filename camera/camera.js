import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const fov = 63; // 시야각,화각
/**
 
 망원 28˚이하
 화각 47˚
 광각 63˚ ~ 84˚ 사이

 */
// 조횡비(가로세로 비율 ex_16:9)
const aspect = window.innerWidth / window.innerHeight;
/**
 near : 카메라의 시점이 시작되는 위치
 far : 카메라의 시점이 끝나는 위치
 */
const near = 0.5;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 10);
light.position.set(0, 1, 5);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0xf08080 });

const box = new THREE.Mesh(geometry, material);
box.rotation.y = 2.0;

const geometry1 = new THREE.PlaneGeometry(20, 20, 1, 1);
const material1 = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const plane = new THREE.Mesh(geometry1, material1);
plane.rotation.x = -0.5 * Math.PI;
plane.position.y = -0.5;

scene.add(light, box, plane);

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0)); // 0,0,0으로 맞추면 중앙을 바라봄

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  // 카메라가 지속적으로 변경됨
  camera.updateProjectionMatrix();
  // 카메라에 있는 어떠한 파라미터라도 변경된다면 이게 필요하다
  renderer.setSize(window.innerWidth, window.innerHeight);
}

vv;

window.addEventListener('resize', onWindowResize);

const animate = function animate(time) {
  requestAnimationFrame(animate);
  time *= 0.001;

  renderer.render(scene, camera);
};

animate();
