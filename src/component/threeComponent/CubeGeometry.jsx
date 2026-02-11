import { useEffect, useRef } from "react";
import * as THREE from "three";
import classes from "../../CSS/ThreeCSS/CubeGeometry.module.css";
export function CubeGeometry() {
  //  Make sure component mounts once
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    //  Create A Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202020);
    //  Create A Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 20;

    //  Create The Light
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(5, 10, 5);
    scene.add(light);

    //  Create A Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWeight, container.clientHeight);
    container.appendChild(renderer.domElement);

    //  Create Mesh
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    //  Create Material
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    //  Create Render Loop
    const animate = () => {
      cube.rotation.y += 0.01;
      cube.rotation.x += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    //  Handle Resize
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    //  Cleanup The Effect
    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
      container.current = null;
    };
  }, []);

  return (
    <div className={classes.container}>
      <div ref={mountRef} className={classes.threeCanvas}></div>
    </div>
  );
}
