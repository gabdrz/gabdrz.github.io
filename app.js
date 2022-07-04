// Variables 
// var logo = document.getElementsByClassName(".logo");
// var tweenLogo = gsap.to(".logo", {y:-20, paused: true});
// var tweenDog = gsap.to(".dog", {y:-20, paused: true});
//Variables for setup

let container;
let camera;
let renderer;
let scene;
let logo;
let image1;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 22;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 30);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
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

function logoSwitch () {
  $('.secondP').each(function() {
    $(this).css('top',
      $('.firstP').offset().top -  $(this).closest('.row').offset().top
    );
  });
};

$(document).scroll(function() {logoSwitch();});

logoSwitch();