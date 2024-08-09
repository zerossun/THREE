import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 5, 12);

//texture 추가
const textureLoader = new THREE.TextureLoader();
const textureBasicColor = textureLoader.load('./image/basecolor.png');
const textureheight = textureLoader.load('./image/normal.png');
const texturenormal = textureLoader.load('./image/normal.png');
const textureRoughness = textureLoader.load('./image/roughness.png');

const geometry = new THREE.SphereGeometry(0.5, 10, 100);
const material1 = new THREE.MeshStandardMaterial({ map: textureBasicColor });
const material2 = new THREE.MeshStandardMaterial({
  map: textureBasicColor,
  normalMap: textureheight,
});
const material3 = new THREE.MeshStandardMaterial({
  map: textureBasicColor,
  normalMap: textureheight,
  displacementMap: textureBasicColor,
  displacementScale: 0.1,
});
const material4 = new THREE.MeshStandardMaterial({
  map: textureBasicColor,
  normalMap: textureheight,
  displacementMap: textureBasicColor,
  displacementScale: 0.1,
  roughnessMap: textureRoughness,
  roughness: 0.5,
});

const tours1 = new THREE.Mesh(geometry, material1);
tours1.position.x = -2;
const tours2 = new THREE.Mesh(geometry, material2);
tours2.position.x = -0;
const tours3 = new THREE.Mesh(geometry, material3);
tours3.position.x = 2;
const tours4 = new THREE.Mesh(geometry, material4);
tours4.position.x = 4;

scene.add(tours1, tours2, tours3, tours4, light);

camera.position.z = 5;

const animate = function animate(time) {
  requestAnimationFrame(animate);
  time *= 0.005;
  renderer.render(scene, camera);
};
animate();
