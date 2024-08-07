import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.150.1/examples/jsm/controls/OrbitControls.js';

// 장면 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
// 카메라 생성
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 랜더링 생성
const renderer = new THREE.WebGLRenderer({ antialias: true, alpah: true });
renderer.setSize(window.innerWidth, window.innerHeight); // 브아루저 창 크기로 셋 사이즈를 맞춤
document.body.appendChild(renderer.domElement);

// 도형 생성

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x40e0d0 });
/** 
MeshStandardMaterial와 MeshBasicMaterial의 차이점
MeshStandardMaterial : 조명의 영향을 받음. 조명과 속성에0 따라 색이 다르게 보임
MeshBasicMaterial : 조명의 영향을 받지않음. 그렇기 때문에 색상 그대로 보여줌
 */

/**
Geometry의 종류
· BoxGeometry : Box
· BufferGeometry : 라인 또는 포인트 등 모든 데이터를 GPU로 전달
 */

const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = -2;
const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1), material);
box.position.x = 2;

// squareShape 클래스 생성
const shape = new THREE.Shape();
/**
// three.js
moveTo : 현재 지점을 해당 x,y로 이동
lineTo : 현재 지점에서 출발하여 연결
getPoints(); : 곡선을 나눌 조각의 수. 기본값 5(배열)
BufferGeometry : 라인 또는 포인트 등 모든 데이터를 GPU로 전달
// canvas
closePath : path 닫기

 */
// x,y 좌표로 도형 정의
// (1,1) 로 이동 -> (1, -1)까지 선 그음 -> (-1, -1)까지 선 그음 -> (-1, 1)까지 선 그음
shape.moveTo(-1, 1);
shape.lineTo(-1, -1);
shape.lineTo(1, -1);
shape.lineTo(1, 1);
// 도형을 닫으라고 지정
shape.closePath();

const geometry1 = new THREE.BufferGeometry();
const points = shape.getPoints();
geometry1.setFromPoints(points);

const material1 = new THREE.LineBasicMaterial({ color: 0xffff00 });
const line = new THREE.Line(geometry1, material1);

//heartShape 클래스 생성
const heartShape = new THREE.Shape();

const x = -2.5,
  y = -2.5;
heartShape.moveTo(x + 2.5, y + 2.5);
heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
heartShape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3, 5);
heartShape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9, 5);
heartShape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
heartShape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

const geometry2 = new THREE.BufferGeometry();
const points2 = heartShape.getPoints();
geometry2.setFromPoints(points2);

const heart = new THREE.Line(geometry2, material1);
heart.position.y = 6;

const constructor = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 0),
  material
);
constructor.position.x = 6;
scene.add(box, sphere, line, heart, constructor);
camera.position.z = 12;

const controls = new OrbitControls(camera, renderer.domElement);

// 반응형
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight; // 고정된 윈도우 값 가변 처리 / 이게 없으면 종회비가 깨져 이미지 늘어남
  camera.updateProjectionMatrix(); // 카메라 변경사항 업데이트
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

const animate = function animate(time) {
  requestAnimationFrame(animate);
  time *= 0.005;
  sphere.rotation.x = time;
  sphere.rotation.y = time;
  constructor.rotation.y = time;

  box.rotation.x = time;
  box.rotation.y = time;
  renderer.render(scene, camera);
};
animate();
