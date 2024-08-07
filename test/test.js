import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { color } from 'three/webgpu';

// 장면 생성
const scene = new THREE.Scene();
// 카메라 생성
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 랜더링 생성
// webGLRenderer : 렌더링 엔진의 일종
const renderer = new THREE.webGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

// 꼭지점,면 제작
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 색상 지정
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// Mesh : 메시는 지오메트리를 취하고, 그것에 재료를 적용하는 객체로
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);

camera.position.z = 5;

const animate = function (animate) {
  circle.rotation.x += 0.1;
  circle.rotation.y += 0.1;
  renderer.render(scene, camera);
};
animate();
