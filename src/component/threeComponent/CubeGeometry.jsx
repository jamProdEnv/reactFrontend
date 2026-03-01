import * as THREE from "three";
import classes from "../../CSS/ThreeCSS/CubeGeometry.module.css";
import { useThreeScene } from "../../hooks/useThreeScene";

export function CubeGeometry() {
  // --- Use the custom hook for scene, camera, renderer ---
  const { mountRef, animationRef, sceneRef } = useThreeScene(({ scene, camera, renderer, animationRef  }) => {
    // const container = mountRef.current;

    // --- Scene setup ---
    // scene is already created by hook
    scene.background = new THREE.Color(0x202020);

    // --- Camera setup ---
    camera.position.set(0, 0, 20);

    // --- Lights ---
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(5, 10, 5);
    scene.add(light);

    // --- Mesh creation ---
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // --- Animation loop ---
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

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
