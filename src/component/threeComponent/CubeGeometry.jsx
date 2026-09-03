import * as THREE from "three";
import classes from "../../CSS/ThreeCSS/CubeGeometry.module.css";
import { useThreeScene } from "../../hooks/useThreeScene";

export function CubeGeometry() {
  // --- Use the custom hook for scene, camera, renderer ---
  const { mountRef, animationRef, sceneRef } = useThreeScene(({ scene, camera, renderer, animationRef  }) => {
    // const container = mountRef.current;

     const isMobile = mountRef.current.clientWidth < 600;
    
      
    // --- Scene setup ---
    // scene is already created by hook
    // scene.background = new THREE.Color(0xD2D6D6);
    camera.position.set(0, isMobile ? 10 : 0, isMobile ? 30 : 20); 
      camera.lookAt(0, 0, 0);
  
    // --- Camera setup ---
    // camera.position.set(0, 0, 20);

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(5, 10, 5);
    scene.add(light)
    // --- Mesh creation ---
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    // const material = new THREE.MeshStandardMaterial({ color: 0xCAE8DF });
    const material = new THREE.MeshStandardMaterial({ color: 0xD9FFB3,
       roughness: 0.3,
  metalness: 0,
     });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

   // --- Free movement with collision ---
const speed = 0.08;
const getBounds = () => {
  const distance = Math.abs(camera.position.z - cube.position.z);

  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const visibleHeight =
    2 * Math.tan(vFov / 2) * distance;

  const visibleWidth =
    visibleHeight * camera.aspect;

  const halfCubeSize = 5;

  return {
    left: -visibleWidth / 2 + halfCubeSize,
    right: visibleWidth / 2 - halfCubeSize,
    bottom: -visibleHeight / 2 + halfCubeSize,
    top: visibleHeight / 2 - halfCubeSize,
  };
};

// Start somewhere in the screen
// cube.position.set(0, 0, 0);

// Random initial direction
const angle = Math.random() * Math.PI * 2;



const velocity = new THREE.Vector3(
  Math.cos(angle) * speed,
  Math.sin(angle) * speed,
  0
);


    // --- Animation loop ---
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      // Move toward the random target
   // Move continuously
  cube.position.add(velocity);

  const bounds = getBounds();

  // Left / right collision
  if (
    cube.position.x <= bounds.left ||
    cube.position.x >= bounds.right
  ) {
    velocity.x *= -1;

    // Keep cube inside bounds
    cube.position.x = THREE.MathUtils.clamp(
      cube.position.x,
      bounds.left,
      bounds.right
    );
  }

  // Top / bottom collision
  if (
    cube.position.y <= bounds.bottom ||
    cube.position.y >= bounds.top
  ) {
    velocity.y *= -1;

    // Keep cube inside bounds
    cube.position.y = THREE.MathUtils.clamp(
      cube.position.y,
      bounds.bottom,
      bounds.top
    );
  }
      cube.rotation.y += 0.01;
      cube.rotation.x += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationRef.current);
      geometry.dispose();
      material.dispose();
      // scene.remove(cube); // optional
    };
  });

  return (
    <div className={classes.container}>
      <div ref={mountRef} className={classes.threeCanvas}></div>
    </div>
  );
}
