import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let eyes;
let sopraccilia;

let oldTime = performance.now() / 1000;

const mouse = new THREE.Vector2();

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function randomInterval(min, max) {
    return Math.random() * (max - min) + min;
}
let wrapper = document.querySelector('#smile-wrapper');
let canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();
let aspect = wrapper.clientWidth / wrapper.clientHeight;
const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 2000);
camera.position.z = 1.5;
scene.add(camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 145);
pointLight.position.set(10, 10, 0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
scene.add(pointLight);

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 3 - 1;
});
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
renderer.setClearColor(0x000000, 0);


let headNo = false;

// Load GLB model
let modelObject;
const loader = new GLTFLoader();
loader.load('models/nerd_smile.glb', (gltf) => {
    modelObject = gltf.scene;

    modelObject.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(modelObject);

    const sopraccilio1 = modelObject.getObjectByName('sopraccilio1');
    const sopraccilio2 = modelObject.getObjectByName('sopraccilio2');
    const occhio1 = modelObject.getObjectByName('occhio1');
    const occhio2 = modelObject.getObjectByName('occhio2');
    if (occhio1) occhio1.userData.initialScaleY = occhio1.scale.y;
    if (occhio2) occhio2.userData.initialScaleY = occhio2.scale.y;
    eyes = {
        occhio1: occhio1,
        occhio2: occhio2,
        isBlinking: false,
        blinkStart: 0,
        blinkDuration: .5,
        blinkPhase: 4,
        nextBlinkTime: randomInterval(1, 4),
    };
    sopraccilia = {
        sopraccilio1: sopraccilio1,
        sopraccilio2: sopraccilio2,
        phase: 0,
    };
    animate();
});

window.addEventListener('resize', () => {
    aspect = wrapper.clientWidth / wrapper.clientHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
});

window.addEventListener('sayNo', () => {
    sayNo();
});

function updateBlink(eyes, now, delta) {
    if (!eyes.isBlinking) {
        eyes.nextBlinkTime -= delta;
        if (eyes.nextBlinkTime <= 0) {
            eyes.isBlinking = true;
            eyes.blinkStart = now;
        }
    }

    if (eyes.isBlinking) {
        const elapsed = now - eyes.blinkStart;

        if (elapsed <= eyes.blinkDuration) {
            const phase = elapsed / eyes.blinkDuration;
            const targetScaleY = lerp(eyes.occhio1.userData.initialScaleY, 0.2, phase);
            eyes.occhio1.scale.y = targetScaleY;
            eyes.occhio2.scale.y = targetScaleY;
        } else if (elapsed <= eyes.blinkDuration * 2) {
            const phase = (elapsed - eyes.blinkDuration) / eyes.blinkDuration;
            const targetScaleY = lerp(0.2, eyes.occhio1.userData.initialScaleY, phase);
            eyes.occhio1.scale.y = targetScaleY;
            eyes.occhio2.scale.y = targetScaleY;
        } else {
            eyes.isBlinking = false;
            eyes.occhio1.scale.y = eyes.occhio1.userData.initialScaleY;
            eyes.occhio2.scale.y = eyes.occhio2.userData.initialScaleY;
            eyes.nextBlinkTime = randomInterval(2, 6);
        }
        eyes.occhio1.updateMatrixWorld(true);
        eyes.occhio2.updateMatrixWorld(true);
    }
}

function sayNo(duration = 1, intensity = 0.5) {
    let startTime = performance.now() / 1000; // Start time in seconds
    const initialRotation = modelObject.rotation.y; // Store the initial rotation

    function animateHead() {
        const now = performance.now() / 1000;
        const elapsed = now - startTime;

        if (elapsed < duration) {
            headNo = true;
            const progress = elapsed / duration;
            const angle = Math.sin(progress * Math.PI * 4) * intensity;
            modelObject.rotation.y = initialRotation + angle;
            requestAnimationFrame(animateHead);
        } else {
            modelObject.rotation.y = initialRotation;
            headNo = false;
        }
    }
    animateHead();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if (!headNo) {
        if (modelObject) {
            modelObject.rotation.y = lerp(-Math.PI / 4, Math.PI / 4, (mouse.x + 1) / 2);
            modelObject.rotation.x = lerp(-Math.PI / 6, Math.PI / 6, (mouse.y + 1) / 2);
        }
    }
    const now = performance.now() / 1000;
    const delta = now - oldTime;
    oldTime = now;
    if (eyes) updateBlink(eyes, now, delta);
    if (sopraccilia) rotateSopraccilia(sopraccilia, now, delta);
    renderer.render(scene, camera);
}

function rotateSopraccilia(sopraccilia, now, delta) {
    const speed = 2;
    let angle = Math.sin(now * speed) * 0.1;

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    if (currentHour >= 18 && currentHour <= 21) {
        const startTime = 18 * 60;
        const endTime = 21 * 60;
        const currentTimeInMinutes = currentHour * 60 + currentMinutes;
        const progress = (currentTimeInMinutes - startTime) / (endTime - startTime);
        angle += -0.6 * progress;
    }

    sopraccilia.sopraccilio1.rotation.z = angle;
    sopraccilia.sopraccilio2.rotation.z = -angle;
}