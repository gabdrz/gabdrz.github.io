// Variables 
let container;
let camera;
let renderer;
let scene;
let logo;
let image1;

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
    logo.rotation.y += 0.3;
    logo.position.y -= 0.5;
    animate();
  });
}

function animate() {
  requestAnimationFrame(animate);
  logo.rotation.z += 0.005;
  // image1.rotation.z += 0.005;
  renderer.render(scene, camera);
}

init();



function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

const floatPath = {
  curviness: 1.25,
  autoRotate: true,
  values: [
    {x: 100, y:-20},
    {x: 800, y:-20}
  ]
}

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
.addIndicators()
.addTo(controller);

const page2 = new ScrollMagic.Scene({
  triggerElement: ".page3",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(tortoiseToGrey)
.addIndicators()
.addTo(controller);

const page3 = new ScrollMagic.Scene({
  triggerElement: ".page4",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(greyToTeal)
.addIndicators()
.addTo(controller);

const page4 = new ScrollMagic.Scene({
  triggerElement: ".page5",
  duration: 140,
  triggerHook: 0.10909
})
.setTween(tealToBrown)
.addIndicators()
.addTo(controller);
