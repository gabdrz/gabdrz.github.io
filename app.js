// Variables 
let container;
let camera;
let renderer;
let scene;
let logo;
let image1;
let prev;
let forward;

// Logo Helpers
let prevRotX1;
let prevRotY1;
let prevPosX1;
let prevPosY1;
let prevPosZ1;

let prevRotX2;
let prevRotY2;
let prevPosX2;
let prevPosY2;
let prevPosZ2;

let prevRotX3;
let prevRotY3;
let prevPosX3;
let prevPosY3;
let prevPosZ3;

// Scroll Pages
let scrollP1;
let scrollP2;
let scrollP3;
let scrollP4;
// let scrollP5 = window.pageYOffset - (4 * window.innerHeight);

// Animation Values
let defaultRSpeed = 0.005;
let scrollRSpeed = 0.03;

function currentPage() {
  if (window.pageYOffset < window.innerHeight) return 1;
  if (window.pageYOffset < 2 * window.innerHeight) return 2;
  if (window.pageYOffset < 3 * window.innerHeight) return 3;
  if (window.pageYOffset < 4 * window.innerHeight) return 4;
  else return 5;
}

function init() {
  container = document.querySelector(".scene");

  // Create scene
  scene = new THREE.Scene();

  const fov = 22;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  // Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  // Load Model
  let objLoader = new THREE.GLTFLoader();
  objLoader.load("./assets/logo.gltf", function(gltf) {
    scene.add(gltf.scene);
    logo = gltf.scene.children[0];
    animate();
  });
}

function moveObject() {
  // Page 1 Transition
  if (currentPage() == 1) {
    logo.rotation.x = (scrollP1 / 8000) + 1.5;
    logo.rotation.y = (-scrollP1 / 2000) + 0.3;
    
    logo.position.x = (scrollP1 / 600) + 0.55;
    logo.position.y = (scrollP1 / 800) + 2.4; 
    logo.position.z = (-scrollP1 / 80) + 0.1;

    prevRotX1 = logo.rotation.x;
    prevRotY1 = logo.rotation.y;
    prevPosX1 = logo.position.x;
    prevPosY1 = logo.position.y;
    prevPosZ1 = logo.position.z;
  }

  // Page 2 Transition
  if ( currentPage() == 2) {
    logo.rotation.x = (scrollP2 / 8000) + prevRotX1;
    logo.rotation.y = (scrollP2 / 2000) + prevRotY1;
    
    logo.position.x = (-scrollP2 / 200) + prevPosX1;
    logo.position.y = (scrollP2 / 400) + prevPosY1; 
    logo.position.z = (-scrollP2 / 80) + prevPosZ1;

    prevRotX2 = logo.rotation.x;
    prevRotY2 = logo.rotation.y;
    prevPosX2 = logo.position.x;
    prevPosY2 = logo.position.y;
    prevPosZ2 = logo.position.z;
  }

  // Page 3 Transition
  if (currentPage() == 3) {
    logo.rotation.x = (scrollP3 / 8000) + prevRotX2;
    logo.rotation.y = (-scrollP3 / 2000) + prevRotY2;
    
    logo.position.x = (scrollP3 / 450) + prevPosX2;
    logo.position.y = (-scrollP3 / 150) + prevPosY2; 
    logo.position.z = (scrollP3 / 80) + prevPosZ2;

    prevRotX3 = logo.rotation.x;
    prevRotY3 = logo.rotation.y;
    prevPosX3 = logo.position.x;
    prevPosY3 = logo.position.y;
    prevPosZ3 = logo.position.z;
  }

  // Page 4 Transition
  if (currentPage() == 4) {
    logo.rotation.x = (-scrollP4 / 3500) + prevRotX3;
    logo.rotation.y = (scrollP4 / 4100) + prevRotY3;
    
    logo.position.x = (scrollP4 / 1500) + prevPosX3;
    logo.position.y = (scrollP4 / 400) + prevPosY3; 
    logo.position.z = (scrollP4 / 60) + prevPosZ3;
  }
}

function scroll() {
  scrollP1 = window.pageYOffset;
  scrollP2 = window.pageYOffset - window.innerHeight;
  scrollP3 = window.pageYOffset - (2 * window.innerHeight);
  scrollP4 = window.pageYOffset - (3 * window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  scroll();

  // Object Static Animation
  const rx = window.pageYOffset / 3000;

  if (rx > prev){
    logo.rotation.z += scrollRSpeed;
    forward = true;
  }

  if (rx < prev){
    logo.rotation.z -= scrollRSpeed;
    forward = false;
  }

  if (forward == false) logo.rotation.z -= defaultRSpeed;
  else logo.rotation.z += defaultRSpeed;

  prev = rx;
  
  // Object Movement
  moveObject();


  // Renderer
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

const goldToTortoise = TweenMax.to(".dog", 0.5, {css: {background: "#009384"}, ease: Linear.easeNone});
const tortoiseToGrey = TweenMax.to(".dog", 0.5, {css: {background: "#B4AA99"}, ease: Linear.easeNone});
const greyToTeal = TweenMax.to(".dog", 0.5, {css: {background: "#39CAB9"}, ease: Linear.easeNone});
const tealToBrown = TweenMax.to(".dog", 0.5, {css: {background: "#4D4637"}, ease: Linear.easeNone});

const controller = new ScrollMagic.Controller();

const page1 = new ScrollMagic.Scene({
  triggerElement: ".page2",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(goldToTortoise)
.addTo(controller);

const page2 = new ScrollMagic.Scene({
  triggerElement: ".page3",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(tortoiseToGrey)
.addTo(controller);

const page3 = new ScrollMagic.Scene({
  triggerElement: ".page4",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(greyToTeal)
.addTo(controller);

const page4 = new ScrollMagic.Scene({
  triggerElement: ".page5",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(tealToBrown)
.addTo(controller);

// Page 2
const words = ["Computer Science Senior.", "Code Sensei.", "Front-end Web Developer.", "Freelance Graphic Designer."]
let cursor = gsap.to('.cursor', {opacity:0, ease: "power2.inOut", repeat:-1})
let masterTl = gsap.timeline({repeat: -1}).pause()
let boxTl = gsap.timeline()

  words.forEach(word => {
  let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
  tl.to('.text', {duration: 1, text: word})
  masterTl.add(tl)
})

masterTl.play()

// Page 3
