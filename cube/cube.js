import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js';
// 장면 생성
const scene = new THREE.Scene();
// 카메라 생성
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 랜더링 생성
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 화면 사이즈 설정
renderer.setSize(window.innerWidth, window.innerHeight);
// html 화면에 구현
document.body.appendChild(renderer.domElement);

// cube 구현

// BoxGeometry생성, 이 안에 vertices(꼭지점)과 faces(면)이 포함
const geometry = new THREE.BoxGeometry();
// meshBasicMaterial 생성, color:형광색
const material = new THREE.MeshBasicMaterial({ color: 0x00ff80 });

// Mesh를 이용하여 geometry에 material을 적용하고 자유롭게 움직일 수 있도록 함.
const cube = new THREE.Mesh(geometry, material);
// 장면에 cube를 추가함.
scene.add(cube);
// 기본 카메라 셋팅은 (0,0,0)이므로 카메라의 z값을 5로 함.
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 500;

const animate = function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};
animate();
