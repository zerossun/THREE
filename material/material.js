import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 2, 12);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
const material = new THREE.MeshBasicMaterial({ color: 0xf08080 });
const mateiral1 = new THREE.MeshStandardMaterial({
  color: 0xf08080,

  // transparent: true, // 투명도
  // opacity: 0.1, // transparent: true가 있어야 투명도 조절 가능
  // metalness: 0.6, // 메탈 재질
  // roughness: 0.4, // 거칠기
  // wireframe: true, // 와이어프레임(안의 기틀)
});
/**
 MeshDepthMaterial : 깊이감을 주는 material. 조명 그림자와는 무관
 MeshLambertMaterial : 자연스러운 or 간단한 조명 효과.
 MeshPhongMaterial : 반사광과 하이라이트를 추가하여, 더욱 세밀한 질감과 광택을 표현.
 MeshPhysicalMaterial : MeshStandardMaterial의 상위호환. 다양한 기능이 더 있음.
 */
const material2 = new THREE.MeshPhysicalMaterial({
  color: 0xf08080,
  clearcoat: 1.0,
  clearcoatRoughness: 0.2,
});
const material3 = new THREE.MeshDepthMaterial({ color: 0xf08080 });

const material4 = new THREE.MeshPhongMaterial({
  color: 0xf08080,
  shininess: 120,
  specular: 0x004fff,
});
const material5 = new THREE.MeshLambertMaterial({ color: 0xf08080 });

// material1.wireframe = true; // 이렇게도 wireframe 적용 가능
const tours = new THREE.Mesh(geometry, material);
tours.position.y = 1;
const tours1 = new THREE.Mesh(geometry, mateiral1);
tours1.position.x = -2;
const tours2 = new THREE.Mesh(geometry, material2);
tours2.position.x = -1;
const tours3 = new THREE.Mesh(geometry, material3);
tours3.position.x = 0;
const tours4 = new THREE.Mesh(geometry, material4);
tours4.position.x = 1;
const tours5 = new THREE.Mesh(geometry, material5);
tours5.position.x = 2;

scene.add(tours, tours1, tours2, tours3, tours4, tours5, light);
camera.position.z = 3;
const animate = function animate(time) {
  requestAnimationFrame(animate);
  time *= 0.002;

  tours.rotation.y = time;
  tours1.rotation.y = time;
  tours2.rotation.y = time;
  tours3.rotation.y = time;
  tours4.rotation.y = time;
  tours5.rotation.y = time;
  renderer.render(scene, camera);
};
animate();
