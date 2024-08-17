import * as THREE from "three";
import { getFXScene } from "./FXScene.js";

const clock = new THREE.Clock();
let animationPaused = false;
let sceneB;
let renderer;
let transition;
let canvas;

init();
animate();

function init() {
  const container = document.getElementById("background-container");

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvas = renderer.domElement; // Save reference to canvas
  container.appendChild(canvas);

  const materialB = new THREE.MeshStandardMaterial({
    color: 0xFF9900,
    flatShading: true,
  });

  sceneB = getFXScene({
    renderer,
    material: materialB,
    clearColor: 0x000000,
    needsAnimatedColor: true,
  });

  transition = {
    render: (delta) => {
      sceneB.render(delta, false); // Only render sceneB
    }
  };
}

// Animation loop function
function animate() {
  if (!animationPaused) {
    requestAnimationFrame(animate);
    transition.render(clock.getDelta());
  }
}

// Pause animation and hide canvas
function pauseAnimation() {
  animationPaused = true;
  if (canvas) {
    canvas.style.display = 'none';
  }
}

// Resume animation and show canvas
function resumeAnimation() {
  animationPaused = false;
  if (canvas) {
    canvas.style.display = 'block';
  }
  animate();
}

// Clean up and remove the Three.js scene
export function cleanupBackground() {
  // Stop the animation loop
  animationPaused = true;

  // Dispose of scene objects if they exist
  if (sceneB) {
    // Assuming sceneB.scene was incorrect, directly access the scene created in getFXScene
    // Iterate over any meshes or other resources directly in sceneB
    if (sceneB.mesh) {
      sceneB.mesh.geometry.dispose();
      if (sceneB.mesh.material) {
        sceneB.mesh.material.dispose();
      }
    }
  }

  // Dispose of renderer
  if (renderer) {
    renderer.dispose();
  }

  // Remove canvas from DOM
  if (canvas) {
    canvas.remove();
  }

  // Remove event listeners (if any)
  //window.removeEventListener('resize', onWindowResize);

  // Set references to null to free up memory
  sceneB = null;
  renderer = null;
  canvas = null;
}

// Example of how to call cleanup when needed
// cleanup();
